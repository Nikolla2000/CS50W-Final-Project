import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import HomePage from './pages/HomePage.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SomePage from './pages/SomePage.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import Layout from './components/Layout/Layout.tsx'
import LoginPage from './pages/LoginPage.tsx'
import RegisterPage from './pages/RegisterPage.tsx'
import { AuthProvider } from './providers/AuthProvider.tsx'
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      </Layout>
    ),
    errorElement: <NotFoundPage/>
  },
  {
    path: '/somepage',
    element: (
      <Layout>
        <ProtectedRoute>
          <SomePage />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
