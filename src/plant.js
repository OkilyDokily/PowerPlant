export const storeState = (initialState = {}) => {
  let currentState = initialState;
  return (stateChangeFunction = (state => state)) => {
    const newState = stateChangeFunction(currentState);
    currentState = { ...newState };
    return newState;
  };
};

//function factory
const initalizeOrResetState = (x) => x ;
const initializeOrResetStateToValue = (x) => initalizeOrResetState.bind(null,x);

export const addValueToState = (x, y) => x + y;

const subtractValueToState = (x, y) => y - x;

export const addSpecifiedValueToState = (x) => addValueToState.bind(null,x);
const subtractSpecifiedValueToState = (x) => subtractValueToState.bind(null,x);


export const changeStateForPropWithFunction = (prop, changeStateFunction) => {
  return (state) => {
    let newState = {...state};
    newState[prop] = changeStateFunction((state[prop] || 0));
    return newState;
  };
};

export const initializedShooter = changeStateForPropWithFunction("laser", initializeOrResetStateToValue(100));
export const initializedSoil = changeStateForPropWithFunction("soil", initializeOrResetStateToValue(50));
export const initializedWater = changeStateForPropWithFunction("water", initializeOrResetStateToValue(20));

const shootLaser = changeStateForPropWithFunction("laser",subtractSpecifiedValueToState(5));
const throwBomb = changeStateForPropWithFunction("bomb",subtractSpecifiedValueToState(10));

const feed = changeStateForPropWithFunction("soil",addSpecifiedValueToState(1));
export const blueFood = changeStateForPropWithFunction("soil",addSpecifiedValueToState(5));

export const hydrate = changeStateForPropWithFunction("water",addSpecifiedValueToState(1));
export const superWater = changeStateForPropWithFunction("water",addSpecifiedValueToState(5));


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

export function CreatePlantType1() {
  
  var obj = {...StealWater(), ...SuperStealSoil()};
  let plant = storeState(obj);
  plant(initializedShooter);
  plant(initializedWater);
  plant(initializedSoil);
  return plant;
}

export function CreatePlantType2() {
  var obj = { ...SuperStealWater(), ...StealSoil()};
  let plant = storeState(obj);
  plant(initializedShooter);
  plant(initializedWater);
  plant(initializedSoil);
  return plant;
}




