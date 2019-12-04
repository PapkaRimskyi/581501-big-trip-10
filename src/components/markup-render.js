export const renderPosition = {
  afterbegin: `afterbegin`,
  beforeend: `beforeend`,
};

export const renderMarkup = (container, markup, where) => {
  switch (where) {
    case renderPosition.afterbegin:
      container.prepend(markup);
      break;
    case renderPosition.beforeend:
      container.append(markup);
      break;
  }
};
