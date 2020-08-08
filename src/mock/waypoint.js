import {getRandomInteger, getRandomArray} from "./utils.js";

const NUMBER_REPETITIONS = 5;
const DATE_RANGE = 2;
const LOWER_HOUR_RANGE = 0;
const UPPER_HOUR_RANGE = 23;
const LOWER_MINUTE_RANGE = 15;
const UPPER_MINUTE_RANGE = 300;
const LOWER_PRICE_RANGE = 10;
const UPPER_PRICE_RANGE = 200;

export const MONTH_NAMES = [
  `Jan`,
  `Feb`,
  `Mar`,
  `Apr`,
  `May`,
  `Jun`,
  `Jul`,
  `Aug`,
  `Sep`,
  `Oct`,
  `Nov`,
  `Dec`,
];

const EVENTS = [
  {name: `Taxi`, placeholder: `to`},
  {name: `Bus`, placeholder: `to`},
  {name: `Ship`, placeholder: `to`},
  {name: `Transport`, placeholder: `to`},
  {name: `Drive`, placeholder: `to`},
  {name: `Flight`, placeholder: `to`},
  {name: `Check-in`, placeholder: `in`},
  {name: `Sightseeing`, placeholder: `in`},
  {name: `Restaurant`, placeholder: `in`},
];

const sampleOneFromSet = (set) => {
  const randomIndex = getRandomInteger(0, set.length - 1);
  return set[randomIndex];
};

export const CITIES = [
  `Moscow`,
  `St. Petersburg`,
  `Kazan`,
  `Khabarovsk`,
  `Sochi`,
  `Krasnodar`,
  `Kaliningrad`,
];

const generateOption = () => {
  const descriptionOptions = [
    {option: `Add luggage`, cost: `30`},
    {option: `Switch to comfort class`, cost: `100`},
    {option: `Add meal`, cost: `15`},
    {option: `Choose seats`, cost: `5`},
    {option: `Travel by train`, cost: `40`},
  ];

  const randomQuantity = getRandomInteger(0, descriptionOptions.length);
  return getRandomArray(descriptionOptions, randomQuantity);
};

const generateDescription = () => {
  const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
  let sentences = description.split(`. `).map((item) => (item + `. `));
  let lastElement = sentences.pop().slice(0, -2);
  sentences.push(lastElement);
  const randomQuantity = getRandomInteger(1, NUMBER_REPETITIONS);
  return getRandomArray(sentences, randomQuantity);
};

const generatePhotos = () => {
  const generatePhoto = () => `http://picsum.photos/248/152?r=${Math.random()}`;
  let randomQuantity = getRandomInteger(1, NUMBER_REPETITIONS);
  return Array(randomQuantity).fill(``).map(generatePhoto);
};

export const generateWaypoint = () => {
  const timeBegin = new Date();
  const dayRange = getRandomInteger(-DATE_RANGE, DATE_RANGE);
  const day = timeBegin.getDate();
  timeBegin.setDate(day + dayRange);
  const hoursRange = getRandomInteger(LOWER_HOUR_RANGE, UPPER_HOUR_RANGE);
  timeBegin.setHours(hoursRange);

  const durationMinutes = getRandomInteger(LOWER_MINUTE_RANGE, UPPER_MINUTE_RANGE);
  const timeEnd = new Date(timeBegin.getTime());
  timeEnd.setMinutes(timeEnd.getMinutes() + durationMinutes);
  return {
    typeWaypoint: sampleOneFromSet(EVENTS),
    city: sampleOneFromSet(CITIES),
    options: generateOption(),
    descriptions: generateDescription(),
    photos: generatePhotos(),
    timeBegin,
    timeEnd,
    cost: getRandomInteger(LOWER_PRICE_RANGE, UPPER_PRICE_RANGE),
  };
};

