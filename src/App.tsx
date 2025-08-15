import { Route, Routes } from 'react-router-dom';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      {/* <Route path="*" element={<NotFound />} /> 404 страница */}
    </Routes>
  );
}

export default App;
