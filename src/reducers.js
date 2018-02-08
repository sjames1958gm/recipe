import { combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';import {
  SEARCH_CHANGED,
  SEARCH_BEGIN,
  SEARCH_SUCCESS,
  GET_RANDOM_BEGIN,
  GET_RANDOM_SUCCESS,
  GET_RANDOM_FAIL
} from './types';

const INITIAL_APPLICATION_STATE = {
  showRandom: true
}

const INITIAL_SEARCH_STATE = {
  text: '',
  loading: false
}

const INITIAL_RECIPES_STATE = []

export const configureStore = () => {

  const reducer = combineReducers({ 
    search: searchReducer,
    recipes: recipesReducer,
    applicationState: applicationStateReducer
  });

  const middleware = applyMiddleware(thunk);

  return createStore(reducer, {
    search: INITIAL_SEARCH_STATE,
    recipes: INITIAL_RECIPES_STATE,
    applicationState: INITIAL_APPLICATION_STATE
  }, middleware);
}

const searchReducer = (state = INITIAL_SEARCH_STATE, action) => {
  console.log(`searchReducer ${action.type}`);
  switch (action.type) {
    case SEARCH_CHANGED:
      return {...state, text: action.payload}
    case SEARCH_BEGIN:
      return {...state, loading: true}
    case SEARCH_SUCCESS:
      return {...state, text: "", loading: false}
    default:
      return state;
  }
}

const recipesReducer = (state = INITIAL_RECIPES_STATE, action) => {
  console.log(`recipesReducer ${action.type}`);
  switch (action.type) {
    case GET_RANDOM_SUCCESS:
    case SEARCH_SUCCESS:
      return action.payload.hits;
    default:
      return state;
  }
}

const applicationStateReducer = (state = INITIAL_APPLICATION_STATE, action) => {
  console.log(`applicationStateReducer ${action.type}`);
  switch (action.type) {
    case SEARCH_SUCCESS:
      return { showRandom: false };
    default: 
      return state;
  }
}