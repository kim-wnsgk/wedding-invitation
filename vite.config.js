import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { config } from './src/config.js';

const PHOTO_EXT = /\.(jpe?g|png|webp)$/i;
const firstPhoto = (dir) => {
  const abs = path.resolve('photos', dir);
  if (!fs.existsSync(abs)) return null;
  const f = fs.readdirSync(abs).filter((n) => PHOTO_EXT.test(n))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))[0];
  return f ? path.join(abs, f) : null;
};

// 카카오톡·문자 링크 미리보기 사진: photos/kakao/ 에 사진이 있으면 그것, 없으면 photos/main/ 사진을
// 1200×630 으로 잘라 og-image.jpg 로 만들고 <meta property="og:image"> 를 넣습니다.
function ogImage() {
  const src = () => firstPhoto('kakao') || firstPhoto('main');
  return {
    name: 'og-image',
    apply: 'build',
    transformIndexHtml(html) {
      if (!src() || !config.siteUrl) return html;
      const url = new URL('og-image.jpg', config.siteUrl).href;
      return html.replace(
        '</head>',
        `  <meta property="og:image" content="${url}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
  </head>`
      );
    },
    async generateBundle() {
      const file = src();
      if (!file) return;
      const source = await sharp(file).rotate()
        .resize(1200, 630, { fit: 'cover', position: sharp.strategy.attention })
        .jpeg({ quality: 82, mozjpeg: true }).toBuffer();
      this.emitFile({ type: 'asset', fileName: 'og-image.jpg', source });
    },
  };
}

// base: './' 로 두면 GitHub Pages 하위 경로나 아무 폴더에 올려도 동작합니다.
export default defineConfig({
  base: './',
  plugins: [
    // photos/ 폴더 사진을 휴대폰에 맞게 줄이고 webp로 변환 (원본은 그대로 둠)
    imagetools({
      // 휴대폰 사진의 회전 정보(EXIF)대로 먼저 바로 세운 뒤 크기 조절
      extendTransforms: (builtins) => [() => (image) => image.rotate(), ...builtins],
    }),
    ogImage(),
  ],
});
