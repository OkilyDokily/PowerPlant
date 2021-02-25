import {stateControl as blueFood, plantsArray, addNewPlant} from "./plant.js";

// We create four functions using our function factory. We could easily create many more.

jQuery(function () {

  $('#addplant').click(function () {
    const newState = addNewPlant();
  });

});