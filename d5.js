// Part 1:
let [seeds,soil,fertilizer,water,light,temperature,humidity,locationMap] = $0.innerText.replace(/\n$/, '').split('\n\n');
seeds = seeds.replace('seeds: ','').split(' ').map(x => { return {seed: parseInt(x)};});
let maps = {soil,fertilizer,water,light,temperature,humidity,location:locationMap};
function getTarget(maps, target, value) {
  if (!Object.keys(maps[target]).map(x => parseInt(x)).includes(value)) {
    return value;
  }
  return maps[target][value];
}
for(let currentMapName of Object.keys(maps)){
    let currentMap = maps[currentMapName];
    currentMap = currentMap.split('\n');
    currentMap.shift();
    currentMap = currentMap.map(x => {
        let [destination, source, length] = x.split(' ');
        return {source: parseInt(source), destination: parseInt(destination), length: parseInt(length)};
    });
    let tempMap = {};
    currentMap.forEach(map => {
        let target = 0;
        while(target <= map.length) {
            let newTarget = target + 100;
            let breakout = false;
            if ( newTarget > map.length ) {
              newTarget = map.length;
              breakout = true;
            }
            for ( let i = target; i < newTarget; i++ ) {
                tempMap[map.source + i] = map.destination + i;
            }
            target = newTarget;
            console.log(tempMap);
            if ( breakout ) {
              target++;
            }
        }
    });
    maps[currentMapName] = tempMap;
};
let lowestLocation1 = false;
seeds = seeds.map(seed => {
    let currentLocation = getTarget(maps, 'location', getTarget(maps, 'humidity', getTarget(maps, 'temperature', getTarget(maps, 'light', getTarget(maps, 'water', getTarget(maps, 'fertilizer', getTarget(maps, 'soil', seed.seed)))))));
    if (!lowestLocation1 || currentLocation < lowestLocation1) {
        lowestLocation1 = currentLocation;
    }
    return seed;
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
  console.log(start);
    for( let i = start; i < start + length; i++ ) {
        let currentLocation = getTarget(maps, 'location', getTarget(maps, 'humidity', getTarget(maps, 'temperature', getTarget(maps, 'light', getTarget(maps, 'water', getTarget(maps, 'fertilizer', getTarget(maps, 'soil', i)))))));
        if (!lowestLocation2 || currentLocation < lowestLocation2) {
            lowestLocation2 = currentLocation;
        }
    }
}
console.log(lowestLocation2)
