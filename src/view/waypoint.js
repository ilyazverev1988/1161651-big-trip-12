import {formatTimeFromMs} from "../mock/utils";
import {createElement} from "../mock/utils";

const createOption = (options) => {
  if (options.length) {
    const optionElement = options.slice(0, 3).map((event) =>
      `<li class="event__offer">
        <span class="event__offer-title">${event.option}</span>
      +
      €&nbsp;<span class="event__offer-price">${event.cost}</span>
        </li>`
    ).join(`\n`);
    return optionElement;
  } else {
    return ``;
  }
};


export const createSiteWaypointTemplate = (waypoint) => {
  const {typeWaypoint, city, options, timeBegin, timeEnd, cost} = waypoint;

  return (
    `<li class="trip-events__item">
                  <div class="event">
                    <div class="event__type">
                      <img class="event__type-icon" width="42" height="42" src="img/icons/${typeWaypoint.name.toLowerCase()}.png" alt="Event type icon">
                    </div>
                    <h3 class="event__title">${typeWaypoint.name} ${typeWaypoint.placeholder} ${city}</h3>

                    <div class="event__schedule">
                      <p class="event__time">
                        <time class="event__start-time" datetime="2019-03-18T10:30">${timeBegin.toLocaleString().slice(12, 17)}</time>
                        —
                        <time class="event__end-time" datetime="2019-03-18T11:00">${timeEnd.toLocaleString().slice(12, 17)}</time>
                      </p>
                      <p class="event__duration">${formatTimeFromMs(timeEnd - timeBegin)}</p>
                    </div>

                    <p class="event__price">
                      €&nbsp;<span class="event__price-value">${cost}</span>
                    </p>

                    <h4 class="visually-hidden">Offers:</h4>
                    <ul class="event__selected-offers">
                    ${createOption(options)}
                    </ul>
                    <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                    </button>
                    </div>
                    </li>`
  );
};

export default class WayPoint {
  constructor(wayPoint) {
    this._element = null;
    this._wayPoint = wayPoint;
  }

  getTemplate() {
    return createSiteWaypointTemplate(this._wayPoint);
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
