import {MONTH_NAMES} from "../mock/waypoint.js";
import {formatTimeFromMs} from "../mock/utils";

const createOption = (options) => {
  if (options.length) {
    const optionElement = options.slice(0, 3).map((event) =>
      `<li class="event__offer">
        <span class="event__offer-title">${event.option}</span>
      +
      €&nbsp;<span class="event__offer-price">${event.cost}</span>
        </li>`
    ).join(`\n`);
    return `<h4 class="visually-hidden">Offers:</h4>
              <ul class="event__selected-offers">
               ${optionElement}
               </ul>
  <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>`;
  } else {
    return ``;
  }
};

export const createSiteWaypointTemplate = (waypoint, dayCounter) => {
  const {typeWaypoint, city, option, timeBegin, timeEnd, cost} = waypoint;

  return (
    `<ul class="trip-days">
            <li class="trip-days__item  day">
              <div class="day__info">
                <span class="day__counter">${dayCounter}</span>
                <time class="day__date" datetime="2019-03-18">${MONTH_NAMES[timeBegin.getMonth()]} ${timeBegin.getDate()}</time>
              </div>
              <ul class="trip-events__list">
                    <li class="trip-events__item">
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
                    ${createOption(option)}
    </ul>`
  );
};
