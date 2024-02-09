import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';
import View from './view';

class BookmarksView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMsg = 'No Bookmarks yet! Find a nice recipe and bookmark it.';

  addHandlerbookmark(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
