import { Navigate, createBrowserRouter } from 'react-router-dom'
import UsersTable from './pages/UsersTable'
import Chart from './pages/Chart'
import WebLayout from './components/WebLayout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <WebLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to='/users' />,
      },
      {
        path: '/users',
        element: <UsersTable />,
      },
      {
        path: '/chart',
        element: <Chart />,
      },
    ],
  },
])

export default router
