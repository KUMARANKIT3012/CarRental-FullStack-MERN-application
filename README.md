# 🚗 CarRental - Full-Stack MERN Application

A modern, full-featured car rental platform built with the MERN stack (MongoDB, Express.js, React, Node.js). This application provides a seamless experience for users to browse, book, and manage car rentals, with separate dashboards for customers and car owners.

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### For Customers
- 🔍 **Browse & Search** - Explore available cars with advanced filters and sorting options
- 📄 **Detailed Car Pages** - View comprehensive car information, images, and user reviews
- 📅 **Easy Booking** - Book cars with custom pickup/return dates and real-time pricing
- 👤 **User Dashboard** - Manage your bookings, view history, and track reservations
- 🔐 **Secure Authentication** - JWT-based authentication with role-based access control

### For Car Owners
- 🚙 **Car Management** - Add, edit, and remove cars from your inventory
- 📊 **Owner Dashboard** - Track and manage all bookings for your vehicles
- 📸 **Image Upload** - Upload car images using ImageKit integration
- 💰 **Pricing Control** - Set custom pricing for your vehicles

### General
- 📱 **Responsive Design** - Fully responsive UI built with Tailwind CSS
- 🎨 **Modern UI/UX** - Clean and intuitive interface
- 🔒 **Secure** - Password hashing with bcrypt, JWT tokens
- ⚡ **Fast Performance** - Built with Vite for optimal frontend performance

## 🛠 Tech Stack

### Frontend
- **React** (v19.1.1) - UI library
- **Vite** - Build tool and development server
- **React Router DOM** (v7.9.4) - Client-side routing
- **Axios** (v1.13.2) - HTTP client
- **Tailwind CSS** (v4.1.16) - Utility-first CSS framework
- **React Hot Toast** (v2.6.0) - Toast notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** (v5.1.0) - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** (v8.19.2) - MongoDB object modeling
- **JWT** (v9.0.2) - Authentication
- **Bcrypt** (v6.0.0) - Password hashing
- **ImageKit** (v6.0.0) - Image management and CDN
- **Multer** (v2.0.2) - File upload handling
- **Nodemon** (v3.1.10) - Development auto-reload

## 📁 Project Structure

```
CarRental-FullStack-MERN-application/
├── FullStackProjects/
│   └── CarRental/
│       ├── client/                 # React frontend
│       │   ├── public/
│       │   ├── src/
│       │   │   ├── components/    # Reusable components
│       │   │   ├── pages/         # Page components
│       │   │   ├── context/       # React context
│       │   │   ├── utils/         # Utility functions
│       │   │   └── App.jsx        # Main app component
│       │   ├── package.json
│       │   └── vite.config.js
│       │
│       ├── server/                # Express backend
│       │   ├── config/           # Configuration files
│       │   ├── controllers/      # Route controllers
│       │   ├── models/           # Mongoose models
│       │   ├── routes/           # API routes
│       │   ├── middleware/       # Custom middleware
│       │   ├── utils/            # Utility functions
│       │   ├── server.js         # Entry point
│       │   └── package.json
│       │
│       └── README.md
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (>= 16.x)
- **npm** (>= 8.x) or **yarn** (>= 1.22.x)
- **MongoDB** (Atlas account or local installation)
- **Git** for version control

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/KUMARANKIT3012/CarRental-FullStack-MERN-application.git
cd CarRental-FullStack-MERN-application/FullStackProjects/CarRental
```

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

### 3. Install Backend Dependencies

```bash
cd ../server
npm install
```

## 🔧 Environment Variables

Create a `.env` file in the `server/` directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=your_mongodb_connection_string

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# ImageKit Configuration
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

# CORS
CLIENT_URL=http://localhost:5173
```

### Getting MongoDB Connection String
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Click "Connect" and copy your connection string
4. Replace `<password>` with your database user password

### Getting ImageKit Credentials
1. Sign up at [ImageKit. io](https://imagekit.io/)
2. Go to Dashboard → Developer Options
3. Copy your Public Key, Private Key, and URL Endpoint

## 🏃‍♂️ Running the Application

### Development Mode

Open two separate terminal windows:

**Terminal 1 - Frontend (from `client/` directory):**
```bash
npm run dev
```
The frontend will run on `http://localhost:5173`

**Terminal 2 - Backend (from `server/` directory):**
```bash
npm run server
```
The backend will run on `http://localhost:5000`

### Production Build

**Build the frontend:**
```bash
cd client
npm run build
```

**Start the production server:**
```bash
cd ../server
npm start
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/logout` - Logout user
- `GET /api/auth/profile` - Get user profile (protected)

### Cars
- `GET /api/cars` - Get all cars (with filters)
- `GET /api/cars/:id` - Get single car details
- `POST /api/cars` - Add new car (owner only)
- `PUT /api/cars/:id` - Update car (owner only)
- `DELETE /api/cars/:id` - Delete car (owner only)

### Bookings
- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

### Reviews
- `GET /api/reviews/: carId` - Get car reviews
- `POST /api/reviews` - Add review (after booking)

## 📸 Screenshots

<!-- Add screenshots of your application here -->
_Coming soon.. ._

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 📝 License

This project is currently unlicensed. Consider adding a license file (e.g., MIT License) to specify usage rights.

## 👨‍💻 Author

**KUMARANKIT3012**
- GitHub: [@KUMARANKIT3012](https://github.com/KUMARANKIT3012)

## 🙏 Acknowledgments

- MongoDB for the excellent database solution
- React team for the amazing frontend library
- All open-source contributors whose packages made this project possible

## 📞 Support

If you encounter any issues or have questions: 
- Open an issue in the [GitHub repository](https://github.com/KUMARANKIT3012/CarRental-FullStack-MERN-application/issues)
- Contact the maintainer through GitHub

---

⭐ If you find this project helpful, please consider giving it a star! 

**Built with ❤️ using the MERN Stack**
