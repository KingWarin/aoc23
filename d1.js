//part 1:
let lines = $0.textContent.split('\n');
lines.pop();
let cleanLines = [];
lines.forEach(line=>{
    cleanLines.push(line.replace(/[a-z]/g, ''));
});
let values = [];
cleanLines.forEach(line=>{
    let value = '';
    value += line[0];
    value += line[line.length - 1];
    values.push(value);
});
values.reduce((x,y)=>{return parseInt(x)+parseInt(y);});

//part 2:
let matcher = function(match, p1, p2, p3, p4, p5, p6, p7, p8, p9, offset, string) {
    if (p1) {
        return 'o1e';
    }
    if (p2) {
        return 't2o';
    }
    if (p3) {
        return 't3e';
    }
    if (p4) {
        return 'f4r';
    }
    if (p5) {
        return 'f5e';
    }
    if (p6) {
        return 's6x';
    }
    if (p7) {
        return 's7n';
    }
    if (p8) {
        return 'e8t';
    }
    if (p9) {
        return 'n9e';
    }
};
let lines2 = $0.textContent.split('\n');
lines2.pop();
let cleanLines2 = [];
lines2.forEach(line => {
    line = line.replace(/(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)/g, matcher);
    line = line.replace(/(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)/g, matcher);
    cleanLines2.push(line.replace(/[a-z]/g, ''));
});
let values2 = [];
cleanLines2.forEach(line=>{
    let value = '';
    value += line[0];
    value += line[line.length - 1];
    values2.push(value);
});
values2.reduce((x,y)=>{return parseInt(x)+parseInt(y);});
