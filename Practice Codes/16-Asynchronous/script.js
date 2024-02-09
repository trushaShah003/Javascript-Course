'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const countryDisplay = function (data, className = '') {
  const html = `
      <article class="country ${className}">
        <img class="country__img" src="${data.flags.svg}" />
        <div class="country__data">
          <h3 class="country__name">${data.name.common}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)} M</p>
          <p class="country__row"><span>🗣️</span>${Object.values(
            data.languages
          )}</p>
          <p class="country__row"><span>💰</span>${
            Object.values(data.currencies)[0].name
          }</p>
        </div>
      </article>
      `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  //   countriesContainer.style.opacity = 1;
};

const errorDisplay = function (msg) {
  //   countriesContainer.style.display = 'none';
  countriesContainer.insertAdjacentText('beforeend', msg);
  //   countriesContainer.style.opacity = 1;
};

///////////////////////////////////////

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open(
//     'GET',
//     `https://countries-api-836d.onrender.com/countries/name/${country}`
//   );

//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html = `
//         <article class="country">
//           <img class="country__img" src="${data.flags.svg}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +data.population / 1000000
//             ).toFixed(1)} M</p>
//             <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//             <p class="country__row"><span>💰</span>${
//               data.currencies[0].name
//             }</p>
//           </div>
//         </article>
//     `;

//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };
// getCountryData('portugal');
// getCountryData('usa');

/////////////////////////////////////////////////////////////////////////

/*
const getCountryandNeighborData = function (country) {
  //AJAX call 1
  const request = new XMLHttpRequest();
  request.open(
    'GET',
    `https://restcountries.com/v3.1/name/${country}?fullText=true`
  );

  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    // render country
    countryDisplay(data);

    // get neighbour
    const neighbour = data.borders?.[0];
    console.log(neighbour);

    //AJAX call 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);

    request2.send();
    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);

      // render country

      countryDisplay(data2, 'neighbour');
      console.log(Object.values(data2.currencies)[0].name);
    });
  });
};

getCountryandNeighborData('india');

*/

// const request = fetch(
//   'https://restcountries.com/v3.1/name/india?fullText=true'
// );
// console.log(request);

//handling a fullfilled promise

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//     });
// };

// //better
// const getCountryData = function (country) {
//   //AJAX call 1
//   //along with the fullfilled function we can also pass a second reject function for catching error
//   //or we can also catch the error at the end of the callback chain
//   fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
//     .then(response => {
//       console.log(response);
//       //we can throw custom errors as well
//       if (!response.ok)
//         throw new Error(`Could not find the country ${response.status}`);

//       return response.json();
//     })
//     .then(data => {
//       countryDisplay(data[0]);

//       const neighbour = data[0].borders?.[0];
//       if (!neighbour) return;

//       //AJAX call 2
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Could not find the country ${response.status}`);
//       response.json();
//     })
//     .then(data => {
//       //   console.log(data[0]);
//       countryDisplay(data[0], 'neighbour');
//     })
//     .catch(err => {
//       console.error(`${err} !!! ⛔⛔⛔`);
//       errorDisplay(
//         `Something went wrong !!⛔⛔⛔\n ${err.message} \n⛔⛔⛔ Try again!! `
//       );
//     })
//     .finally(() => {
//       //no matter fullfilled or rejected finally block will always get executed
//       countriesContainer.style.opacity = 1;
//     });
// };

///////////////////////////////////////////////////////////////////////
// EVEN better

const getJSON = function (url, errorMSG = 'Something went wrong!') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMSG} ${response.status}`);

    return response.json();
  });
};
const getCountryData = function (country) {
  //AJAX call 1
  //along with the fullfilled function we can also pass a second reject function for catching error
  //or we can also catch the error at the end of the callback chain
  getJSON(
    `https://restcountries.com/v3.1/name/${country}?fullText=true`,
    'Country not found'
  )
    .then(data => {
      countryDisplay(data[0]);

      const neighbour = data[0].borders?.[0];
      if (!neighbour) throw new Error('No neighbour found!!');

      //AJAX call 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => {
      //   console.log(data[0]);
      countryDisplay(data[0], 'neighbour');
    })
    .catch(err => {
      console.error(`${err} !!! ⛔⛔⛔`);
      errorDisplay(
        `Something went wrong !!⛔⛔⛔\n ${err.message} \n⛔⛔⛔ Try again!! `
      );
    })
    .finally(() => {
      //no matter fullfilled or rejected finally block will always get executed
      countriesContainer.style.opacity = 1;
    });
};

