import {MONTH_NAMES} from "../mock/waypoint.js";
import {createElement} from "../mock/utils";

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

export default class SiteDayView {
  constructor(dayNumber, wayPoint) {
    this._element = null;
    this._dayNumber = dayNumber;
    this._wayPoint = wayPoint;
  }

  getTemplate() {
    return createDayTemplate(this._dayNumber, this._wayPoint);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
