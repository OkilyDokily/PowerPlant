const storeState = (initialState = {}) => {
  let currentState = initialState;
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = { ...newState };
    return newState;
  };
};

var plantsArray = [];

export const plant1 = storeState();
export const plant2 = storeState();

export function addNewPlant()
{
  const newPlant = storeState;
  plantsArray.push(newPlant);
}
// This is a function factory. We can easily create more specific functions that alter a plant's soil, water, and light to varying degrees.

const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop]: (state[prop] || 0) + value
    });
  };
};

const feed = changeState("soil")(1);
export const blueFood = changeState("soil")(5);


const hydrate = changeState("water")(1);
export const superWater = changeState("water")(5);