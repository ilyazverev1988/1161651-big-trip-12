import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createSiteFilterTemplate} from "./view/site-filter.js";
import {createSiteSortTemplate} from "./view/site-sort.js";
import {createSiteFormWithChangeTemplate} from "./view/site-form-with-change";
import {createSiteWaypointTemplate} from "./view/site-waypoint.js";
import {createSiteInfoRouteTemplate} from "./view/site-info-route.js";
import {createSitePriceTemplate} from "./view/site-price.js";
import {generateWaypoint} from "./mock/waypoint.js";
import {createDaysTemplate} from "./view/site-days.js";
import {createDayTemplate} from "./view/site-day.js";
import {render, getDatesDuration} from "./mock/utils.js";

const WAYPOINT_COUNT = 15;
let tasks = new Array(WAYPOINT_COUNT).fill().map(generateWaypoint).sort((a, b) => a.timeBegin - b.timeBegin);

const siteMainInHeaderElement = document.querySelector(`.page-header`);
const siteHeaderInHeaderElement = siteMainInHeaderElement.querySelector(`.trip-main__trip-controls`);

render(siteHeaderInHeaderElement, createSiteMenuTemplate());
render(siteHeaderInHeaderElement, createSiteFilterTemplate());

const siteMainElement = document.querySelector(`.page-main`);
const siteHeaderElement = siteMainElement.querySelector(`.trip-events`);

render(siteHeaderElement, createSiteSortTemplate());
render(siteHeaderElement, createDaysTemplate());

const days = document.querySelector(`.trip-days`);
let dayNumber = 0;
render(days, createDayTemplate(dayNumber + 1, tasks[0]));
let dayEventsList = days.querySelector(`.trip-days__item:last-child .trip-events__list`);
render(dayEventsList, createSiteFormWithChangeTemplate(tasks[0], false));

tasks.forEach((task, index) => {
  if (index > 0) {
    if (getDatesDuration(tasks[0].timeBegin, task.timeBegin).daysBetween > dayNumber) {
      dayNumber = getDatesDuration(tasks[0].timeBegin, task.timeBegin).daysBetween;
      render(days, createDayTemplate(dayNumber + 1, task));
    }
    dayEventsList = days.querySelector(`.trip-days__item:last-child .trip-events__list`);
    render(dayEventsList, createSiteWaypointTemplate(task));
  }
});

// дополнительно
const siteTripInMainElement = siteMainInHeaderElement.querySelector(`.trip-main`);
render(siteTripInMainElement, createSiteInfoRouteTemplate(), `afterbegin`);

const siteTripInfoMainElement = siteMainInHeaderElement.querySelector(`.trip-main__trip-info`);
render(siteTripInfoMainElement, createSitePriceTemplate());
