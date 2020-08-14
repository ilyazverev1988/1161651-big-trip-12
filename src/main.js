import RouteInfoComponent from "./view/route-info";
import RouteCostComponent from "./view/route-price";
import MenuViewComponent from "./view/menu";
import FilterComponent from "./view/filter";
import SortComponent from "./view/sort";
import DaysComponent from "./view/days";
import DayComponent from "./view/day";
import WayPointComponent from "./view/waypoint";
import WayPointEditComponent from "./view/waypoint-edit";
import NoWaypoint from "./view/no-waypoint";
import {generateWaypoint} from "./mock/waypoint";
import {getDatesDuration, render} from "./mock/utils";

const WAYPOINT_COUNT = 15;
const tasks = new Array(WAYPOINT_COUNT).fill().map(generateWaypoint).sort((a, b) => a.timeBegin - b.timeBegin);

// дополнительно
const siteTripInMainElement = document.querySelector(`.trip-main`);
const tripEvent = document.querySelector(`.trip-events`);
render(siteTripInMainElement, new RouteInfoComponent().getElement(), `afterbegin`);

const siteTripInfoMainElement = siteTripInMainElement.querySelector(`.trip-info__main`);
render(siteTripInfoMainElement, new RouteCostComponent().getElement(), `afterend`);
//
const tripControls = siteTripInMainElement.querySelector(`.trip-controls`);
const tripMenu = tripControls.querySelector(`h2`);

if (tasks.length === 0) {
  render(tripEvent, new NoWaypoint().getElement(), `afterend`);
} else {
  render(tripMenu, new MenuViewComponent().getElement(), `afterend`);
  render(tripControls, new FilterComponent().getElement());

  const renderRoutePoint = (routePointList, routePoint) => {
    const onRollupButtonClick = () => {
      routePointList.replaceChild(routePointEditComponent.getElement(), routePointComponent.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    const onEditFormSubmit = (evt) => {
      evt.preventDefault();
      routePointList.replaceChild(routePointComponent.getElement(), routePointEditComponent.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    const onEditFormClose = (evt) => {
      evt.preventDefault();
      routePointList.replaceChild(routePointComponent.getElement(), routePointEditComponent.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        routePointList.replaceChild(routePointComponent.getElement(), routePointEditComponent.getElement());
      }
    };

    const routePointComponent = new WayPointComponent(routePoint);
    const rollupButton = routePointComponent.getElement().querySelector(`.event__rollup-btn`);
    rollupButton.addEventListener(`click`, onRollupButtonClick);

    const routePointEditComponent = new WayPointEditComponent(routePoint, false);
    const editForm = routePointEditComponent.getElement().querySelector(`form`);
    editForm.addEventListener(`submit`, onEditFormSubmit);
    editForm.addEventListener(`reset`, onEditFormClose);

    render(routePointList, routePointComponent.getElement());
  };

  const renderRouteTable = (tripEvents, routePoints) => {
    const tripSorting = tripEvents.querySelector(`h2`);
    render(tripSorting, new SortComponent().getElement(), `afterend`);

    const daysComponent = new DaysComponent();
    render(tripEvents, daysComponent.getElement());

    let dayNumber = 0;
    let dayComponent = new DayComponent(dayNumber + 1, routePoints[0]);
    render(daysComponent.getElement(), dayComponent.getElement());

    routePoints.forEach((routePoint, index) => {
      if (index > 0) {
        if (getDatesDuration(routePoints[0].timeBegin, routePoint.timeBegin).daysBetween > dayNumber) {
          dayNumber = getDatesDuration(routePoints[0].timeBegin, routePoint.timeBegin).daysBetween;
          dayComponent = new DayComponent(dayNumber + 1, routePoint);
          render(daysComponent.getElement(), dayComponent.getElement());
        }
        renderRoutePoint(dayComponent.getElement().querySelector(`.trip-events__list`), routePoint);
      }
    });
  };

  renderRouteTable(tripEvent, tasks);
}
