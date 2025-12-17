import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { addToFavorites } from '../services/favoritesService';

export default function BookDetailPage() {
  const { state: book } = useLocation();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  if (!book) {
    navigate('/');
    return null;
  }

  function handleAddToFavorites() {
    addToFavorites(book);
    setShowPopup(true);

    // Fecha o popup automaticamente
    setTimeout(() => {
      setShowPopup(false);
    }, 2500);
  }

  return (
    <div className="page-content">
      <h1>
        Livro {book.number} - {book.originalTitle}
      </h1>
      <img src={book.cover} alt="Capa" />
      <p><strong>Data de publicação:</strong> {book.releaseDate}</p>
      <p><strong>Páginas:</strong> {book.pages}</p>
      <p className="description">
        <strong>Descrição:</strong> {book.description}
      </p>

      <button onClick={() => navigate('/')}>
        Voltar à Página Inicial
      </button>

      <button onClick={handleAddToFavorites}>
        Adicionar aos Favoritos
      </button>

      {/* POP-UP */}
      {showPopup && (
        <div className="popup">
          Livro adicionado aos favoritos!
        </div>
      )}
    </div>
  );
}
