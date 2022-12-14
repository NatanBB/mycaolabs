import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Admin from './pages/Admin';
import Animal from './pages/Animal';
import Login from './pages/Login';

export default function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/animal" element={<Animal />} />
      </Routes>
    </BrowserRouter>
  )
}