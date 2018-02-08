import {
  SEARCH_CHANGED,
  SEARCH_BEGIN,
  SEARCH_SUCCESS,
  SEARCH_FAILED,
  GET_RANDOM_BEGIN,
  GET_RANDOM_SUCCESS,
  GET_RANDOM_FAIL
} from './types';

const randomSearch = [
  'chicken',
  'beef',
  'entree',
  'salad',
  'dessert',
  'vegetable'
]

function getUrl(search) {
  return `https://api.edamam.com/search?q=${search}&app_id=6651797f&app_key=62dbd5b80ba34bfce34d3db4aa22d983`
}

export const searchChanged = (text) => ({
  type: SEARCH_CHANGED,
  payload: text
})

export const startSearch = (text) => {
  return (dispatch) => {
    dispatch({
      type: SEARCH_BEGIN
    })
    const url = getUrl(text)
    console.log(url);
    fetch(url)
    .then(response => response.json())
    .then(json => {
      dispatch({
        type: SEARCH_SUCCESS,
        payload: json
      })
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: SEARCH_FAILED
      })
    })
  }
}

export const getRandomRecipe = () => {
  const search = randomSearch[Math.floor(Math.random() * randomSearch.length)];
  return (dispatch) => {
    dispatch({
      type: GET_RANDOM_BEGIN
    })
    const url = getUrl(search)
    console.log(url);
    fetch(url)
    .then(response => response.json())
    .then(json => {
      dispatch({
        type: GET_RANDOM_SUCCESS,
        payload: json
      })
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_RANDOM_FAIL
      })
    })
  }
  
}


