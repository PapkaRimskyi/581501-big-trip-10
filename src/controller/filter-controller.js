import {renderMarkup, PositionForRender} from '../utils/render-markup.js';

export default class FilterController {
  constructor(container, pointsModel, filterComponent) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._filterComponent = filterComponent;
  }

  render() {
    renderMarkup(this._container, this._filterComponent, PositionForRender.BEFOREEND);
    this._filterComponent.setFilterContainerHandler(this._pointsModel.getFilterName);
  }
}
