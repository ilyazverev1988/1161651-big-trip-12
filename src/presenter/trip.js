import WayPointComponent from "../view/waypoint";
import WayPointEditComponent from "../view/waypoint-edit";
import SortComponent from "../view/sort";
import DaysComponent from "../view/days";
import DayComponent from "../view/day";
import {getDatesDuration, SortType} from "../utils/routepoint";
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

const getSortRoutePoint = (routePoints, typeSort) => {
  let sortRoutePoints = [];
  const showRoutePoints = routePoints.slice();

  switch (typeSort) {
    case SortType.DEFAULT:
      sortRoutePoints = showRoutePoints;
      break;
    case SortType.PRICE:
      sortRoutePoints = showRoutePoints.sort((a, b) => b.cost - a.cost);
      break;
    case SortType.TIME:
      sortRoutePoints = showRoutePoints.sort((a, b) => (b.timeEnd - b.timeBegin) - (a.timeEnd - a.timeBegin));
      break;
  }
  return sortRoutePoints.slice();
};

const renderRoutePoints = (daysComponent, routePoints, typeSort) => {
  if (routePoints.length > 0) {
    let dayNumber = 0;
    let dayComponent = new DayComponent(dayNumber + 1, routePoints[0], typeSort !== SortType.DEFAULT);
    render(daysComponent.getElement(), dayComponent);

    routePoints.forEach((routePoint) => {
      if (getDatesDuration(routePoints[0].timeBegin, routePoint.timeBegin).daysBetween > dayNumber && typeSort === SortType.DEFAULT) {
        dayNumber = getDatesDuration(routePoints[0].timeBegin, routePoint.timeBegin).daysBetween;
        dayComponent = new DayComponent(dayNumber + 1, routePoint);
        render(daysComponent.getElement(), dayComponent);
      }
      renderRoutePoint(dayComponent.getElement().querySelector(`.trip-events__list`), routePoint);
    });
  } else {
    render(daysComponent.getElement(), new NoWaypoint());
  }
};

export default class Trip {
  constructor(container) {
    this._container = container;
    this._sortComponent = new SortComponent();
  }

  render(routePoints) {
    const tripEvents = this._container;
    const tripSorting = tripEvents.querySelector(`h2`);
    render(tripSorting, this._sortComponent.getElement(), `afterend`);

    const daysComponent = new DaysComponent();
    render(tripEvents, daysComponent.getElement());

    renderRoutePoints(daysComponent, routePoints, SortType.DEFAULT);

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      const sortRoutePoints = getSortRoutePoint(routePoints, sortType);
      daysComponent.getElement().innerHTML = ``;
      renderRoutePoints(daysComponent, sortRoutePoints, sortType);
    });
  }
}
