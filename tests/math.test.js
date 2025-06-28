const { add, subtract } = require('../src/math');

test('lägger ihop två tal', () => {
  expect(add(2, 3)).toBe(5);
});

test('subtraherar två tal', () => {
  expect(subtract(5, 2)).toBe(3);
});
