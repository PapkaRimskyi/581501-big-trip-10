import {positionForRender} from '../utils.js';

export const renderMarkup = (container, markup, where) => {
  switch (where) {
    case positionForRender.afterbegin:
      container.prepend(markup);
      break;
    case positionForRender.beforeend:
      container.append(markup);
      break;
  }
};
