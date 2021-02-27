const storeState = (initialState = {}) => {
  let currentState = initialState;
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = { ...newState };
    return newState;
  };
};

var plantsArray = [];


export function addNewPlant(plantKind) {
  return () => {
    const newPlant = storeState();
    plantsArray.push(newPlant()());
  };
}

//function factory


const initalizeOrResetState = (x, y) => x = y;
const initializeOrResetStateToValue = (x) => initalizeOrResetState.apply(x);

const addValueToState = (x, y) => x + y;

const subtractValueToState = (x, y) => y - x;

const addSpecifiedValueToState = (x) => addValueToState.apply(x);
const subtractSpecifiedValueToState = (x) => subtractValueToState.apply(x);



const changeStateForPropWithFunction = (prop, changeStateFunction) => {
  return (state) => ({
    ...state,
    [prop]: changeStateFunction((state[prop] || 0))()
  });
};

const initializedShooter = changeStateForPropWithFunction("laser", initializeOrResetStateToValue(100));

const shootLaser = changeStateForPropWithFunction("laser")(subtractSpecifiedValueToState(5));
const throwBomb = changeStateForPropWithFunction("bomb")(subtractSpecifiedValueToState(10));

const feed = changeStateForPropWithFunction("soil")(addSpecifiedValueToState(1));
export const blueFood = changeStateForPropWithFunction("soil")(addSpecifiedValueToState(5));


const hydrate = changeStateForPropWithFunction("water")(addSpecifiedValueToState(1));
export const superWater = changeStateForPropWithFunction("water")(addSpecifiedValueToState(5));



const steal = (property, value) => {
  return function () {
    const obj = {
      steal: function (target) {
        let newValue = (target[property] < value) ? target[property] : value; 
        this[property] = this.property + newValue;
        target[property] = target[property] - newValue;
      }
    };
    return obj;
  };
};

const StealSoil = steal("soil", 5);
const SuperStealSoil = steal("soil", 10);

const StealWater = steal("water", 5);
const SuperStealWater = steal("water", 10);

export const plant1State = storeState();
export const plant2State = storeState();

function AddStealWaterAndStealSuperSoil(plant) {
  return { ...plant(), ...StealWater(), ...SuperStealSoil() };
}

function AddSuperStealWaterAndStealSoil(plant) {
  return { ...plant(), ...SuperStealWater(), ...StealSoil()};
}

function initalizeFirstPlant(plant) {
  let updatedPlant = AddStealWaterAndStealSuperSoil(plant);
  plant = storeState()
}


