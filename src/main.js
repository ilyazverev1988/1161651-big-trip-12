import RouteInfoComponent from "./view/route-info";
import RouteCostComponent from "./view/route-price";
import MenuViewComponent from "./view/menu";
import FilterComponent from "./view/filter";
import {generateWaypoint} from "./mock/waypoint";
import {render} from "./utils/render";
import Trip from "./presenter/trip";

const WAYPOINT_COUNT = 15;
const tasks = new Array(WAYPOINT_COUNT).fill().map(generateWaypoint).sort((a, b) => a.timeBegin - b.timeBegin);

// дополнительно
const siteTripInMainElement = document.querySelector(`.trip-main`);
const tripEvent = document.querySelector(`.trip-events`);
render(siteTripInMainElement, new RouteInfoComponent(), `afterbegin`);

const siteTripInfoMainElement = siteTripInMainElement.querySelector(`.trip-info__main`);
render(siteTripInfoMainElement, new RouteCostComponent(), `afterend`);
//
const tripControls = siteTripInMainElement.querySelector(`.trip-controls`);
const tripMenu = tripControls.querySelector(`h2`);

render(tripMenu, new MenuViewComponent(), `afterend`);
render(tripControls, new FilterComponent());

const trip = new Trip(tripEvent);
trip.render(tasks);
