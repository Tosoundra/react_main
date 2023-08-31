import { useEffect, useState } from 'react';
import { api } from '../API';
import Card from '../Card/Card';
import Profile from '../Profile/Profile';

const Main = ({ cards, onCardDelete }) => {
  return (
    <>
      <main className="main">
        <Profile />
        <section className="elements">
          <ul className="places-grid list">
            {cards.map((item, index) => (
              <Card key={index} card={item} onCardDelete={onCardDelete} />
            ))}
          </ul>
        </section>
      </main>
    </>
  );
};

export default Main;
