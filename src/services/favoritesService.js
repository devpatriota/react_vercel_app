const FAVORITES_KEY = 'favoriteBooks';

export function getFavorites() {
  const raw = localStorage.getItem(FAVORITES_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function addToFavorites(book) {
  const favorites = getFavorites();
  const exists = favorites.some((b) => b.number === book.number);

  if (!exists) {
    favorites.push(book);
    saveFavorites(favorites);
  }
}

export function clearFavorites() {
  localStorage.removeItem(FAVORITES_KEY);
}

export function removeFromFavorites(bookNumber) {
  const favorites =
    JSON.parse(localStorage.getItem('favoriteBooks')) || [];

  const updatedFavorites = favorites.filter(
    (book) => book.number !== bookNumber
  );

  localStorage.setItem(
    'favoriteBooks',
    JSON.stringify(updatedFavorites)
  );

  return updatedFavorites;
}