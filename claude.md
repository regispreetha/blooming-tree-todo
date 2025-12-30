# Claude Development Notes

## Project Overview

This is a to-do list application built for Blooming Tree Financial and Consulting Services. The application features custom branding based on the company's website design and is optimized for deployment on Railway with PostgreSQL.

## Architecture Decisions

### Technology Stack
- **Backend Framework**: Express.js - Chosen for simplicity and Railway compatibility
- **Database**: PostgreSQL - Reliable, scalable, and natively supported by Railway
- **Frontend**: Vanilla JavaScript - No build step required, faster deployment
- **Hosting**: Railway - Easy deployment with automatic PostgreSQL integration

### Database Schema

```sql
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT false,
  priority VARCHAR(20) DEFAULT 'medium',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

### API Design

RESTful API endpoints:
- `GET /api/todos` - Retrieve all todos (ordered by creation date, newest first)
- `POST /api/todos` - Create new todo (requires title, optional description and priority)
- `PUT /api/todos/:id` - Update existing todo (supports partial updates)
- `DELETE /api/todos/:id` - Delete todo by ID

### Brand Integration

Colors extracted from bloomingtreefinancials.com:
- **Primary Green**: #4a7c59 (buttons, accents, active states)
- **Green to Brown Gradient Background**: #4a7c59, #6b8e23, #8b7355 (gradient header)
- **Light Green**: #d4e7d4 (borders, input outlines)
- **Hover Green**: #5a8c69 (button hover states)
- **Light Green Hover**: #e8f5e9 (filter button hover)
- **Dark Green Text**: #2d5016 (heading text color)
- **Priority Colors**:
  - High: #fc5185 (danger red)
  - Medium: #ffcd35 (warning yellow)
  - Low: #00b090 (success teal)

### Security Considerations

- **Input Validation**: Title is required, all inputs are sanitized on frontend
- **XSS Prevention**: HTML escaping implemented in frontend rendering
- **SQL Injection**: Parameterized queries used throughout
- **CORS**: Enabled for Railway deployment flexibility
- **SSL**: Enforced in production via Railway's automatic HTTPS

## Development Workflow

### Local Development
1. Install dependencies: `npm install`
2. Set up `.env` with local PostgreSQL credentials
3. Run development server: `npm run dev` (uses nodemon for auto-reload)
4. Access at `http://localhost:3000`

### Railway Deployment
1. Push code to GitHub repository
2. Connect Railway to GitHub repo
3. Add PostgreSQL service in Railway
4. Railway automatically:
   - Sets `DATABASE_URL` environment variable
   - Detects Node.js and installs dependencies
   - Runs `npm start` command
   - Provides HTTPS endpoint

## Code Organization

### Backend (server.js)
- Database connection pool with SSL support for production
- Automatic table initialization on startup
- Error handling for all database operations
- Static file serving for frontend

### Frontend (public/)
- **index.html**: Semantic HTML structure
- **styles.css**: Component-based styling with CSS variables potential
- **app.js**: Separation of concerns (API calls, rendering, event handling)

## Future Enhancement Ideas

### Features
- User authentication and multi-user support
- Task categories/tags
- Due dates and reminders
- Search and advanced filtering
- Drag-and-drop reordering
- Task sharing and collaboration

### Technical Improvements
- Add input rate limiting
- Implement optimistic UI updates
- Add loading states and animations
- Service worker for offline support
- Database migrations system
- Automated testing (Jest, Supertest)
- TypeScript conversion
- React/Vue frontend for better state management

### DevOps
- CI/CD pipeline with GitHub Actions
- Staging environment
- Database backups
- Monitoring and logging (Sentry, LogRocket)
- Performance metrics

## Dependencies

### Production
- `express`: ^4.18.2 - Web framework
- `pg`: ^8.11.3 - PostgreSQL client
- `dotenv`: ^16.3.1 - Environment variable management
- `cors`: ^2.8.5 - Cross-origin resource sharing

### Development
- `nodemon`: ^3.0.2 - Auto-restart during development

## Environment Variables

Required for deployment:
- `DATABASE_URL`: PostgreSQL connection string (auto-set by Railway)
- `NODE_ENV`: Set to "production" on Railway
- `PORT`: Application port (auto-set by Railway)

## Troubleshooting

### Common Issues

**Database connection fails**:
- Verify `DATABASE_URL` is correctly set
- Check PostgreSQL service is running
- Ensure SSL settings match environment (production vs development)

**Tasks not persisting**:
- Confirm database table was created (check server logs)
- Verify API endpoints are returning 200/201 status codes

**Frontend not loading**:
- Check static files are in `public/` directory
- Verify server.js is serving static files
- Check browser console for JavaScript errors

## Performance Considerations

- Database queries use indexed `id` column for fast lookups
- Frontend renders incrementally (no full page reloads)
- CSS transitions hardware-accelerated
- Minimal external dependencies for fast load times

## Accessibility

- Semantic HTML structure
- Form labels and ARIA attributes can be added
- Keyboard navigation support
- High contrast color ratios
- Responsive design for all screen sizes

---

**Last Updated**: 2025-12-30
**Built by**: Claude (Anthropic)
**For**: Blooming Tree Financial and Consulting Services
