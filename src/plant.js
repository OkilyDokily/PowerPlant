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

export const initializedSoil = changeStateForPropWithFunction("soil", initializeOrResetStateToValue(50));
export const initializedWater = changeStateForPropWithFunction("water", initializeOrResetStateToValue(20));

const feed = changeStateForPropWithFunction("soil",addSpecifiedValueToState(1));
export const blueFood = changeStateForPropWithFunction("soil",addSpecifiedValueToState(5));

export const hydrate = changeStateForPropWithFunction("water",addSpecifiedValueToState(1));
export const superWater = changeStateForPropWithFunction("water",addSpecifiedValueToState(5));


const steal = (property, value, prop) => {
  return function () {
    const obj = {
      [prop]: function (stealer,target) {
        let newValue = (target()[property] < value) ? target()[property] : value;
        stealer(changeStateForPropWithFunction(property,addSpecifiedValueToState(newValue)));
        target(changeStateForPropWithFunction(property,subtractSpecifiedValueToState(newValue)));
       
      }
    };
    return obj;
  };
};

const StealSoil = steal("soil", 5,"stealSoil");
const SuperStealSoil = steal("soil", 10,"superStealSoil");

const StealWater = steal("water", 5,"stealWater");
const SuperStealWater = steal("water", 10,"superStealWater");


export const addFunctionWithName = (prop, newFunction) => {
  return (state) => {
    let newState = {...state};
    newState[prop] = newFunction;
    return newState;
  };
};


export function CreatePlantType1() {
  
  let obj = {...StealWater(), ...SuperStealSoil()};
  let plant = storeState(obj);
  plant = initializePlant(plant);

  return plant;
}

export function CreatePlantType2() {
  let obj = { ...SuperStealWater(), ...StealSoil()};
  let plant = storeState(obj);
  plant = initializePlant(plant);
  
  return plant;
}

export function CreatePlantType3()
{
  let plant = storeState();
  plant = initializePlant(plant);
  plant(addFunctionWithName("stealSoil",StealSoil()["stealSoil"]));
  return plant;
}

function initializePlant(plant){
  plant(initializedWater);
  plant(initializedSoil);
  return plant;
}




