// Part 1:
let [directions, maps] = $0.innerText.replace(/\n$/,'').split('\n\n');
directions = directions.split('');
maps = maps.split('\n').map(map => {
    let [name, left, right] = map.replaceAll(/\s|\(|\)/g,'').replaceAll(/,/g,'=').split('=');
    return {name, left, right};
});
let network = {};
maps.forEach(map => {
    network[map.name] = {name: map.name, left: map.left, right: map.right};
});
let current = network['AAA'];
let steps = 0;

for(let i = 0 ; i < directions.length; i++ ) {
    steps++;
    let next;
    if ( directions[i] == 'R' ) {
        next = network[current.right];
    } else {
        next = network[current.left];
    }
    if ( next.name == 'ZZZ' ) {
        i = directions.length + 1;
    } else if ( i+1 == directions.length ) {
        i = -1;
    }
    current = next;
}
console.log(steps);

// Part 2:

