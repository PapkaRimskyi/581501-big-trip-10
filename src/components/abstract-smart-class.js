import AbstractComponent from "./abstract-class";

export default class AbstractSmartComponent extends AbstractComponent {

  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  rerender() {
    const oldDomElement = this.getElement();
    const parentDomElement = oldDomElement.parentElement;
    this.removeElement();
    const newDomElement = this.getElement();
    parentDomElement.replaceChild(newDomElement, oldDomElement);
    this.recoveryListeners();
  }
}
