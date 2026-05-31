import { createBrowserRouter, Navigate } from 'react-router-dom';
import LeadsPage from './pages/LeadsPage';
import EditLeadPage from './pages/EditLeadPage';
import Layout from './components/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/leads" replace /> },
      { path: 'leads', element: <LeadsPage /> },
      { path: 'leads/:id/edit', element: <EditLeadPage /> },
    ],
  },
]);

export default router;
