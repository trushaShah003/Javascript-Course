import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';
import View from './view';

class ResultView extends View {
  _parentEl = document.querySelector('.results');
  _errorMsg = 'No recipe found for your query! Please try again.';

  _generateMarkup() {
    return this._data
      .map(results => previewView.render(results, false))
      .join('');
  }
}

export default new ResultView();
