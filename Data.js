"use strict";

import { API_LINK } from "./constants.js";
import createDOMElement from "./utilities/createDOMElement.js";

export const requestAPI = async (api) => {
  try {
    const response = await fetch(api);
    return response.json();
  } catch (err) {
    console.log(err.message);
    return alert("Sorry! Something went wrong.");
  }
};

export const getCountriesData = async () => {
  try {
    const data = await requestAPI(API_LINK);
    const countriesData = Object.values(data.data);
    return countriesData;
  } catch (err) {
    console.log(err.message);
  }
};

export const getSafestCountriesNames = async () => {
  try {
    const namesArr = [];
    const data = await getCountriesData();
    data.forEach((country) => {
      const { score } = country.advisory;
      if (score == 0) {
        namesArr.push(country.name);
      }
    });
    return namesArr;
  } catch (err) {
    console.log(err.message);
  }
};

export const getUnsafestCountriesNames = async () => {
  try {
    const namesArr = [];
    const names = await getCountriesData();
    names.forEach((country) => {
      const { score } = country.advisory;
      if (score == 5) {
        namesArr.push(country.name);
      }
    });
    return namesArr;
  } catch (err) {
    console.log(err.message);
  }
};

export const getWeatherInfo = async (countryName) => {
  try {
    const data = await requestAPI(
      `https://api.openweathermap.org/data/2.5/forecast?q=${countryName}&appid=bc140749bfaa913b1e02e5992fb1f553`
    );
    const { temp } = data.list[0].main;
    const { main } = data.list[0].weather[0];
    const h3El1 = createDOMElement("h3", { className: "temp" });
    h3El1.innerHTML = `${main} <br> ${Math.floor(temp - 273.15)} C° `;
    return h3El1;
  } catch (err) {
    console.log(err.message);
    return alert('Sorry! Something went wrong');
  }
};
