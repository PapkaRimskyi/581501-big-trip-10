export const createElement = (template) => {
  const domElement = document.createElement(`div`);
  domElement.innerHTML = template;
  return domElement.firstChild;
};

export const positionForRender = {
  afterbegin: `afterbegin`,
  beforeend: `beforeend`,
};
