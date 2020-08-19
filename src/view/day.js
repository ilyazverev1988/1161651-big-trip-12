import {MONTH_NAMES} from "../mock/waypoint.js";
import AbstractView from "./abstract.js";

const createDayTemplateInfo = (dayNumber, wayPoint, concealDates) => {
  const {timeBegin} = wayPoint;
  let dayInfo = `<span class="day__counter">${dayNumber}</span>
        <time class="day__date" datetime="">${MONTH_NAMES[timeBegin.getMonth()]} ${timeBegin.getDate()}</time>`;
  if (concealDates) {
    dayInfo = ``;
  }
  return dayInfo;
};

const createDayTemplate = (dayNumber, wayPoint, concealDates) => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
       ${createDayTemplateInfo(dayNumber, wayPoint, concealDates)}
      </div>
      <ul class="trip-events__list">
      </ul>
    </li>`
  );
};

export default class Day extends AbstractView {
  constructor(dayNumber, wayPoint, concealDates = false) {
    super();
    this._dayNumber = dayNumber;
    this._wayPoint = wayPoint;
    this._concealDates = concealDates;
  }

  getTemplate() {
    return createDayTemplate(this._dayNumber, this._wayPoint, this._concealDates);
  }
}
