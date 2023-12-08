// Part 1:
let lines = $0.innerText.replace(/\n$/, '').split('\n');
lines = lines.map(line => line.split(''));
let symbols = [];
let numbers = [];
let numbersInit = [];
lines.forEach((line, i, allLines) => {
    line.forEach((element, pos, allElements) => {
        if ( element == '*' ) {
            symbols.push({y: i, x: pos});
        } else if ( element.match(/\d/) ) {
            numbers.push({y: i, x: pos});
            numbersInit.push({y: i, x: pos});
        }
    });
});
function getCombinedNumber(digit, direction) {
    if (digit.checked) {
        return false;
    }
    let number = lines[digit.y][digit.x];
    if(direction == undefined || !direction) {
        if ( digit.x - 1 >= 0 && lines[digit.y][digit.x-1].match(/\d/) ) {
            let leftNumber = getCombinedNumber(numbers.find(element => element.x == digit.x-1 && element.y == digit.y), false);
            if ( leftNumber ) {
                number = leftNumber + number;
            }
        }
    }
    if(direction == undefined || direction) {
        if ( digit.x + 1 < lines[0].length && lines[digit.y][digit.x+1].match(/\d/) ) {
            let rightNumber = getCombinedNumber(numbers.find(element => element.x == digit.x+1 && element.y == digit.y), true);
            if (rightNumber) {
                number = number + rightNumber;
            }
        }
    }
    numbers[numbers.indexOf(numbers.find(element => element == digit))].checked = true;
    return number;
}
function checkAdjacent(number) {
    let hasAdjacentSymbol = false;
    let hasAdjacentNumber = false;
    if ( number.x - 1 >= 0 ) {
        // Check left
        if ( lines[number.y][number.x - 1].match(/\d/) ) {
            hasAdjacentNumber = true;
        }
        if ( lines[number.y][number.x - 1].match(/[^\d.]/) ) {
            hasAdjacentSymbol = true;
        }
    }
    if ( number.x + 1 < lines[0].length ) {
        // Check right
        if ( lines[number.y][number.x + 1].match(/\d/) ) {
            hasAdjacentNumber = true;
        }
        if ( lines[number.y][number.x + 1].match(/[^\d.]/) ) {
            hasAdjacentSymbol = true;
        }
    }
    if ( number.y - 1 >= 0 ) {
        // Check top
        if ( (lines[number.y - 1][number.x - 1] && lines[number.y - 1][number.x - 1].match(/[^\d.]/)) || lines[number.y - 1][number.x].match(/[^\d.]/) || (lines[number.y - 1][number.x + 1] && lines[number.y - 1][number.x + 1].match(/[^\d.]/)) ) {
            hasAdjacentSymbol = true;
        }
    }
    if ( number.y + 1 < lines.length ) {
        // Check bottom
        if ( (lines[number.y + 1][number.x - 1] && lines[number.y + 1][number.x - 1].match(/[^\d.]/)) || lines[number.y + 1][number.x].match(/[^\d.]/) || (lines[number.y + 1][number.x + 1] && lines[number.y + 1][number.x + 1].match(/[^\d.]/)) ) {
            hasAdjacentSymbol = true;
        }
    }
    number.hasAdjacentSymbol = hasAdjacentSymbol;
    number.hasAdjacentNumber = hasAdjacentNumber;
    return number;
}
numbers.map(number =>  checkAdjacent(number));
let totalSum = 0;
numbers.filter(number => number.hasAdjacentSymbol).forEach(number => {
    let value = getCombinedNumber(number);
    if (value) {
        totalSum += parseInt(value);
    }
});
console.log(totalSum)

