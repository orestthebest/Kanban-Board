# Kanban Board

A simple Kanban board built with SvelteKit, made as a school project for WAE (HTL, 5th year).

**Live demo:** https://DEIN-LINK.vercel.app

## Features

- 4 lanes: **Do**, **Doing**, **Done**, **Archive**
- Create issues with a native HTML `<dialog>`
- Each issue has a title, description, creation date, due date, story points and priority
- Move issues with drag & drop (native Drag and Drop API, no library)
- All issues and their lane are saved in `localStorage`
- Sum of story points per lane
- Visual warning for overdue issues
- Browser notification when an issue is moved to **Done**
- Export a single issue as a calendar event (`.ics`)
- Share a single issue with the Web Share API
- Export all issues as a CSV file
- Installable as a PWA, works completely offline

## Tech Stack

- [SvelteKit](https://svelte.dev/docs/kit) (Svelte 5 with runes)
- [Tailwind CSS](https://tailwindcss.com)
- [date-fns](https://date-fns.org) for date formatting
- Deployed on [Vercel](https://vercel.com)

## Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── IssueCard.svelte    # one issue (draggable)
│   │   ├── IssueDialog.svelte  # dialog to create an issue
│   │   └── Lane.svelte         # one lane (drop zone, story point sum)
│   ├── export.js               # ICS, CSV and Web Share
│   ├── notify.js               # notification when done
│   └── storage.js              # load and save in localStorage
├── routes/
│   ├── +layout.js              # ssr off, prerender on
│   ├── +layout.svelte
│   └── +page.svelte            # the board
└── service-worker.js           # offline cache
static/
└── manifest.webmanifest        # PWA manifest
```

## Getting Started

```bash
npm install
npm run dev
```

Production build (needed to test offline mode):

```bash
npm run build
npm run preview
```

## Author

Orest Bashi