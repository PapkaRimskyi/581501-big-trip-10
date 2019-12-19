export const createElement = (template) => {
  const domElement = document.createElement(`div`);
  domElement.innerHTML = template;
  return domElement.firstChild;
};

export const PositionForRender = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

export const renderMarkup = (container, component, where) => {
  switch (where) {
    case PositionForRender.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case PositionForRender.BEFOREEND:
      container.append(component.getElement());
      break;
  }
};

export const replaceElement = (newComponent, oldComponent) => {
  const parentElem = oldComponent.getElement().parentElement;
  const newElem = newComponent.getElement();
  const oldElem = oldComponent.getElement();

  if (parentElem && newElem && oldElem) {
    if (parentElem.contains(oldElem)) {
      parentElem.replaceChild(newElem, oldElem);
    }
  }
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

