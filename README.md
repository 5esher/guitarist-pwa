# Guitarist PWA Monorepo

Легковесное PWA-приложение для гитаристов: каталог песен, транспозиция аккордов, оффлайн-режим и установка как PWA.

## Быстрый старт

### 1) Запуск базы данных (Postgres через Docker)
```bash
docker-compose up -d
```

### 2) Установка зависимостей
```bash
npm install
```

### 3) Запуск backend
```bash
npm run dev:backend
```

### 4) Заполнение базы данными (100 песен + полный набор аккордов)
```bash
npm --workspace backend run seed
```

### 5) Запуск frontend
```bash
npm run dev:frontend
```

Frontend доступен на `http://localhost:5173`, backend на `http://localhost:3000`.

## Каталог аккордов

- `/chords` — список всех аккордов и поиск.
- `/chords/:name` — страница отдельного аккорда (пример: `/chords/Cmaj7`).
- `/chords/:name/edit` и `/chords/new` — редактор аккордов.

## Импорт песен

- `/import` — импорт в форматах ChordPro и Ultimate Guitar TXT.

## Избранное

Избранные песни и аккорды сохраняются локально и синхронизируются через backend (`/favorites/:clientId`).

## Как загрузить песни вручную

Backend принимает данные в формате:
```json
{
  "title": "Song",
  "author": "Author",
  "originalKey": "C",
  "bpm": 120,
  "textWithChords": "[C]Hello [G]world"
}
```

Пример запроса:
```bash
curl -X POST http://localhost:3000/songs \
  -H "Content-Type: application/json" \
  -d '{"title":"Song","author":"Author","originalKey":"C","bpm":120,"textWithChords":"[C]Hello [G]world"}'
```

## Как проверить оффлайн/PWA

1. Соберите приложение:
```bash
npm run build:all
```
2. Запустите превью фронтенда:
```bash
npm --workspace frontend run preview
```
3. Откройте приложение, затем в DevTools включите режим Offline и убедитесь, что каталог и песня доступны из кэша IndexedDB.
4. В браузере установите PWA (иконка установки в адресной строке).

## Проверки

```bash
npm run test:all
npm run build:all
```
