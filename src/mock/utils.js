export const renderTemplate = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

export const render = (container, element, place = `beforeend`) => {
  switch (place) {
    case `afterbegin`:
      container.prepend(element);
      break;
    case `beforeend`:
      container.append(element);
      break;
    case `afterend`:
      container.after(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomArray = (data, end) => {
  let j;
  for (let i = data.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    [data[i], data[j]] = [data[j], data[i]];
  }
  return data.slice(0, end);
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

export const getDatesDuration = (date1InInt, date2InInt) => {
  const date1 = new Date(date1InInt);
  const date2 = new Date(date2InInt);
  return {
    daysBetween: date2.getDate() - date1.getDate(),
  };
};
