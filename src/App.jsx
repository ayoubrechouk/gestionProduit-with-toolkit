import { Routes, Route, Navigate } from 'react-router-dom';
import List from './components/List';
import ProductForm from './components/ProductForm';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/produits" />} />
      <Route path="/produits" element={<List />} />
      <Route path="/add" element={<ProductForm />} />
      <Route path="/edit/:id" element={<ProductForm />} />
      <Route path="*" element={<h2>404 - Page non trouvée</h2>} />
    </Routes>
  );
}