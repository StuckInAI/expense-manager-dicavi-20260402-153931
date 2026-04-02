# SpendTrack - Personal Finance Tracker

A modern, full-featured spending tracker built with Next.js 14, TypeScript, Tailwind CSS, and Recharts.

## Features

- 📊 **Dashboard** - Overview of income, expenses, and savings
- 💸 **Transaction Management** - Add, edit, and delete income/expense transactions
- 📈 **Analytics** - Visual charts for spending patterns (pie chart & bar chart)
- 💰 **Budget Tracking** - Set budgets per category and track spending against them
- 🔍 **Search & Filter** - Find transactions by name, type, or date
- 💾 **Local Storage** - Data persists in the browser
- 📱 **Responsive Design** - Works on mobile, tablet, and desktop

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Storage**: localStorage

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd track-spending-app

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Running with Docker

```bash
# Build the Docker image
docker build -t spendtrack .

# Run the container
docker run -p 3000:3000 spendtrack
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
track-spending-app/
├── Dockerfile
├── .dockerignore
├── public/
│   ├── favicon.ico
│   ├── logo.svg
│   └── placeholder.svg
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── AddExpenseModal.tsx
│   │   ├── AnalyticsView.tsx
│   │   ├── BudgetView.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── SummaryCards.tsx
│   │   └── TransactionList.tsx
│   ├── data/
│   │   └── sampleData.ts
│   └── types/
│       └── index.ts
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## License

MIT
