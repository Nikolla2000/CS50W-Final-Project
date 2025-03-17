import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage.tsx'
import Layout from './components/Layout/Layout.tsx'
import LoginPage from './pages/LoginPage.tsx'
import RegisterPage from './pages/RegisterPage.tsx'
import { AuthProvider } from './providers/AuthProvider.tsx'
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute.tsx'
import routes from './utils/routes.tsx'
import AddGoalForm from './components/Goals/AddGoalForm.tsx'

const router = createBrowserRouter([
  ...routes.map((route) => ({
    path: route.path,
    element: (
      <Layout>
        <ProtectedRoute>
          {route.element}
        </ProtectedRoute>
      </Layout>
    ),
    errorElement: <NotFoundPage />,
  })),
  {
    path: '/addgoal',
    element: (
      <Layout>
        <ProtectedRoute>
          <AddGoalForm/>
        </ProtectedRoute>
      </Layout>
    ),
    errorElement: <NotFoundPage />,
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
