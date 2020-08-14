import {createElement} from "../mock/utils";

const createSitePriceTemplate = () => {
  return (
    `<p class="trip-info__cost">
              Total: €&nbsp;<span class="trip-info__cost-value">1230</span>
            </p>`
  );
};

export default class RoutePrice {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSitePriceTemplate();
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
