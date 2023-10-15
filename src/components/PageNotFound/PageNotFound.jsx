import { Link } from 'react-router-dom';

export const PageNotFound = () => {
  return (
    <main className="pageNotFound">
      <h1>
        Вы попали на несуществующую страницу{' '}
        <Link to="/" className="link button transition">
          Вернуться
        </Link>
      </h1>
    </main>
  );
};
