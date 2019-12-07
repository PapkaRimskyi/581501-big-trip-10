export const createElement = (template) => {
  const domElement = document.createElement(`div`);
  domElement.innerHTML = template;
  return domElement.firstChild;
};

export const positionForRender = {
  afterbegin: `afterbegin`,
  beforeend: `beforeend`,
};

export const renderMarkup = (container, component, where) => {
  switch (where) {
    case positionForRender.afterbegin:
      container.prepend(component.getElement());
      break;
    case positionForRender.beforeend:
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

