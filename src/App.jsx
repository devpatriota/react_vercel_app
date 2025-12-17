import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookDetailPage from './pages/BookDetailPage';
import FavoritesPage from './pages/FavoritesPage';

export default function App() {
  return (
    <BrowserRouter>
      <nav className='main-nav'>
        <Link to="/">Home</Link> | <Link to="/favorites">Favoritos</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book" element={<BookDetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </BrowserRouter>
  );
}
