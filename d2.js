// Part 1:
let lines = $0.innerText.replace(/\n$/, '').replaceAll('Game ','').split('\n');
let cleanLines = [];
lines.forEach(line => {
    [id, sets] = line.split(': ');
    sets = sets.split('; ');
    let colors = {
        red: 0,
        blue: 0,
        green: 0
    };
    sets.forEach(cset => {
        let found = Array.from(cset.matchAll(/((?<red>\d+)(?=\sred))|((?<blue>\d+)(?=\sblue))|((?<green>\d+)(?=\sgreen))/g), (m) => m.groups);
        for ( let match of found ) {
            if ( parseInt(match.red) > colors.red ) {
                colors.red = parseInt(match.red);
            }
            if ( parseInt(match.blue) > colors.blue ) {
                colors.blue = parseInt(match.blue);
            }
            if ( parseInt(match.green) > colors.green ) {
                colors.green = parseInt(match.green);
            }
        }
    });
    cleanLines.push([id, colors]);
});
let possibleMax = { red: 12, green: 13, blue: 14 };
let possibleLines = cleanLines.filter(line => {
    return line[1].red <= possibleMax.red && line[1].green <= possibleMax.green && line[1].blue <= possibleMax.blue;
});
let sum = 0;
possibleLines.forEach(line => {
    sum += parseInt(line[0]);
});
console.log(sum);

// Part 2:
let powers = [];
cleanLines.forEach(([id,colors]) => {
  powers.push(colors.red * colors.blue * colors.green);
});
console.log(powers.reduce((x,y) => x + y));
