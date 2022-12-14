import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Admin from './pages/Admin';
import Animal from './pages/Animal';
import Exam from './pages/Exam';
import Food from './pages/Food';
import Home from './pages/Home';
import Login from './pages/Login';

export default function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/animal" element={<Animal />} />
        <Route path="/home" element={<Home />} />
        <Route path="/food" element={<Food />} />
        <Route path="/exam" element={<Exam />} />
      </Routes>
    </BrowserRouter>
  )
}