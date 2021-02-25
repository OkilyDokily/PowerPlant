import { stateControl as plant1, blueFood, superWater } from './../src/plant.js';

describe('stateControl', () => {
  test('should return correct values for new state', () => {

    expect(plant1(blueFood).soil).toEqual(5);
    expect(plant1(superWater).water).toEqual(5);
    expect(plant1()).toEqual({ "soil": 5, "water": 5 })
  })

  test('should return correct values on closed functions', () => {

  })
});