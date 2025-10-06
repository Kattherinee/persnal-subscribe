import { Route, Routes } from 'react-router-dom';

import { Register } from './pages/auth/Register';

import { Layout } from './layouts/layout';
import { ProfilePage } from './pages/mainPages/ProfilePage/ProfilePage';
import { TariffsPage } from './pages/mainPages/TariffsPage';
import { MyTariffsPage } from './pages/mainPages/MyTariffsPage';
import { PlanDetailPage } from './pages/PlanDetailPage';
import { AllUsersPage } from './pages/admin/AllUsersPage';
// import { AdminLayout } from './layout/AdminLayout';
import { RequireAuth } from './utils/RequireAuth';
import { RequireAdmin } from './utils/RequireAdmin';
import { AdminLayout } from './layouts/adminLayout';
import { LoginTabs } from './pages/auth/LoginTabs';

function App() {
  return (
    <Routes>
      {/* Публичные страницы */}
      <Route path="/signin" element={<LoginTabs />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/signin-admin" element={<LoginTabs />} />

      {/* Пользовательские приватные страницы */}
      <Route
        path="/"
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route index element={<ProfilePage />} />
        <Route path="tariffs" element={<TariffsPage />} />
        <Route path="my-tariffs" element={<MyTariffsPage />} />
        <Route path="my-tariffs/:id" element={<PlanDetailPage />} />
      </Route>

      {/* Админские приватные страницы */}
      <Route
        path="/admin"
        element={
          <RequireAdmin>
            <AdminLayout />
          </RequireAdmin>
        }
      >
        <Route path="users" element={<AllUsersPage />} />
      </Route>
    </Routes>
  );
}

export default App;
