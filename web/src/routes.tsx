import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Admin from './pages/Admin';
import Animal from './pages/Animal';
import EditAnimal from './pages/Animal/EditAnimal';
import Exam from './pages/Exam';
import Food from './pages/Food';
import Home from './pages/Home';
import Login from './pages/Login';
import Vaccine from './pages/Vaccine';
import Vet from './pages/Vet';
import VetHome from './pages/VetHome';

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
        <Route path="/vet" element={<Vet />} />
        <Route path="/animal/editanimal/:idAnimal" element={<EditAnimal />} />
        <Route path="/vaccine" element={<Vaccine />} />
        <Route path="/vethome" element={<VetHome />} />
      </Routes>
    </BrowserRouter>
  )
}