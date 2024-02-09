'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
// const tbContent1 = document.querySelector('.operations__content--1');
// const tbContent2 = document.querySelector('.operations__content--2');
// const tbContent3 = document.querySelector('.operations__content--3');
const tabContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////////////////////////////////

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);
  // console.log(e.target.getBoundingClientRect());
  // console.log(pageYOffset, pageXOffset);

  // scrolling
  // window.scrollTo(s1coords.left + pageXOffset, s1coords.top + pageYOffset);

  // smooth scrolling
  // window.scrollTo({
  //   left: s1coords.left + pageXOffset,
  //   top: s1coords.top + pageYOffset,
  //   behavior: 'smooth',
  // });

  // modern way
  section1.scrollIntoView({ behavior: 'smooth' });
});

// event deligation
// we can apply an evenListener on each button individiuly but using event deligation and applying at all the buttons at the same time is more clean and efficient, especially when there are multiple buttons

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault(); // here we applied listener on the whole nav links bar

  if (e.target.classList.contains('nav__link')) {
    // and now we created a strategy to find when the utton is clicked and not the bar
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////// Tabbed Component /////////

//non modern way
// tabs.forEach((btn, i) =>
//   btn.addEventListener('click', function (e) {
//     console.log('TAB');
//   })
// );

// in modern JS we use event delegation
tabContainer.addEventListener('click', function (e) {
  //matching strategy
  const clicked = e.target.closest('.operations__tab');

  // guard clause
  if (!clicked) return;

  // neutralize
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabContent.forEach(c => c.classList.remove('operations__content--active'));

  //active tab
  clicked.classList.add('operations__tab--active');

  //activate content

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

///////// Nav menu fade animation /////////

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(s => {
      if (s !== link) s.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

//it is customary to only have one original argument in the handler function
// here bind will assign passed value to this which we can use as parameters in the function without the need to pass it as argument
//we can pass "arguments" with bind as a single value like this or an array for multiple parameters
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

//////////////////////////////////////////
/////// Sticky navigation ///////

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const callback = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(callback, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

/////////////////////////////////////////
////// Revealing section animation /////////

const allSections = document.querySelectorAll('.section');

const sectionReveal = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(sectionReveal, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  // section.classList.add('section--hidden');
  sectionObserver.observe(section);
});
////////////////////////////////////////
////// Lazy image loading animation //////

const images = document.querySelectorAll('img[data-src]');

const revealImage = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  const target = entry.target;

  if (!entry.isIntersecting) return;

  target.src = target.dataset.src;
  target.addEventListener('load', function () {
    target.classList.remove('lazy-img');
  });
  observer.unobserve(target);
};

const imageObserver = new IntersectionObserver(revealImage, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

images.forEach(img => {
  imageObserver.observe(img);
});

////////////////////////////////////////
///////// Slider ///////////////

const slidr1 = function () {
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  let curSlide = 0;
  const maxSlide = slides.length;
  const dotContainer = document.querySelector('.dots');

  // Functions

  const createDots = function (e) {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class = "dots__dot" data-slide = "${i}"></button>`
      );
    });
  };
  createDots();

  const dots = document.querySelectorAll('.dots__dot');
  // console.log(dots);

  const activeDot = function (sl) {
    // console.log(sl);
    dots.forEach(dot => dot.classList.remove('dots__dot--active'));
    dots[sl].classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) curSlide = 0;
    else curSlide++;
    goToSlide(curSlide);
    activeDot(curSlide);
  };

  const preSlide = function () {
    if (curSlide === 0) curSlide = maxSlide;
    curSlide--;
    goToSlide(curSlide);
    activeDot(curSlide);
    // activeDot(curSlide);
  };

  goToSlide(0);
  activeDot(curSlide);

  /// Event Handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', preSlide);

  document.addEventListener('keydown', function (e) {
    // console.log(e);
    if (e.key === 'ArrowRight') nextSlide();
    else if (e.key === 'ArrowLeft') preSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    // console.log(e);
    if (e.target.classList.contains('dots__dot')) {
      curSlide = e.target.dataset.slide;
      goToSlide(curSlide);
      activeDot(curSlide);
      // console.log(curSlide);
    }
  });
};
slidr1();
////////////////////////////////////////
// selecting element

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// console.log(document.getElementById('section--1'));
// const allbtns = document.getElementsByTagName('button');
// console.log(allbtns);
// console.log(document.getElementsByClassName('btn'));

///////////////////////////////////////

// const h1 = document.querySelector('h1');
// const alert1 = () => alert('heading alert');
// h1.addEventListener('mouseenter', alert1);

// setTimeout(() => h1.removeEventListener('mouseenter', alert1), 2000);

// rgb(255, 255, 155)
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min) + 1) + min;
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// console.log(randomColor());

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });
// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });

////////////DOM TRAVERSAl////////////////////

// /// traversing downwords : selecting children///

// // will select any children ( children at any depth )
// console.log(h1.querySelectorAll('.highlight'));

// // will select direct children only
// console.log(h1.childNodes); // displays every node under h1
// console.log(h1.children); // displays only elements under h1
// // we can also change / set parameters for the same selection
// h1.firstElementChild.style.color = 'white'; // selects first element child as the name suggests
// h1.lastElementChild.style.color = 'white'; // selects last element child as the name suggests

// /// traversing upwards : selecting parents ///
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').style.background = 'var(--gradient-primary)'; // this will select the closest parent ".header" to h1
