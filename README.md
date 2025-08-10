# 🎨 Fusion Manaba - The Frontend Storefront!

![Vite](https://img.shields.io/badge/Vite-5.x-blue.svg?logo=vite)
![React](https://img.shields.io/badge/React-18.x-cyan.svg?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-teal.svg?logo=tailwindcss)

Welcome to the beautiful, modern, and interactive storefront for **Fusion Manaba**! 🧁 This repository contains the user-facing application, built with a powerful and fast stack to provide a delightful shopping experience.

This application is the "face" of the store, and it communicates with our powerful [Django Backend API](https://github.com/your-username/fusion-manaba-backend) to get all its data.

---

## ✨ Where We Are Now

The project foundation is complete! We have a working, styled, and responsive application that successfully connects to the backend and displays product data. The "steel thread" is in place, and the core user experience is taking shape.

### ✅ Completed Milestones:

- **🚀 Modern Tech Stack:** Project set up with **Vite**, **React**, and **TypeScript** for a blazing-fast development experience and type-safe code.
- **💅 Styled with Tailwind CSS:** Fully responsive layout with **automatic dark mode** support based on system preference.
- **🔗 API Connection:** Successfully fetching and displaying the full product list from our Django backend.
- **🏗️ Component-Based Architecture:** The UI is broken down into reusable components (`Layout`, `Navbar`, `ProductCard`, etc.) and managed by `react-router-dom`.
- **🛒 Cart State Management:** A global `CartProvider` using React Context has been built to manage the shopping cart state across the entire application. The plumbing is ready!

---

## 🎯 Next Steps: Bringing the Cart to Life!

The invisible state management for the cart is done. Now it's time to build the fun, interactive UI components that will use it.

1. **🛒 Create an `AddToCartButton` Component:**
    - Build a reusable button that will live on each `ProductCard`.
    - This button will use our `useCart()` hook to call the `addItem` function, sending the request to the backend API.

2. **🛍️ Update the `Navbar`:**
    - The `Navbar` will also use the `useCart()` hook to get the current cart state.
    - It will display a dynamic cart icon/link with a badge showing the total number of items. This will update _instantly_ whenever a user adds a product anywhere on the site!

3. **🏞️ VIEW:
    - Create a dedicated cart view (as a slide-out panel, modal, or a full `/cart` page).
    - This component will display all items in the cart, their quantities, and subtotals.
    - It will include controls to update item quantities and remove items from the cart, calling our API endpoints.

After these steps, the core shopping experience will be complete, paving the way for the final checkout and payment process.

---

## 🚀 Getting Started Locally

To run this project, you'll need both the frontend and backend servers running.

1. **Start the Backend Server (https://github.com/richtxteditor/fusion-manaba-backend):**
    Navigate to your `fusion-manaba-backend` directory and run the Django development server.

    ```bash
    # In terminal 1
    cd ../fusion-manaba-backend
    source venv/bin/activate
    python manage.py runserver
    ```

2. **Start the Frontend Server:**
    In a separate terminal, navigate to this directory and start the Vite dev server.

    ```bash
    # In terminal 2
    npm install
    npm run dev
    ```

3. **Open Your Browser:**
    Navigate to `http://localhost:5173`. Enjoy the view! ✨
