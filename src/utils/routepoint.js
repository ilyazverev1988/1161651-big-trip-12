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

export const SortType = {
  DEFAULT: `default`,
  TIME: `time`,
  PRICE: `price`
};