// Part 2:
numbers = numbersInit;
function getAdjacentNumbers(symbol) {
  let possibleNumbersForSymbol = [];
  if ( symbol.y - 1 >= 0 ) {
    if ( symbol.x -1 >= 0 ) {
      let possibleTopLeft = possibleNumbers.find(el => el.x == symbol.x - 1 && el.y == symbol.y - 1);
      if ( possibleTopLeft) {
        possibleNumbersForSymbol.push(possibleTopLeft);
      }
    }
    if ( symbol.x + 1 < lines[0].length ) {
      let possibleTopRight = possibleNumbers.find(el => el.x == symbol.x +1 && el.y == symbol.y - 1);
      if (possibleTopRight ) {
        possibleNumbersForSymbol.push(possibleTopRight);
      }
    }
    let possibleTop = possibleNumbers.find(el => el.x == symbol.x && el.y == symbol.y - 1);
    if ( possibleTop ) {
      possibleNumbersForSymbol.push(possibleTop);
    }
  }
  if ( symbol.y + 1 < lines.length ) {
    if ( symbol.x -1 >= 0 ) {
      let possibleBottomLeft = possibleNumbers.find(el => el.x == symbol.x - 1 && el.y == symbol.y + 1);
      if ( possibleBottomLeft) {
        possibleNumbersForSymbol.push(possibleBottomLeft);
      }
    }
    if ( symbol.x + 1 < lines[0].length ) {
      let possibleBottomRight = possibleNumbers.find(el => el.x == symbol.x +1 && el.y == symbol.y + 1);
      if (possibleBottomRight ) {
        possibleNumbersForSymbol.push(possibleBottomRight);
      }
    }
    let possibleBottom = possibleNumbers.find(el => el.x == symbol.x && el.y == symbol.y + 1);
    if ( possibleBottom) {
      possibleNumbersForSymbol.push(possibleBottom);
    }
  }
  if ( symbol.x - 1 >= 0 ) {
    let possibleLeft = possibleNumbers.find(el => el.x == symbol.x -1 && el.y == symbol.y);
    if (possibleLeft) {
      possibleNumbersForSymbol.push(possibleLeft);
    }
  }
  if ( symbol.x + 1 < lines[0].length ) {
    let possibleRight = possibleNumbers.find(el => el.x == symbol.x +1 && el.y == symbol.y);
    if (possibleRight) {
      possibleNumbersForSymbol.push(possibleRight);
    }
  }
  return possibleNumbersForSymbol;
}

function checkAdjacent2(number) {
    let hasAdjacentSymbol = false;
    let hasAdjacentNumber = false;
    if ( number.x - 1 >= 0 ) {
        // Check left
        if ( lines[number.y][number.x - 1].match(/\d/) ) {
            hasAdjacentNumber = true;
        }
        if ( lines[number.y][number.x - 1] == '*' ) {
            hasAdjacentSymbol = true;
        }
    }
    if ( number.x + 1 < lines[0].length ) {
        // Check right
        if ( lines[number.y][number.x + 1].match(/\d/) ) {
            hasAdjacentNumber = true;
        }
        if ( lines[number.y][number.x + 1] == '*' ) {
            hasAdjacentSymbol = true;
        }
    }
    if ( number.y - 1 >= 0 ) {
        // Check top
        if ( (lines[number.y - 1][number.x - 1] && lines[number.y - 1][number.x - 1] == '*') || lines[number.y - 1][number.x] == '*' || (lines[number.y - 1][number.x + 1] && lines[number.y - 1][number.x + 1] == '*') ) {
            hasAdjacentSymbol = true;
        }
    }
    if ( number.y + 1 < lines.length ) {
        // Check bottom
        if ( (lines[number.y + 1][number.x - 1] && lines[number.y + 1][number.x - 1] == '*') || lines[number.y + 1][number.x] == '*' || (lines[number.y + 1][number.x + 1] && lines[number.y + 1][number.x + 1] == '*') ) {
            hasAdjacentSymbol = true;
        }
    }
    number.hasAdjacentSymbol = hasAdjacentSymbol;
    number.hasAdjacentNumber = hasAdjacentNumber;
    return number;
}
let ratio = 0;
numbers.map(number =>  checkAdjacent2(number));
let possibleNumbers = numbers.filter(number => number.hasAdjacentSymbol);
symbols.forEach(symbol => {
  let values = [];
  getAdjacentNumbers(symbol).forEach(number => {
    let value = getCombinedNumber(number);
    if ( value ) {
      values.push(value);
    }
  });
  if (values.length == 2) {
    ratio += parseInt(values[0])*parseInt(values[1]);
  }
});
console.log(ratio);
