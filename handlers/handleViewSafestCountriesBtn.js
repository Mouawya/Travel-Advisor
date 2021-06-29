"use strict";
import { SAFEST_COUNTRIES_BUTTON_ID, MAIN_CONTAINER } from "../constants.js";
import createDOMElement from "../utilities/createDOMElement.js";
import clearDOMElement from "../utilities/clearDOMElement.js";
import { getSafestCountriesNames } from "../Data.js";

const handleViewSafestCountriesBtn = () => {
  const button = document.getElementById(SAFEST_COUNTRIES_BUTTON_ID);
  button.addEventListener("click", () => {
    const container = document.getElementById(MAIN_CONTAINER);
    clearDOMElement(container);
    container.style.border = "none";
    container.style.backgroundColor = "#c7cbb6";
    container.style.margin = "auto";
    const ulEl = createDOMElement("ul", { className: "namesList" });
    const func = async () => {
      const names = await getSafestCountriesNames();
      names.forEach((countryName) => {
        const li = createDOMElement("li", { className: "name" });
        li.innerHTML = `${countryName}`;
        ulEl.appendChild(li);
      });
    };
    func();

    container.appendChild(ulEl);
  });
};

export default handleViewSafestCountriesBtn;
