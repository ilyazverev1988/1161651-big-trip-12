import RouteInfo from "./view/site-info-route";
import RouteCost from "./view/site-price";
import SiteMenuView from "./view/site-menu";
import SiteFilterView from "./view/site-filter";
import SiteSortView from "./view/site-sort";
import SiteDaysView from "./view/site-days";
import SiteDayView from "./view/site-day";
import SiteWayPointView from "./view/site-waypoint";
import WayPointEdit from "./view/site-form-with-change";
import {generateWaypoint} from "./mock/waypoint";
import {getDatesDuration, render} from "./mock/utils";

const WAYPOINT_COUNT = 15;

// дополнительно
const siteTripInMainElement = document.querySelector(`.trip-main`);
render(siteTripInMainElement, new RouteInfo().getElement(), `afterbegin`);

const siteTripInfoMainElement = siteTripInMainElement.querySelector(`.trip-info__main`);
render(siteTripInfoMainElement, new RouteCost().getElement(), `afterend`);
//
const tripControls = siteTripInMainElement.querySelector(`.trip-controls`);
const tripMenu = tripControls.querySelector(`h2`);
render(tripMenu, new SiteMenuView().getElement(), `afterend`);
render(tripControls, new SiteFilterView().getElement());

const renderRoutePoint = (routePointList, routePoint) => {
  const onRollupButtonClick = () => {
    routePointList.replaceChild(routePointEditComponent.getElement(), routePointComponent.getElement());
  };

  const onEditFormSubmit = (evt) => {
    evt.preventDefault();
    routePointList.replaceChild(routePointComponent.getElement(), routePointEditComponent.getElement());
  };

  const onEditFormClose = (evt) => {
    evt.preventDefault();
    routePointList.replaceChild(routePointComponent.getElement(), routePointEditComponent.getElement());
  };

  const routePointComponent = new SiteWayPointView(routePoint);
  const rollupButton = routePointComponent.getElement().querySelector(`.event__rollup-btn`);
  rollupButton.addEventListener(`click`, onRollupButtonClick);

  const routePointEditComponent = new WayPointEdit(routePoint, false);
  const editForm = routePointEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, onEditFormSubmit);
  editForm.addEventListener(`reset`, onEditFormClose);

  render(routePointList, routePointComponent.getElement());
};

const renderRouteTable = (tripEvents, routePoints) => {
  const tripSorting = tripEvents.querySelector(`h2`);
  render(tripSorting, new SiteSortView().getElement(), `afterend`);

  const daysComponent = new SiteDaysView();
  render(tripEvents, daysComponent.getElement());

  let dayNumber = 0;
  let dayComponent = new SiteDayView(dayNumber + 1, routePoints[0]);
  render(daysComponent.getElement(), dayComponent.getElement());

  routePoints.forEach((routePoint, index) => {
    if (index > 0) {
      if (getDatesDuration(routePoints[0].timeBegin, routePoint.timeBegin).daysBetween > dayNumber) {
        dayNumber = getDatesDuration(routePoints[0].timeBegin, routePoint.timeBegin).daysBetween;
        dayComponent = new SiteDayView(dayNumber + 1, routePoint);
        render(daysComponent.getElement(), dayComponent.getElement());
      }
      renderRoutePoint(dayComponent.getElement().querySelector(`.trip-events__list`), routePoint);
    }
  });
};

const tripEvents = document.querySelector(`.trip-events`);
const tasks = new Array(WAYPOINT_COUNT).fill().map(generateWaypoint).sort((a, b) => a.timeBegin - b.timeBegin);
renderRouteTable(tripEvents, tasks);
