import {getRandomInteger, getRandomArray, addZeroForTime} from "./utils.js";


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

const generateTypeWaypoint = () => {
  const descriptions = [
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

  const randomIndex = getRandomInteger(0, descriptions.length - 1);
  return descriptions[randomIndex];
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

const generateCity = (cities) => {
  const randomIndex = getRandomInteger(0, cities.length - 1);
  return cities[randomIndex];
};

const generateOption = () => {
  const descriptions = [
    {option: `Add luggage`, cost: `30`},
    {option: `Switch to comfort class`, cost: `100`},
    {option: `Add meal`, cost: `15`},
    {option: `Choose seats`, cost: `5`},
    {option: `Travel by train`, cost: `40`},
  ];

  const randomQuantity = getRandomInteger(0, descriptions.length - 1);
  return getRandomArray(descriptions, randomQuantity);
};

const generateDescription = () => {
  const NUMBER_SENTENCE = 5;
  const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
  const sentences = description.split(/\./).map((item)=>(item + `.`));
  const randomQuantity = getRandomInteger(1, NUMBER_SENTENCE);
  return getRandomArray(sentences, randomQuantity);
};

const PHOTO_ADDRESS = `http://picsum.photos/248/152?r=${Math.random()}`;

export const getFormatDateForEdit = (time) => {
  return `${addZeroForTime(time.getDate())}/${addZeroForTime(time.getMonth())}/${addZeroForTime(time.getFullYear().toString().substr(-2))} ${addZeroForTime(time.getHours())}:${addZeroForTime(time.getMinutes())}`;
};

export const generateWaypoint = () => {
  const timeBegin = new Date();
  const dayRange = getRandomInteger(-50, 50);
  const day = timeBegin.getDate();
  timeBegin.setDate(day + dayRange);
  const hoursRange = getRandomInteger(0, 23);
  timeBegin.setHours(hoursRange);

  const durationMinutes = getRandomInteger(15, 300);
  const timeEnd = new Date(timeBegin.getTime());
  timeEnd.setMinutes(timeEnd.getMinutes() + durationMinutes);
  return {
    typeWaypoint: generateTypeWaypoint(),
    city: generateCity(CITIES),
    option: generateOption(),
    description: generateDescription(),
    photo: PHOTO_ADDRESS,
    timeBegin,
    timeEnd,
    cost: getRandomInteger(0, 100),
  };
};
