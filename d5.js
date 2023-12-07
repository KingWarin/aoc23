// Part 1:
let [seeds,soil,fertilizer,water,light,temperature,humidity,locationMap] = $0.innerText.replace(/\n$/, '').split('\n\n');
seeds = seeds.replace('seeds: ','').split(' ').map(x => { return parseInt(x)});
let maps = {soil,fertilizer,water,light,temperature,humidity,location:locationMap};
let ranges = {};
for(let currentMapName of Object.keys(maps)){
    let currentMap = maps[currentMapName];
    currentMap = currentMap.split('\n');
    currentMap.shift();
    let mapRanges = [];
    currentMap = currentMap.map(x => {
        let [destination, source, length] = x.split(' ');
        mapRanges.push({start: parseInt(source), finish: parseInt(source) + parseInt(length), offset: parseInt(destination) - parseInt(source)});
        return {source: parseInt(source), destination: parseInt(destination), length: parseInt(length)};
    });
    maps[currentMapName] = currentMap;
    ranges[currentMapName] = mapRanges;
};
let lowestLocation1 = false;
function getTarget(ranges, target, source) {
    let map = ranges[target];
    for(let i = 0; i < map.length; i++) {
        if ( source >= map[i].start && source <= map[i].finish ) {
            return source + map[i].offset;
        }
    }
    return source;
};
seeds.forEach(seed => {
    let result = getTarget(ranges, 'location', getTarget(ranges, 'humidity', getTarget(ranges, 'temperature', getTarget(ranges, 'light', getTarget(ranges, 'water', getTarget(ranges, 'fertilizer', getTarget(ranges, 'soil', seed)))))));
    if ( !lowestLocation1 || result < lowestLocation1 ) {
        lowestLocation1 = result;
    }
});
console.log(lowestLocation1);

// Part 2:
[seeds,soil,fertilizer,water,light,temperature,humidity,locationMap] = $0.innerText.replace(/\n$/, '').split('\n\n');
seeds = seeds.replace('seeds: ','').split(' ').map(x => parseInt(x));
let lowestLocation2 = false;
while(seeds.length > 0) {
    let allSeeds = [];
    let start = seeds.shift();
    let length = seeds.shift();
        for( let i = start; i < start + length; i++ ) {
        let currentLocation = getTarget(ranges, 'location', getTarget(ranges, 'humidity', getTarget(ranges, 'temperature', getTarget(ranges, 'light', getTarget(ranges, 'water', getTarget(ranges, 'fertilizer', getTarget(ranges, 'soil', i)))))));
        if (!lowestLocation2 || currentLocation < lowestLocation2) {
            lowestLocation2 = currentLocation;
        }
    }
}
console.log(lowestLocation2)
