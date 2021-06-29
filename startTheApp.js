"use strict";
import createDOMElement from "./utilities/createDOMElement.js";
import { getCountriesData } from "./Data.js";
import {
  MAIN_CONTAINER,
  SELECT_BOX_ID,
  SAFEST_COUNTRIES_BUTTON_ID,
  UNSAFEST_COUNTRIES_BUTTON_ID,
  HOME_BUTTON,
  HEADER,
} from "./constants.js";
import handleSelectedCountry from "./handlers/handleSelectedCountry.js";
import handleViewSafestCountriesBtn from "./handlers/handleViewSafestCountriesBtn.js";
import handleViewUnsafestCountriesBtn from "./handlers/handleViewUnsafestCountriesBtn.js";
import handleHomeBtn from "./handlers/handleHomeBtn.js";

const startTheApp = () => {
  //creating a Header
  const createHeader = () => {
    const header = createDOMElement("header", { id: HEADER });
    const p = createDOMElement("p", { className: "title" });
    p.innerText = "Welcome to your Travel Advisor";
    header.appendChild(p);
    document.body.appendChild(header);
  };
  createHeader();

  //creating Home page btn:
  const createHomeBtn = () => {
    const button = createDOMElement("button", { id: HOME_BUTTON });
    button.innerText = "Home";
    document.body.appendChild(button);
  };
  createHomeBtn();

  //create the main container in Home page:
  const container = createDOMElement("div", { id: MAIN_CONTAINER });
  //creating and rendering the selection box in the main container
  const renderSelectBox = async () => {
    const selectBoxElement = createDOMElement("select", { id: SELECT_BOX_ID });
    const option = createDOMElement("option", { className: "firstOption" });
    option.innerText = "Select your destination.....";
    selectBoxElement.appendChild(option);
    container.appendChild(selectBoxElement);
    const countriesData = await getCountriesData();
    countriesData.forEach((country) => {
      const option = createDOMElement("option", { class: "optionElement" });
      option.innerText = `${country.name}`;
      selectBoxElement.appendChild(option);
    });
  };

  //creating 'view safest countries' btn
  const createSafestCountriesButton = () => {
    const button = createDOMElement("button", {
      id: SAFEST_COUNTRIES_BUTTON_ID,
    });
    button.innerText = "view safest destinations";
    container.appendChild(button);
  };

  //creating 'view unsafest countries' btn
  const createUnsafestCountriesButton = () => {
    const button = createDOMElement("button", {
      id: UNSAFEST_COUNTRIES_BUTTON_ID,
    });
    button.innerText = "view unsafest destinations";
    container.appendChild(button);
  };

  document.body.appendChild(container);

  renderSelectBox();
  createSafestCountriesButton();
  createUnsafestCountriesButton();
  handleSelectedCountry();
  handleViewSafestCountriesBtn();
  handleViewUnsafestCountriesBtn();
  handleHomeBtn();
};

export default startTheApp;

window.addEventListener("load", startTheApp);
