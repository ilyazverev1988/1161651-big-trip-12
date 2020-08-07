export const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomArray = (arr, len) => {
  arr.sort(function () {
    return Math.random() > 0.5;
  });
  arr.length = len;
  return arr;
};

const addZeroForTime = (time) => {
  return time < 10 ? `0${time}` : time;
};

export const formatTimeFromMs = (ms) => {
  const minutes = ms / 1000 / 60;
  let days = addZeroForTime(Math.floor(minutes / 60 / 24));
  let hours = addZeroForTime(Math.floor(minutes / 60) % 24);
  let mins = addZeroForTime(minutes - days * 24 * 60 - hours * 60);

  days = days !== `00` ? `${days}D` : ``;
  hours = hours !== `00` ? `${hours}H` : ``;
  mins = mins !== `00` ? `${mins}M` : ``;
  return `${days} ${hours} ${mins}`;
};

export const getFormatDateForEdit = (time) => {
  return `${addZeroForTime(time.getDate())}/${addZeroForTime(time.getMonth())}/${addZeroForTime(time.getFullYear().toString().substr(-2))} ${addZeroForTime(time.getHours())}:${addZeroForTime(time.getMinutes())}`;
};
