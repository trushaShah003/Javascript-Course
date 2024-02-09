'use strict';

// querySelector method only selcts the first element of that name
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnClose = document.querySelector('.close-modal');

// this querySelectorAll method selects all the elements with the same name
const btnsShowModal = document.querySelectorAll('.show-modal');

// opens modal window function
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

// Hide function
const hide = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
// DO NOT call the function as a handler - it will directly execute

for (let i = 0; i < btnsShowModal.length; i++) {
  btnsShowModal[i].addEventListener('click', openModal);

  // modal window will be closed by clicking close button

  btnClose.addEventListener('click', hide);

  // modal window will be closed by clicking on overlay
  overlay.addEventListener('click', hide);
}

/*      in the case of eventListner we only think about listning to the event and reacting to it 
 
        BUT what we might not know is that the eventListner also store all the event data as an object
        AND we CAN ACCESS this object data in the event handler function

    this LOOKING at the event can be helpful when we want to get info of the event in th function
    EX - key press event
*/

// adding a listner directly to the document means the event can occur anywhere on the window
// here e attribute inside the handler function is the object that stores the event data

document.addEventListener('keydown', function (e) {
  //    console.log(e);
  console.log(e.key);

  //    close modal window using esc key
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) hide();
});
