import { createBrowserRouter } from 'react-router-dom'
import UsersTable from './pages/UsersTable'

const router = createBrowserRouter([
  {
    path: '/',
    element: <UsersTable />,
  },
])

export default router
