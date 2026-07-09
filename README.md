# Product List with Cart

A responsive product listing page that allows users to browse desserts, manage a shopping cart, and complete an order through a clean, interactive interface.

Built as part of a Frontend Mentor challenge, this project marks my first application built with React. The primary goal was to become comfortable with React's component model, hooks, and state management while establishing a reusable foundation for future React projects.

The project also represents the first React integration of my custom Sass design system, which provides reusable design tokens, utility classes, and a consistent styling workflow across projects. Adapting the system for React helped establish a scalable setup that I plan to reuse in future applications.

Alongside learning React, I also began incorporating small Node.js build scripts into my workflow. These scripts automate repetitive tasks such as transforming project data into strongly typed TypeScript modules and synchronizing design tokens like breakpoints between Sass and TypeScript, helping to maintain a single source of truth throughout the project.

---

## Technologies used

- React
- Vite
- TypeScript
- SCSS Modules
- Zod
- Vitest
- React Testing Library
- User Event
- Node.js build scripts

---

## Features

- Browse available products
- Add and remove items from the cart
- Increment and decrement product quantities
- Automatically calculate order totals
- Order confirmation dialog
- Responsive images using <picture>
- Responsive layout for all screen sizes
- Accessible semantic markup
- Fully responsive design

---

## Architecture

### Reducer-Based State Management

Application state is managed using React's useReducer hook.

The reducer stores only the application's domain state by tracking product quantities keyed by product slug. Product information such as names, prices, and images remains separate from the reducer state and is derived when rendering the UI.

Reducers remain:

- Pure
- Deterministic
- Side-effect free

### Reusable Design System

The application uses my custom Sass design system, which serves as the foundation for styling. Design tokens are defined using Sass maps and compiled into CSS custom properties, providing a consistent and scalable approach to spacing, typography, colours, sizing, and layout.

The design system was adapted to work seamlessly within a React + Vite workflow while remaining reusable across future projects.

### Data Generation

Rather than importing raw JSON directly into the application, a small Node.js build script transforms the product data into a typed TypeScript module.

During the build process the script:

- Validates the product data
- Imports image assets
- Generates a strongly typed products.ts module

This removes the need for manually maintaining image imports while keeping the application fully type-safe.

### Responsive Images

A reusable Picture component encapsulates responsive image handling using the native <picture> element.

The component abstracts responsive image selection while keeping the API simple for future projects.

### Testing

The application includes:

- Unit tests for the cart reducer
- Component tests for the ProductCard component
- Integration tests covering the primary user flow from adding products to updating the shopping cart

The tests focus on user behaviour using React Testing Library and User Event while keeping business logic independently verified through reducer tests.

---

## What I've learned

- Building my first application using React
- Managing application state with useState, useReducer, and useEffect
- Designing reusable React components
- Thinking in terms of component composition rather than page-based JavaScript
- Integrating my existing Sass design system into a React + Vite workflow
- Writing unit, component, and integration tests using Vitest and React Testing Library
- Using small Node.js scripts to automate repetitive development tasks

---

## Live Demo

https://fm-productlist-with-cart.netlify.app/

---

## Preview

https://github.com/user-attachments/assets/67dea796-888f-4613-b340-a1facafdc081
