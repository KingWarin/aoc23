function checkLevel(inArray, ignoreFirst = false) {
  let increasing = false;
  let safe = true;
  inArray.forEach((el, index) => {
    if ( index === 0 ) {
      if ( el <= inArray[inArray.length - 1] ) {
        increasing = true;
      }
    } else {
      if ( increasing ) {
        if ( el < inArray[index-1] || el - inArray[index-1] > 3 || el === inArray[index-1] ) {
          if ( ignoreFirst ) {
            let testArray = inArray.toSpliced(index - 1, 1);
            safe = checkLevel(testArray);
            if (!safe) {
              testArray = inArray.toSpliced(index, 1);
              safe = checkLevel(testArray);
            }
          } else {
            safe = false;
          }
        }
      } else {
        if ( el > inArray[index-1] || inArray[index-1] - el > 3 || el === inArray[index-1] ) {
          if ( ignoreFirst ) {
            let testArray = inArray.toSpliced(index - 1, 1);
            safe = checkLevel(testArray);
            if (!safe) {
              testArray = inArray.toSpliced(index, 1);
              safe = checkLevel(testArray);
            }
          } else {
            safe = false;
          }
        }
      }
    }
  });
  return safe;
}

// Part 1:
let input = $0.innerHTML.split('\n').map(el => el.split(' ').map(iEl => parseInt(iEl)));
input.pop();
let result1 = input.filter(el => checkLevel(el));
console.log(`Result: ${result1.length}`);

// Part2:
let result2 = input.filter(el => checkLevel(el, true));
console.log(`Result: ${result2.length}`);
