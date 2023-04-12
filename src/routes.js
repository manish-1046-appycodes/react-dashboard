import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
// pages
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import Profile from './pages/ProfilePage';
import History from './pages/HistoryPage';
import FAQ from './pages/FaqPage';
import RegisterPage from './pages/RegisterPage';
import SearchPage from './pages/SearchPage';
import { NotAuthenticatedUser, OnlyAuthenticatedUser } from './utils/ProtectedRoutes';
import TasksPage from './pages/TasksPage';

// ----------------------------------------------------------------------

// page not found
const PageNotFound = () => (
  <SimpleLayout>
    <Page404 />
  </SimpleLayout>
);

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" errorElement={<PageNotFound />}>
      <Route path="/">
        <Route element={<OnlyAuthenticatedUser />}>
          <Route index element={<Navigate to="/dashboard" />} />

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<SearchPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="profile" element={<Profile />} />
            <Route path="history" element={<History />} />
            <Route path="faq" element={<FAQ />} />
          </Route>
        </Route>

        <Route element={<NotAuthenticatedUser />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Route>
    </Route>
  )
);