// btn.addEventListener('click', function () {
//   countriesContainer.innerHTML = '';
//   getCountryData('australia');
// });

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508,13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

const whereAmI = function (lat, lng) {
  fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=b382d0860a9a40a591dce08f50c901c8`
  )
    .then(response => response.json())
    .then(data => {
      console.log(data);
      console.log(
        `You are in ${data.features[0].properties.city}, ${data.features[0].properties.country}!`
      );
      getCountryData(`${data.features[0].properties.country}`);
    })
    .catch(err => console.error('slow down the request!'));
};

btn.addEventListener('click', function () {
  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    console.log(latitude, longitude);
    whereAmI(latitude, longitude);
  });
});

// ////////////////////////////////////////////////////////////////////////////
// // event loop
// console.log('test starts');
// setTimeout(() => console.log('0 second timout'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));
// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 0; i < 10000000000; i++) {}
//   console.log(res);
// });
// console.log('test ends');

// // creating a custom promise
// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lottery draw is happening....');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('You won!!');
//     } else reject(new Error('Sorry ! you lost..'));
//   }, 1000);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// // promisifying settimeout function

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// // using wait instead of settimout will prevent callback hell
// wait(1)
//   .then(res => {
//     console.log('1 second has passed');
//     return wait(1);
//   })
//   .then(res => {
//     console.log('2 second has passed');
//     return wait(1);
//   })
//   .then(res => {
//     console.log('3 second has passed');
//     return wait(1);
//   })
//   .then(res => {
//     console.log('4 second has passed');
//     return wait(1);
//   });

// navigator.geolocation.getCurrentPosition(position => {
//   const { latitude, longitude } = position.coords;
//   console.log(latitude, longitude);
// });

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/
// const imgContainer = document.querySelector('.images');
// let curImage;

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;

//     img.addEventListener('load', function () {
//       imgContainer.append(img);
//       resolve(img);
//     });

//     img.addEventListener('error', function () {
//       reject(new Error("Couldn't load the image "));
//     });
//   });
// };

// createImage('img/img-1.jpg')
//   .then(img => {
//     curImage = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//   })

//   .then(() => {
//     curImage.style.display = 'none';
//     return createImage(`img/img-2.jpg`);
//   })
//   .then(img => {
//     curImage = img;
//     console.log('Image 2 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     curImage.style.display = 'none';
//     return createImage(`img/img-3.jpg`);
//   })
//   .then(img => {
//     curImage = img;
//     console.log('Image 3 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     curImage.style.display = 'none';
//     console.log('Slideshow complete');
//   })
//   .catch(err => console.log(err));

////////////////////////////////////////////////////////////////////////
// ASYNC AWAIT //

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI = async function () {
//   try {
//     //get position
//     const pos = await getPosition();

//     const { latitude: lat, longitude: lng } = pos.coords;

//     const reverse = await fetch(
//       `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=b382d0860a9a40a591dce08f50c901c8`
//     );
//     if (!reverse.ok) throw new Error('could not fetch location');

//     const data = await reverse.json();

//     const fwd = await fetch(
//       `https://restcountries.com/v3.1/name/${data.features[0].properties.country}?fullText=true`
//     );
//     if (!fwd.ok) throw new Error('country not found');

//     const datactr = await fwd.json();
//     // console.log(datactr);
//     countryDisplay(datactr[0]);
//     countriesContainer.style.opacity = 1;
//     // getCountryData(`${data.features[0].properties.country}`);

//     return `You are in ${data.features[0].properties.city}, ${data.features[0].properties.country}!`;
//   } catch (err) {
//     console.error(`⛔💥${err}`);
//     alert(err.message);
//     throw err;
//   }
// };

// btn.addEventListener('click', function () {
//   console.log('1.........');
//   // const city = whereAmI();
//   // console.log(`2..${city}`);
//   // this does not work because an async function also returns a promise
//   whereAmI()
//     .then(city => console.log(`2..${city}`))
//     .catch(err => console.error(`2..${err}`))
//     .finally(() => console.log('3......'));
// });

//operation with iife
// (async function () {
//   try {
//     console.log('1.........');
//     const fun = await whereAmI();
//     console.log(`2..${fun}`);
//   } catch (err) {
//     console.error(`2..${err}`);
//   } finally {
//     console.log('3......');
//   }
// })();

///////////////////////////////////////////////////////////////////////////////
//Promise.all

// const getJSON = function (url, errorMSG = 'Something went wrong!') {
//   return fetch(url).then(response => {
//     if (!response.ok) throw new Error(`${errorMSG} ${response.status}`);

//     return response.json();
//   });
// };

// const get3countries = async function (c1, c2, c3) {
//   try {
//     const data = await Promise.all([
//       getJSON(`https://restcountries.com/v3.1/name/${c1}?fullText=true`),
//       getJSON(`https://restcountries.com/v3.1/name/${c2}?fullText=true`),
//       getJSON(`https://restcountries.com/v3.1/name/${c3}?fullText=true`),
//     ]);
//     console.log(data.map(d => d[0].capital[0]));
//   } catch (err) {
//     console.error(err);
//   }
// };
// get3countries('india', 'bangladesh', 'canada');

/////////////////////////////////////////////////////////////////////////////////////
//Promise.any [ES2021]

// Promise.any([
//   Promise.resolve('success'),
//   Promise.resolve('ERROR'),
//   Promise.reject('success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

////////////////////////////////////////////////////////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
// */
// const imgContainer = document.querySelector('.images');
// let curImage;
// let no = 1;

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;
//     img.id = no;
//     no++;

//     img.addEventListener('load', function () {
//       imgContainer.append(img);
//       resolve(img);
//       // img.style.display = 'none';
//     });

//     img.addEventListener('error', function () {
//       reject(new Error("Couldn't load the image "));
//     });
//   });
// };
// const removeImg = function () {
//   curImage.style.display = 'none';
//   return wait(2);
// };

// const loadOnPause = async function () {
//   try {
//     //load img 1
//     let img = await createImage('img/img-1.jpg');
//     console.log('Image 1 loaded');
//     await wait(2);
//     img.style.display = 'none';

//     //load img2
//     img = await createImage(`img/img-2.jpg`);
//     console.log('Image 2 loaded');
//     await wait(2);
//     img.style.display = 'none';

//     //load img3
//     img = await createImage(`img/img-3.jpg`);
//     console.log('Image 3 loaded');
//     await wait(2);
//     img.style.display = 'none';
//   } catch (err) {
//     console.error(err);
//   }
// };
// loadOnPause();

// createImage('img/img-1.jpg')
//   .then(img => {
//     curImage = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//   })

//   .then(() => {
//     curImage.style.display = 'none';
//     return createImage(`img/img-2.jpg`);
//   })
//   .then(img => {
//     curImage = img;
//     console.log('Image 2 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     curImage.style.display = 'none';
//     return createImage(`img/img-3.jpg`);
//   })
//   .then(img => {
//     curImage = img;
//     console.log('Image 3 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     curImage.style.display = 'none';
//     console.log('Slideshow complete');
//   })
//   .catch(err => console.log(err));
