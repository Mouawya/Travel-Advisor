"use strict";

const createDOMElement = (tag, options) => {
  const { id } = options || {};
  const { className } = options || {};
  const element = document.createElement(tag);

  if (id != null && id != undefined) {
    element.id = id;
  }
  if (className != null && className != undefined) {
    element.className = className;
  }

  return element;
};

export default createDOMElement;
