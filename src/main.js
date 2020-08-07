import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createSiteFilterTemplate} from "./view/site-filter.js";
import {createSiteSortTemplate} from "./view/site-sort.js";
import {createSiteFormWithChangeTemplate} from "./view/site-form-with-change";
import {createSiteWaypointTemplate} from "./view/site-waypoint.js";
import {createSiteInfoRouteTemplate} from "./view/site-info-route.js";
import {createSitePriceTemplate} from "./view/site-price.js";
import {generateWaypoint} from "./mock/waypoint.js";
import {render} from "./mock/utils.js";

const WAYPOINT_COUNT = 15;
const tasks = new Array(WAYPOINT_COUNT).fill().map(generateWaypoint);

const siteMainInHeaderElement = document.querySelector(`.page-header`);
const siteHeaderInHeaderElement = siteMainInHeaderElement.querySelector(`.trip-main__trip-controls`);

render(siteHeaderInHeaderElement, createSiteMenuTemplate());
render(siteHeaderInHeaderElement, createSiteFilterTemplate());

const siteMainElement = document.querySelector(`.page-main`);
const siteHeaderElement = siteMainElement.querySelector(`.trip-events`);

render(siteHeaderElement, createSiteSortTemplate());
render(siteHeaderElement, createSiteFormWithChangeTemplate(generateWaypoint(), false));

for (let i = 0; i < WAYPOINT_COUNT; i++) {
  render(siteHeaderElement, createSiteWaypointTemplate(tasks[i], i + 1));
}

// дополнительно
const siteTripInMainElement = siteMainInHeaderElement.querySelector(`.trip-main`);
render(siteTripInMainElement, createSiteInfoRouteTemplate(), `afterbegin`);

const siteTripInfoMainElement = siteMainInHeaderElement.querySelector(`.trip-main__trip-info`);
render(siteTripInfoMainElement, createSitePriceTemplate());
