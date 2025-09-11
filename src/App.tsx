import { Route, Routes } from 'react-router-dom';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { LoginAdmin } from './pages/auth/LoginAdmin';

import { Layout } from './layouts/layout';
import { ProfilePage } from './pages/mainPages/ProfilePage';
import { TariffsPage } from './pages/mainPages/TariffsPage';
import { MyTariffsPage } from './pages/mainPages/MyTariffsPage';
import { PlanDetailPage } from './pages/PlanDetailPage';
import { AllUsersPage } from './pages/admin/AllUsersPage';
// import { AdminLayout } from './layout/AdminLayout';
import { RequireAuth } from './utils/RequireAuth';
import { RequireAdmin } from './utils/RequireAdmin';
import { AdminLayout } from './layouts/adminLayout';

function App() {
  return (
    <Routes>
      {/* Публичные страницы */}
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/signin-admin" element={<LoginAdmin />} />

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
