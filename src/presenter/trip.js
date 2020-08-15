import WayPointComponent from "../view/waypoint";
import WayPointEditComponent from "../view/waypoint-edit";
import SortComponent from "../view/sort";
import DaysComponent from "../view/days";
import DayComponent from "../view/day";
import {getDatesDuration} from "../utils/routepoint";
import {render, replace} from "../utils/render";
import NoWaypoint from "../view/no-waypoint";

const renderRoutePoint = (routePointList, routePoint) => {
  const closeEditForm = () => {
    replace(routePointComponent, routePointEditComponent);
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  const openEditForm = () => {
    replace(routePointEditComponent, routePointComponent);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const onRollupButtonClick = () => {
    openEditForm();
  };

  const onEditFormSubmit = () => {
    closeEditForm();
  };

  const onEditFormClose = () => {
    closeEditForm();
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      closeEditForm();
    }
  };

  const routePointComponent = new WayPointComponent(routePoint);
  routePointComponent.setOpenRoutePointClickHandler(() => {
    onRollupButtonClick();
  });

  const routePointEditComponent = new WayPointEditComponent(routePoint, false);
  routePointEditComponent.setSubmitRoutePointClickHandler(() => {
    onEditFormSubmit();
  });

  routePointEditComponent.setResetRoutePointClickHandler(() => {
    onEditFormClose();
  });

  render(routePointList, routePointComponent);
};

const renderRouteTable = (tripEvents, routePoints) => {
  const tripSorting = tripEvents.querySelector(`h2`);
  const tripEvent = document.querySelector(`.trip-events`);

  const daysComponent = new DaysComponent();
  render(tripEvents, daysComponent);
  if (routePoints.length === 0) {
    render(tripEvent, new NoWaypoint(), `afterend`);
  } else {
    render(tripSorting, new SortComponent(), `afterend`);
    let dayNumber = 0;
    let dayComponent = new DayComponent(dayNumber + 1, routePoints[0]);
    render(daysComponent, dayComponent);

    routePoints.forEach((routePoint, index) => {
      if (index > 0) {
        if (getDatesDuration(routePoints[0].timeBegin, routePoint.timeBegin).daysBetween > dayNumber) {
          dayNumber = getDatesDuration(routePoints[0].timeBegin, routePoint.timeBegin).daysBetween;
          dayComponent = new DayComponent(dayNumber + 1, routePoint);
          render(daysComponent, dayComponent);
        }
        renderRoutePoint(dayComponent.getElement().querySelector(`.trip-events__list`), routePoint);
      }
    });
  }
};


export default class Trip {
  constructor(container) {
    this._container = container;
  }

  render(routePoints) {
    renderRouteTable(this._container, routePoints);
  }
}
