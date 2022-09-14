import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import { asyncStorage } from './async-storage';

export const FAVORITE_ACTIONS = {
  SET_ITEM: 'SET_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  SET_ALL_ITEMS: 'SET_ALL_ITEMS',
  CLEAR: 'CLEAR',
};

// Initial State
const initialState = {
  movies: [],
};

// Initial Context
const Context = React.createContext();

/**
 *
 * @param {*} state
 * @param {*} action
 * @returns state
 */
function contextReducer(state, action) {
  switch (action.type) {
    case FAVORITE_ACTIONS.SET_ITEM:
      return { ...state, movies: [...state.movies, action.payload] };
    case FAVORITE_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        movies: state.movies.filter(({ id }) => id !== action.payload.id),
      };
    case FAVORITE_ACTIONS.SET_ALL_ITEMS:
      return { ...state, movies: action.payload };
    case FAVORITE_ACTIONS.CLEAR:
      return initialState;
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// propTypes
FavoriteContext.propTypes = {
  children: PropTypes.node.isRequired,
};

function FavoriteContext({ children }) {
  // ------- State and Dispatch  ------- //

  const [state, dispatch] = React.useReducer(contextReducer, {
    ...initialState,
  });

  // ------- Variables and Hooks   ------- //
  const objFavorites = useMemo(
    () => state.movies.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {}),
    [state.movies]
  );

  // ------- Functions  ------- //
  const handleSetItem = async (item) => {
    await asyncStorage.setFavoriteItem(item);
    dispatch({
      type: FAVORITE_ACTIONS.SET_ITEM,
      payload: item,
    });
  };

  const handleRemoveItem = async (id) => {
    await asyncStorage.removeFavoriteItem({ id });
    dispatch({
      type: FAVORITE_ACTIONS.REMOVE_ITEM,
      payload: { id },
    });
  };

  const handleToggle = (item) => async () => {
    if (objFavorites[item.id]) {
      await handleRemoveItem(item.id);
      return;
    }

    await handleSetItem(item);
  };

  // ------- Effects ------- //
  React.useEffect(() => {
    const fn = async () => {
      dispatch({
        type: FAVORITE_ACTIONS.SET_ALL_ITEMS,
        payload: await asyncStorage.getFavorites(),
      });
    };

    fn();
  }, []);

  const value = [
    { ...state, objFavorites, count: state.movies.length },
    { handleToggle },
  ];

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

// Use Context
function useFavorite() {
  const contextValue = React.useContext(Context);
  if (contextValue === undefined) {
    throw new Error('useFavorite must be used within a FavoriteContext');
  }

  return contextValue;
}

export { FavoriteContext, useFavorite };
