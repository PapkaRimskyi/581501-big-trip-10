export const createElement = (template) => {
  const domElement = document.createElement(`div`);
  domElement.innerHTML = template;
  return domElement.firstChild;
};
