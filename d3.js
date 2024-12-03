// Part 1:
let input = $0.innerText;
const regex1 = RegExp('mul\\((\\d{1,3}),(\\d{1,3})\\)', 'g');
let total = 0;
while((resArray = regex1.exec(input)) !== null) {
    let result = parseInt(resArray[1]) * parseInt(resArray[2]);
    total += result;
}
console.log(`Result: ${total}`);

// Part 2:
const regex2 = /mul\((\d{1,3}),(\d{1,3})\)|(don't\(\))|(do\(\))/g
let total2 = 0;
let ignore = false;
while((resArray = regex2.exec(input)) !== null) {
  if ( resArray[0] === "don't()" ) {
    ignore = true;
  } else if ( resArray[0] === 'do()' ) {
    ignore = false;
  } else {
    if ( !ignore ) {
      total2 += parseInt(resArray[1]) * parseInt(resArray[2]);
    }
  }
}
console.log(`Result: ${total2}`);
