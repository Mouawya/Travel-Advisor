"ues strict";

import { HOME_BUTTON } from "../constants.js";

const handleHomeBtn = () => {
  const button = document.getElementById(HOME_BUTTON);
  button.addEventListener("click", () => {
    window.location.reload();
  });
};

export default handleHomeBtn;
