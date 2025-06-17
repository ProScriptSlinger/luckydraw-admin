# LuckyDraw Admin Dashboard

Admin panel for the LuckyDraw Telegram Mini App.

## Technology Stack

- React 18 + TypeScript + Vite
- Redux Toolkit for state management
- React Router v6 for client-side routing
- Supabase Storage for image uploads
- Socket.io for real-time updates
- i18next for internationalization
- Sass for styling
- Formik & Yup for form handling and validation

## Prerequisites

- Node.js >= 18
- npm or Yarn

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
VITE_URL_DOMAIN=<your-backend-domain>
VITE_SUPABASE_URL=<your-supabase-project-url>
VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/LuckyDrawMiniApp/admin.git
cd admin
npm install
# or
# yarn install
```

## Running Locally

Start the development server:

```bash
npm run dev
# or
# yarn dev
```

Open http://localhost:5173 to view the app in the browser.

## Building for Production

Build the application for production:

```bash
npm run build
# or
# yarn build
```

The production-ready files will be in the `dist/` directory.

## Preview Production Build

Preview the production build locally:

```bash
npm run start
# or
# yarn start
```

## Linting

Run ESLint to check for code quality issues:

```bash
npm run lint
# or
# yarn lint
```
