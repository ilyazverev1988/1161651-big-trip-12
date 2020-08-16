import {MONTH_NAMES} from "../mock/waypoint.js";
import AbstractView from "./abstract.js";

export const createDayTemplate = (dayNumber, wayPoint) => {
  const {timeBegin} = wayPoint;
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayNumber}</span>
        <time class="day__date" datetime="">${MONTH_NAMES[timeBegin.getMonth()]} ${timeBegin.getDate()}</time>
      </div>
      <ul class="trip-events__list">
      </ul>
    </li>`
  );
};

export default class Day extends AbstractView {
  constructor(dayNumber, wayPoint) {
    super();
    this._dayNumber = dayNumber;
    this._wayPoint = wayPoint;
  }

  getTemplate() {
    return createDayTemplate(this._dayNumber, this._wayPoint);
  }
}
