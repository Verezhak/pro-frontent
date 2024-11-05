# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh




// {
//     "scripts": {
//         "build": "react-scripts build",
//         "start": "react-scripts start"
//     }
// }






// src/components/ColumnDetails.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCards } from '../redux/cards/operations';
import { selectAllCards, selectCardsLoading, selectCardsError } from '../redux/cards/selectors';
import Column from './Column'; // Компонент для колонки

const ColumnDetails = ({ boardId }) => {
  const dispatch = useDispatch();
  const cards = useSelector(selectAllCards);
  const loading = useSelector(selectCardsLoading);
  const error = useSelector(selectCardsError);

  useEffect(() => {
    // Завантажити картки для борда
    dispatch(fetchCards({ boardId }));
  }, [dispatch, boardId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Групування карток за колонками
  const columns = {};
  cards.forEach(card => {
    if (!columns[card.columnId]) {
      columns[card.columnId] = [];
    }
    columns[card.columnId].push(card);
  });

  return (
    <div className="columns">
      {Object.keys(columns).map(columnId => (
        <Column key={columnId} columnId={columnId} cards={columns[columnId]} />
      ))}
    </div>
  );
};

export default ColumnDetails;
