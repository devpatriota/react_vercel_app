import { useNavigate } from 'react-router-dom';
import { useRandomBooks } from '../hooks/useRandomBook';

export default function HomePage() {
  const { data: books, loading, error } = useRandomBooks(3);
  const navigate = useNavigate();

  if (loading) return <p className='loading'>Carregando...</p>;
  if (error || books.length === 0)
    return <p>Erro ao carregar livros.</p>;

  return (
    <div className="home-page">
      <div className="books-grid">
        {books.map((book) => (
          <div className="book-card" key={book.number}>
            <img className='capa-book'
              src={book.cover}
              alt={`Capa do Livro ${book.number}`}
              onClick={() =>
                navigate('/book', { state: book })
              }
            />
            <h2 className='titulo-book'>
              Livro {book.number} - {book.originalTitle}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}