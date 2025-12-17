import { useEffect, useState } from 'react';
import {
  getFavorites,
  removeFromFavorites
} from '../services/favoritesService';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  function handleRemove(bookNumber) {
    const updatedFavorites =
      removeFromFavorites(bookNumber);

    setFavorites(updatedFavorites);
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
    }, 2500);
  }

  return (
    <>
      {/* LISTA OU MENSAGEM VAZIA */}
      {favorites.length === 0 ? (
        <p className="null-favorite">
          Nenhum livro favoritado ainda.
        </p>
      ) : (
      <div className='page-favorite'>
        <ul className="page-content">
          {favorites.map((book) => (
            <li key={book.number}>
              <img
                src={book.cover}
                width="50"
                alt={`Capa do livro ${book.number}`}
              />{' '}
              Livro {book.number} - {book.originalTitle}
              <br />
              <button
                className="btn-remove"
                onClick={() =>
                  handleRemove(book.number)
                }
              >
                Remover dos favoritos
              </button>
            </li>
          ))}
        </ul>
        </div>
      )}

      {/* POP-UP SEMPRE DISPONÍVEL */}
      {showPopup && (
        <div className="popup popup-remove">
          Livro removido dos favoritos!
        </div>
      )}
    </>
  );
}
