// Part 1:
let input = $0.innerText.substr(0,$0.innerText.length - 1).split('\n').map(row=>row.split(''));
let rowLength = input[0].length;
let horizontal = input.map(row => row.join(''));
let vertical = [];
let diagonal = [];
for(let i = 0; i < rowLength; i++) {
  vertical.push(input.map(row => row[i]).join(''));
}
function getDiagonals(data) {
  let tempDiagonal = [];
  // Get diagonal for each row start
  for(let i = 0; i < rowLength; i++) {
    let diag = '';
    for(let j = 0; j < data.length; j++) {
      let off = i+j;
      if ( off < data.length ) {
        diag += data[i+j][j];
      }
    }
    tempDiagonal.push(diag);
  }
  //Get remaining diagonals from first row
  for(let i = 1; i < data.length; i++) {
    let diag = '';
    for(let j = 0; j < data.length; j++) {
      if ( j+i < rowLength ) {
        diag += data[j][j+i];
      }
    }
    tempDiagonal.push(diag);
  }
  return tempDiagonal;
}
diagonal = diagonal.concat(getDiagonals(input));
input = input.map(row => row.reverse());
diagonal = diagonal.concat(getDiagonals(input));
let total1 = 0;
total1 += [...horizontal, ...vertical, ...diagonal].map(el => el.match(/(XMAS)/g)?.length ?? 0).reduce((a,b) => a+b);
total1 += [...horizontal, ...vertical, ...diagonal].map(el => el.match(/(SAMX)/g)?.length ?? 0).reduce((a,b) => a+b);
console.log(`Result: ${total1}`);
