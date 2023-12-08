// Part 1:
let lines = $0.innerText.replace(/\n$/, '').replaceAll('Card ','').split('\n');
let cards = lines.map(line => {
    [id, numbers] = line.split(': ');
    [winning, lot] = numbers.split(' | ');
    winning = winning.trim().replaceAll(/\s+/g,' ').split(' ');
    lot = lot.trim().replaceAll(/\s+/g,' ').split(' ');
    winning = winning.map(x => parseInt(x));
    lot = lot.map(x => parseInt(x));
    let points = 0;
    let hits = 0;
    lot.forEach(test => {
        if ( winning.includes(test) ) {
            if ( points != 0 ) {
                points = points * 2;
            } else {
                points = 1;
            }
          hits++;
        }
    });
    return { id: parseInt(id), winning, lot, points, hits, cardAmount: 1 };
});
let total1 = 0;
cards.forEach(card => {
    total1 += card.points;
});
console.log(total1);

// Part 2:
cards.forEach(card => {
  if ( card.hits != 0 ) {
    for(let j = 1; j <= card.cardAmount; j++ ) {
      for(let i = 1; i <= card.hits; i++) {
        cards[cards.findIndex(x => x.id == card.id + i)].cardAmount++;
      }
    }
  }
});
let totalCards = 0;
cards.forEach(card => {
  totalCards += card.cardAmount;
});
console.log(totalCards);
