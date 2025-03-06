import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Link,
  Outlet,
} from 'react-router-dom';

import { AppWideContextProvider } from './context/AppWideContext';
import Account from './components/Account';
import Index from './components/Index';

const AppLayout = () => (
  <>
    <nav
      style={{
        display: 'flex',
        gap: '2rem',
        marginBottom: '1rem',
      }}
    >
      <Link to="/">Index</Link>
      <Link to="/account">Account</Link>
    </nav>
    <main>
      <Outlet />
    </main>
  </>
);

const router = createBrowserRouter([
  {
    element: <AppLayout></AppLayout>,
    children: [
      {
        path: '/',
        element: <Index></Index>,
      },
      {
        path: '/account',
        element: <Account></Account>,
      },
    ],
  },
]);

function App() {
  return (
    <AppWideContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </AppWideContextProvider>
  );
}

export default App;
