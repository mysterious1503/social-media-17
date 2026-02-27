// @ts-check



//This file works like a typescript now


/**
 * @param {string} name
 * @param {number} age
 * @returns
 */

function greet(name, age) {
  return `Hello ${name}, you are ${age} years old.`;
}

// VS Code will highlight this in red because "25" is a string, not a number
//greet("Alice", "34");

greet("Alice", 43);