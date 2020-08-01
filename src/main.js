import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createSiteFilterTemplate} from "./view/site-filter.js";
import {createSiteSortTemplate} from "./view/site-sort.js";
import {createSiteFormWithChangeTemplate} from "./view/site-form-with-change";
import {createSiteDateTemplate} from "./view/site-date.js";
import {createSiteWaypointTemplate} from "./view/site-waypoint.js";
import {createSiteInfoRouteTemplate} from "./view/site-info-route.js";
import {createSitePriceTemplate} from "./view/site-price.js";

const WAYPOINT_COUNT = 3;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainInHeaderElement = document.querySelector(`.page-header`);
const siteHeaderInHeaderElement = siteMainInHeaderElement.querySelector(`.trip-main__trip-controls`);

render(siteHeaderInHeaderElement, createSiteMenuTemplate());
render(siteHeaderInHeaderElement, createSiteFilterTemplate());

const siteMainElement = document.querySelector(`.page-main`);
const siteHeaderElement = siteMainElement.querySelector(`.trip-events`);

render(siteHeaderElement, createSiteSortTemplate());
render(siteHeaderElement, createSiteFormWithChangeTemplate());
render(siteHeaderElement, createSiteDateTemplate());

const siteTripEventsElement = siteMainElement.querySelector(`.trip-events__list`);

Array(WAYPOINT_COUNT).fill(``).forEach(() => {
  render(siteTripEventsElement, createSiteWaypointTemplate());
});

// дополнительно
const siteTripInMainElement = siteMainInHeaderElement.querySelector(`.trip-main`);
render(siteTripInMainElement, createSiteInfoRouteTemplate(), `afterbegin`);

const siteTripInfoMainElement = siteMainInHeaderElement.querySelector(`.trip-main__trip-info`);
render(siteTripInfoMainElement, createSitePriceTemplate());
