import React from 'react';
import ReactDOM from 'react-dom';
import { createRoutes, Route, RouterProvider } from 'react-router-dom'; // Import necessary components
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';

// Import your components for each route
import RootLayout from './layouts/RootLayout';
import SignIn from './pages/SignIn';
import Review from './pages/Review';
import Submit from './pages/Submit';

// Define your routes using createRoutes function
const routes = createRoutes([
  { path: '/', element: <RootLayout />, // Define your root layout
    children: [
      { index: true, element: <SignIn /> }, // Set SignIn as index route
      { path: 'review', element: <Review /> },
      { path: 'submit', element: <Submit /> }
    ]
  }
]);

// Render the App component with ChakraProvider and RouterProvider
ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider routes={routes}>
        <App />
      </RouterProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
