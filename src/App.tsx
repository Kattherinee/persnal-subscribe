import { Route, Routes } from 'react-router-dom';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { Layout } from './layout';
import { ProfilePage } from './pages/mainPages/ProfilePage';
import { TariffsPage } from './pages/mainPages/TariffsPage';
import { MyTariffsPage } from './pages/mainPages/MyTariffsPage';
import { PlanDetailPage } from './pages/PlanDetailPage';

function App() {
  return (
    <Routes>
      {/* публичные страницы */}
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Register />} />

      {/* приватные страницы внутри Личного кабинета */}
      <Route path="/" element={<Layout />}>
        <Route index element={<ProfilePage />} /> {/* / */}
        <Route path="tariffs" element={<TariffsPage />} />
        <Route path="my-tariffs" element={<MyTariffsPage />} />
      </Route>
      <Route path="/my-tariffs/:id" element={<PlanDetailPage />} />

      {/* 404 */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}

export default App;
