# MASTER PROMPT ДЛЯ CURSOR

## Реализация дипломного PWA-приложения для гитаристов

---

## 🔴 ОБЩИЕ ПРАВИЛА (ОБЯЗАТЕЛЬНО К ИСПОЛНЕНИЮ)

Ты — автономный разработчик.
Ты реализуешь **дипломный PWA-проект** строго по данному промту.

❗ **ЗАПРЕЩЕНО:**

- менять архитектуру
- добавлять лишние технологии
- усложнять логику
- смешивать UI и бизнес-логику
- делать транспозицию на backend
- пропускать тесты для алгоритмов

✅ **ОБЯЗАН:**

- следовать шагам строго по порядку
- сначала перечислять файлы, затем давать код
- писать полный код файлов
- использовать TypeScript
- писать чистые функции
- после каждого этапа указывать: `СТАТУС: ГОТОВО`

---

## 🎯 ЦЕЛЬ ПРОЕКТА

Создать **легковесное PWA Web-приложение для гитаристов**, которое:

- хранит песни с аккордами
- транспонирует аккорды на ±n полутонов
- работает оффлайн
- кэширует песни в IndexedDB
- устанавливается как PWA
- имеет чистую, простую архитектуру

---

## 🧱 АРХИТЕКТУРА

Проект — **monorepo**:

```
root/
 ├─ frontend/
 ├─ backend/
 └─ README.md
```

Frontend — UI
Service Layer — бизнес-логика
Backend — хранение
IndexedDB — оффлайн
Service Worker — PWA shell

---

## 🗂 FRONTEND

```
frontend/src/
 ├─ components/
 ├─ pages/
 ├─ services/
 │   ├─ api/
 │   ├─ transposition/
 │   ├─ parsing/
 │   └─ offline/
 ├─ pwa/
 ├─ store/
 ├─ utils/
 └─ main.tsx
```

---

## 🗂 BACKEND

```
backend/src/
 ├─ modules/songs/
 ├─ entities/
 ├─ dto/
 └─ main.ts
```

---

## 🧾 МОДЕЛЬ ДАННЫХ

### Song

```
id, title, author, originalKey, bpm?, textWithChords
```

### Chord

```
id, name, fingering(JSON)
```

### SongChord

```
songId, chord(string), position
```

---

## 🌐 BACKEND API

- GET /songs
- GET /songs/:id
- POST /songs
- POST /songs/import

❌ Backend не транспонирует
❌ Backend не парсит

---

## 🎼 ФОРМАТ ПЕСЕН

```
[C]Hello [G]darkness my [Am]old friend
```

---

## 🔧 SERVICE LAYER

### Транспозиция

```
transposeTextWithChords(text, semitones)
```

Поддержка:

- # и b
- минор/мажор
- slash-аккорды
- только чистая функция
- текст вне [] не меняется

Ноты:

```
C C# D D# E F F# G G# A A# B
```

### Парсинг

```
parseSongText(text)
```

Результат:

- lines → segments
- позиции глобальные
- без транспозиции

---

## 🖥 FRONTEND

### Каталог (/)

- список песен
- поиск

### Песня (/songs/:id)

- текст
- транспозиция
- оффлайн-индикатор

UI:

- крупный шрифт
- минимум элементов

---

## 📦 OFFLINE / PWA

- IndexedDB для песен
- manifest.webmanifest
- service worker
- offline запуск

---

## 🧪 ТЕСТЫ

Обязательны:

- транспозиция
- парсинг

---

## 🧭 ПОРЯДОК РЕАЛИЗАЦИИ

1. Init frontend/backend
2. Backend + DB
3. Transposition + tests
4. Parser + tests
5. Frontend UI
6. IndexedDB
7. PWA

Каждый шаг завершать: `СТАТУС: ГОТОВО`

---

## 🛑 ФИНАЛ

Проект завершён, если:

- PWA устанавливается
- работает оффлайн
- транспозиция корректна
- архитектура соблюдена
