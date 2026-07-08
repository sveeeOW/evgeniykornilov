# Animated Personal Landing Page V2

Готовый исходник сайта для выгрузки на хостинг.

## Что внутри
- `src/App.tsx` — основная страница
- `public/images/profile/` — фото профиля
- `public/images/team/` — командные фотографии

## Имена картинок, на которые уже ссылается код

### Профиль
- `public/images/profile/hero-selfie-kmc.jpg`

### Команда
- `public/images/team/kmc-stage-with-colleague.jpg`
- `public/images/team/photo-strip-kmc.jpg`
- `public/images/team/kmc-group-purple.jpg`
- `public/images/team/mrday-red-wall.jpg`
- `public/images/team/kmc-group-stars.jpg`
- `public/images/team/team-mountains.jpg`
- `public/images/team/kmc-group-large.jpg`

## Как запустить локально
```bash
npm install
npm run dev
```

## Как собрать для хостинга
```bash
npm install
npm run build
```

После сборки готовые файлы будут в папке `dist/`.
Именно содержимое `dist/` обычно загружается на статический хостинг.
