import { memo, useContext } from 'react';
import { Card } from '../Card/Card';
import { Profile } from '../Profile/Profile';

export const Main = memo(({ cards, onCardDelete, open }) => {
  // console.log(Main, 'render');
  return (
    <main className="main">
      <Profile />
      <section className="elements">
        <h1>{Math.random()}</h1>
        <ul className="places-grid list">
          {cards.map((item, index) => (
            <Card key={index} card={item} onCardDelete={onCardDelete} open={open} />
          ))}
        </ul>
      </section>
    </main>
  );
});
