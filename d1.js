// Part1
let s = $0.innerHTML.split('\n').map(x => x.split(/\s/));
let a1 = [], a2 = [];
s.forEach(el => {
  if (el.length > 1) {
    a1.push(parseInt(el[0]));
    a2.push(parseInt(el[3]));
  }
});
a1 = a1.sort();
a2 = a2.sort();
console.log(`Result ${a1.map((el, index) => Math.abs(el - a2[index])).reduce((a,b) => a+b)}`);

// Part2
let res2 = [];
a1.map(el => {
  let count = a2.map(el2 => el2 === el ? 1 : 0).reduce((a,b) => a+b);
  res2.push(el*count);
});
console.log(`Result ${res2.reduce((a,b)=>a+b)}`);
