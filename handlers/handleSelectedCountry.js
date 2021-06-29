"use strict";
import { getCountriesData, getWeatherInfo } from "../Data.js";
import { MAIN_CONTAINER, SELECT_BOX_ID, HEADER, WEATHER_CONTAINER } from "../constants.js";
import createDOMElement from "../utilities/createDOMElement.js";
import clearDOMElement from "../utilities/clearDOMElement.js";

const handleSelectedCountry = () => {
  const addWeatherCard = (countryName) => {
    const weatherContainer = createDOMElement("div", {
      id: WEATHER_CONTAINER,
    });
    const h2 = createDOMElement("h2", { className: "tempTitle" });
    h2.innerText = `Current Weather in ${countryName}`;
    weatherContainer.appendChild(h2);
    document.body.appendChild(weatherContainer);
    return weatherContainer;
  };

  const selectBoxElement = document.getElementById(SELECT_BOX_ID);
  selectBoxElement.addEventListener("change", async (e) => {
    const header = document.getElementById(HEADER);
    header.remove();
    const container = document.getElementById(MAIN_CONTAINER);
    clearDOMElement(container);
    //styling the container
    container.style.border = "none";
    container.style.boxShadow = "0 8px 8px 0 #004d00";
    container.style.backgroundColor = "rgba(232, 248, 255, 0.7)";
    container.style.width = '40%';
    container.style.height = '300px';
    document.body.style.backgroundImage = "url(./assets/Backpacking.png)";
    document.body.style.backgroundRepeat = "no repeat";
    document.body.style.backgroundSize = "cover";

    const h1 = createDOMElement("h1", { className: "ourAdvise" });
    h1.innerText = "Our advise";
    container.appendChild(h1);
    const countries = await getCountriesData();
    countries.forEach((country) => {
      if (e.target.value === country.name) {
        const { message } = country.advisory;
        const { source } = country.advisory;
        const pEl = createDOMElement("p", { className: "messageText" });
        pEl.innerText = message;
        container.appendChild(pEl);
        const moreInfo = createDOMElement("p", { className: "moreInfo" });
        moreInfo.innerText = `For more information about ${country.name}, visit `;
        const link = createDOMElement("a", { className: "link" });
        link.href = `${source}`;
        link.innerText = source;
        moreInfo.appendChild(link);
        container.appendChild(moreInfo);

        getWeatherInfo(country.name).then((temp) => {
          addWeatherCard(country.name).appendChild(temp);
        });
      }
    });
  });
};

export default handleSelectedCountry;
