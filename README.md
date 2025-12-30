# Blooming Tree To-Do Application

A beautiful, full-stack to-do application with Blooming Tree Financial branding, built with Node.js, Express, and PostgreSQL.

## Features

- Create, read, update, and delete tasks
- Set task priorities (Low, Medium, High)
- Mark tasks as complete
- Filter tasks by status (All, Active, Completed)
- Responsive design matching Blooming Tree brand colors
- PostgreSQL database for data persistence
- Ready for Railway deployment

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Deployment**: Railway

## Local Development

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database running locally or accessible remotely

### Setup

1. Clone the repository and navigate to the project directory

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your database credentials:
```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/bloomingtree_todo
NODE_ENV=development
```

5. Start the development server:
```bash
npm run dev
```

6. Open your browser and visit `http://localhost:3000`

## Deploy to Railway

### Step 1: Prepare Your Repository

1. Initialize a git repository (if not already done):
```bash
git init
git add .
git commit -m "Initial commit"
```

2. Push to GitHub:
```bash
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Deploy on Railway

1. Go to [Railway.app](https://railway.app) and sign in with GitHub

2. Click "New Project" → "Deploy from GitHub repo"

3. Select your repository

4. Railway will automatically detect the Node.js project and deploy it

### Step 3: Add PostgreSQL Database

1. In your Railway project, click "New" → "Database" → "Add PostgreSQL"

2. Railway will automatically create a PostgreSQL database and set the `DATABASE_URL` environment variable

### Step 4: Configure Environment Variables

Railway should automatically set:
- `DATABASE_URL` - PostgreSQL connection string (automatically set when you add the database)
- `NODE_ENV` - Set to `production`
- `PORT` - Railway sets this automatically

No additional configuration needed!

### Step 5: Deploy

1. Railway will automatically deploy your application

2. Once deployed, click the generated URL to view your app

3. The database tables will be created automatically on first run

## Project Structure

```
blooming-tree-todo/
├── public/
│   ├── index.html      # Main HTML file
│   ├── styles.css      # Blooming Tree branded styles
│   └── app.js          # Frontend JavaScript
├── server.js           # Express server and API routes
├── package.json        # Dependencies and scripts
├── railway.json        # Railway configuration
├── .env.example        # Environment variables template
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

## API Endpoints

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## Brand Colors

The application uses Blooming Tree Financial's brand colors:
- Primary Purple: `#673de6`
- Dark Purple: `#2f1c6a` and `#1F1346`
- Light Purple: `#ebe4ff`
- Accent Purple: `#8c85ff`
- Danger Red: `#fc5185`
- Warning Yellow: `#ffcd35`
- Success Teal: `#00b090`

## License

MIT

---

Blooming Tree Financial and Consulting Services - 2025
