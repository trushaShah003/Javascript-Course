import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
// "liveServer.settings.AdvanceCustomBrowserCmdLine": ""

const recipeContainer = document.querySelector('.recipe');

// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long! Timeout after ${s} second`));
//     }, s * 1000);
//   });
// };

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    // recipe id
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    //0) - updating result view to mark selected recipe
    resultView.update(model.getResultsPerPage());
    bookmarksView.update(model.state.bookmark);

    //1) loading recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;

    //2) rendering recipe

    recipeView.render(model.state.recipe);

    //
  } catch (err) {
    recipeView.rendeError();
  }
};

const controlAddBookmark = function () {
  // 1) add/delete bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) update bookmark
  recipeView.update(model.state.recipe);

  // 3) render bookmark view
  bookmarksView.render(model.state.bookmark);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmark);
};

const controlSearchResults = async function () {
  try {
    //1- get query
    const query = `${searchView.getQuery()}`;

    if (!query) return;
    resultView.renderSpinner();

    //2- load search query
    await model.loadSearchResults(query);

    //3- render search results
    // console.log(model.state.search.results);
    // resultView.render(model.state.search.results);
    resultView.render(model.getResultsPerPage());

    //4- render initial pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
    resultView.rendeError();
  }
};

const controlPagination = function (goToPage) {
  //1- render NEW search results
  resultView.render(model.getResultsPerPage(goToPage));

  //2- render NEW pagination
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);

  recipeView.update(model.state.recipe);
};

const controlAddRecipe = async function (data) {
  try {
    // load spinner
    addRecipeView.renderSpinner();

    // upload the recipe
    await model.uploadRecipe(data);

    console.log(model.state.recipe);

    // render recipes
    recipeView.render(model.state.recipe);

    // succes message
    addRecipeView.renderMessage();

    //render BOokmark vie
    bookmarksView.render(model.state.bookmark);

    //change id in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // close window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('💥', err);
    addRecipeView.rendeError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerbookmark(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
  addRecipeView.addHandlerupload(controlAddRecipe);
};

init();
