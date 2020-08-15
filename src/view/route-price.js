import AbstractView from "./abstract.js";

const createSitePriceTemplate = () => {
  return (
    `<p class="trip-info__cost">
              Total: €&nbsp;<span class="trip-info__cost-value">1230</span>
            </p>`
  );
};

export default class RoutePrice extends AbstractView {
  getTemplate() {
    return createSitePriceTemplate();
  }
}
