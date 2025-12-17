import { useEffect, useState } from 'react';

/**
 * Busca N livros aleatórios SEM repetição
 * @param {number} quantity
 */
export function useRandomBooks(quantity = 3) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const usedNumbers = new Set();
    const MAX_ATTEMPTS = 20;

    async function fetchBooks() {
      try {
        setLoading(true);
        const books = [];
        let attempts = 0;

        while (
          books.length < quantity &&
          attempts < MAX_ATTEMPTS
        ) {
          attempts++;

          const response = await fetch(
            'https://potterapi-fedeperin.vercel.app/en/books/random'
          );

          if (!response.ok) {
            throw new Error('Erro ao buscar livro');
          }

          const book = await response.json();

          if (!usedNumbers.has(book.number)) {
            usedNumbers.add(book.number);
            books.push(book);
          }
        }

        if (isMounted) {
          setData(books);
          setError(null);
        }
      } catch (err) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchBooks();

    return () => {
      isMounted = false;
    };
  }, [quantity]);

  return { data, loading, error };
}
