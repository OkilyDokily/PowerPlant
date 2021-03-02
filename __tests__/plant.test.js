import { storeState, blueFood, superWater, CreatePlantType1, CreatePlantType2, CreatePlantType3, initializedWater, addSpecifiedValueToState, changeStateForPropWithFunction, hydrate } from './../src/plant.js';

describe('tests', () => {
  test('should return a function that can modifiy an object according to specified prop', () => {
    let func = changeStateForPropWithFunction("thunder", x => x + 1);
    let obj = {};
    expect(func(obj)["thunder"]).toEqual(1);
  });

  test('should return correct function and add correctly', () => {
    expect(addSpecifiedValueToState(7)(5)).toEqual(12);
  });

  test('should return correct values for new state', () => {
    let plant1 = storeState();
    expect(plant1(blueFood).soil).toEqual(5);
    expect(plant1(superWater).water).toEqual(5);
    expect(plant1()).toEqual({ "soil": 5, "water": 5 });
  });

  test('test that initializing state of plant works', () => {
    let plant2 = storeState();
    plant2(initializedWater);
    expect(plant2().water).toEqual(20);
  });

  test('test that creating plants of type1 and 2 work', () => {
    let plant1 = CreatePlantType1();
    plant1(hydrate);
    expect(plant1().water).toEqual(21);
    let plant2 = CreatePlantType2();
    expect(plant2(blueFood).soil).toEqual(55);
  });

  test('test that plant successfully steals from other plant', () => {
    let plant1 = CreatePlantType1();
    let plant2 = CreatePlantType2();
    plant1().superStealSoil(plant1, plant2);
    expect(plant1().soil).toEqual(60);
    expect(plant2().soil).toEqual(40);

  });

  test('test that plant successfully steals from other plant with alternate composition', () => {
    let plant1 = CreatePlantType3();
    let plant2 = CreatePlantType1();
    plant1().stealSoil(plant1, plant2);
    expect(plant1().soil).toEqual(55);
    expect(plant2().soil).toEqual(45);

  });
});