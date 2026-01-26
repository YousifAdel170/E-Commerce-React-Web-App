# E-Commerce Web Application (Frontend)

A full-featured **e-commerce frontend** built with **React**, **Redux**, **React Bootstrap**, and **i18n** for multilingual support. The platform delivers a seamless shopping experience with secure authentication, robust state management, and a clean, responsive UI.

## Features

### Authentication & User Management

- Secure **login, registration, password recovery, and verification**.
- **Role-based access control** for Admin and User roles.
- Protected routes to ensure sensitive pages are accessible only to authorized users.

### Product Management

- Complete **CRUD functionality** for:
  - Products
  - Categories
  - Brands
  - Coupons
  - Reviews
  - User addresses
- Dynamic product filtering, sorting, and detail views.

### Shopping Experience

- **Shopping Cart** and **Wishlist** features:
  - Add/remove products
  - Select quantity and color
  - Apply coupon discounts
- Multiple payment options: **Cash on Delivery** and **Online Payment**.

### Order Management

- Admin and user dashboards display **real-time order status updates**:
  - Paid
  - Delivered
- Users can track their orders, while admins manage all orders efficiently.

### Multilingual Support

- Implemented **i18n internationalization** for multiple languages.
- Users can easily switch languages in the UI.
- All texts, buttons, and messages are dynamically translated.

### Frontend Architecture

- **React + Redux** for scalable state management.
- **React Bootstrap** for responsive UI components.
- Clean and modern **UI/UX design**.
- **Protected routes** for secure navigation.
- Modular and reusable components for maintainable code.

## Technologies Used

- **Frontend:** React, Redux, React Bootstrap, HTML5, CSS3, JavaScript (ES6+)
- **State Management:** Redux Toolkit
- **Routing & Security:** React Router, Protected Routes
- **HTTP Requests:** Axios
- **Notifications:** React Toastify
- **Internationalization:** react-i18next (i18n)

## Project Structure (Frontend)

src/
├── Api/ # The base URL
├── assets/ # contians fonts, icons, imgs
├── Components/ # Reusable UI components
├── Admin/ # Reusable Admin UI components
├── Brand/ # Reusable Brand UI components
├── Cart/ # Reusable Cart UI components
├── Checkout/ # Reusable Checkout UI components
├── Home/ # Reusable Home UI components
├── Products/ # Reusable Products UI components
├── Rate/ # Reusable Rate UI components
├── User/ # Reusable User UI components
├── Utility/ # Reusable Products Utility components

├── constants/ # It contains the constants that used in the application
├── data/ # It was for some tests but not used now
├── hooks/ # contains the hooks for each like admin hooks, auth hooks, ...
├── i18n/ # Translation files and i18n configuration
├── Pages/ # Page components (Home, Product, Cart, Admin, etc.)
├── redux/ # Redux store, slices, actions
├── App.jsx # Main app component with routes
└── main.jsx # Entry point
└── index.css # The Custom CSS For that used in the whole application

## Getting Started

### Prerequisites

- Node.js >= 16.x
- npm or yarn
- Backend API running (for full functionality)

## Notes

- Make sure u running ur e-commerce backend since this is the frontend only

### Installation

```bash
# Clone the repository
git clone https://github.com/YoussefAdel170/E-Commerce-React-Web-App.git

# Navigate to the project folder
cd E-Commerce-React-Web-App

# Install dependencies
npm install
# or
yarn install

# Start the development server
npm run dev
```

## License

## License

This project is licensed under the [MIT License](LICENSE).
