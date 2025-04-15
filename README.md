# Pet Adoption Platform
A full-stack web application for pet adoption management that connects pet shelters with potential adopters. The platform features a dual interface - an admin dashboard for shelter staff to manage pets and applications, and a user-friendly shopping view for adopters to browse and apply for pets.

Key capabilities include:
- Comprehensive pet management system for shelters
- Streamlined adoption application process
- Advanced search with filters for breed, age, size etc.
- Secure user authentication and role-based access
- Real-time application status tracking
- Cloud-based image management
- Mobile-responsive modern UI

Built with React, Redux, Node.js, MongoDB, Vite and Tailwind CSS, following modern web development best practices.

## Features

- User Authentication & Authorization
- Admin Dashboard for managing pets, adoption applications, users and contact messages  
- Shopping/Browse view for potential adopters
- Pet listings with search and filter capabilities
- Adoption application system
- Image upload functionality using Cloudinary
- Responsive design with modern UI components

## Tech Stack

### Frontend
- React 19
- Vite for build tooling and development
- Redux Toolkit for state management
- React Router for navigation
- Tailwind CSS for styling
- shadcn/ui component library
- React Hook Form for form handling
- Zod for validation
- Axios for API requests

### Backend
- Node.js with Express
- MongoDB for database
- JWT for authentication
- Cookie-based session management
- Morgan for logging
- Helmet for security

### Cloud Services
- Cloudinary for image storage and optimization
- MongoDB Atlas for database hosting

## Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── config/
│   │   └── assets/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── helpers/
│   └── server.js
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git
- MongoDB Atlas account
- Cloudinary account

## Getting Started

1. Clone the repository

2. Set up the backend:
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file with:
   ```
   FRONTEND_URL=http://localhost:5173
   DB_URL=your_mongodb_atlas_url
   PORT=8080
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

3. Set up the frontend:
   ```bash
   cd frontend
   npm install
   ```

4. Start the development servers:
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm start

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

5. Access the application:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:8080

## Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `npm start` - Start the server
- `npm run dev` - Start with nodemon for development

## API Routes

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - User login
- POST `/api/auth/logout` - User logout

### Admin
- GET/POST `/api/admin/pets` - Manage pets
- GET/POST `/api/admin/orders` - Manage adoption orders
- GET/POST `/api/admin/messages` - Manage contact messages

### Shop
- GET `/api/shop/pets` - Get pet listings
- GET `/api/shop/search` - Search pets
- POST `/api/shop/order` - Create adoption order
- GET/POST `/api/shop/review` - Manage reviews
- GET `/api/shop/about` - Get about section content

### Common
- GET/POST `/api/common/contact` - Contact form submissions
- GET `/api/common/stats` - Platform statistics
