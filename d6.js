// Part 1:
let input = $0.innerText.replace(/\n$/, '').replace(/\n/,'<|>');
let lines = input.replaceAll(/\s+/g,' ').split('<|>').map(x => {
    let [label, values] = x = x.split(':');
    values = values.trim().split(' ');
    x = values.map(value => parseInt(value));
    return x;
});
let races = [];
let [times, distances] = lines;
times.forEach((_, index) => {
    races.push({time: times[index], distance: distances[index]});
});
let solution = 1;
races.forEach(race => {
    let results = 0;
    for(let i = 0; i < race.time; i++ ) {
        let velo = i;
        let remaining = race.time - i;
        if ( velo * remaining > race.distance ) {
            results++;
        }
    }
    race.results = results;
    solution = solution * results;
});
console.log(solution);

// Part 2:
let lines2 = input.replaceAll(/\s/g,'').split('<|>').map(x => {
    let [label, value] = x = x.split(':');
    x = parseInt(value);
    return x;
});
let results = 0;
for(let i = 0; i < lines2[0]; i++) {
    let velo = i;
    let remaining = lines2[0] - i;
    if ( velo * remaining > lines2[1] ) {
        results++;
    }
}
console.log(results);
