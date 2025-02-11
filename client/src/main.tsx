import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import HomePage from './pages/HomePage.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SomePage from './pages/SomePage.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import Layout from './components/Layout/Layout.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><HomePage /></Layout>,
    errorElement: <NotFoundPage/>
  },
  {
    path: '/somepage',
    element: <Layout><SomePage /></Layout>,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
