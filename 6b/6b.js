const input = '4,3,4,5,2,1,1,5,5,3,3,1,5,1,4,2,2,3,1,5,1,4,1,2,3,4,1,4,1,5,2,1,1,3,3,5,1,1,1,1,4,5,1,2,1,2,1,1,1,5,3,3,1,1,1,1,2,4,2,1,2,3,2,5,3,5,3,1,5,4,5,4,4,4,1,1,2,1,3,1,1,4,2,1,2,1,2,5,4,2,4,2,2,4,2,2,5,1,2,1,2,1,4,4,4,3,2,1,2,4,3,5,1,1,3,4,2,3,3,5,3,1,4,1,1,1,1,2,3,2,1,1,5,5,1,5,2,1,4,4,4,3,2,2,1,2,1,5,1,4,4,1,1,4,1,4,2,4,3,1,4,1,4,2,1,5,1,1,1,3,2,4,1,1,4,1,4,3,1,5,3,3,3,4,1,1,3,1,3,4,1,4,5,1,4,1,2,2,1,3,3,5,3,2,5,1,1,5,1,5,1,4,4,3,1,5,5,2,2,4,1,1,2,1,2,1,4,3,5,5,2,3,4,1,4,2,4,4,1,4,1,1,4,2,4,1,2,1,1,1,1,1,1,3,1,3,3,1,1,1,1,3,2,3,5,4,2,4,3,1,5,3,1,1,1,2,1,4,4,5,1,5,1,1,1,2,2,4,1,4,5,2,4,5,2,2,2,5,4,4';

let fish = input.split(',').map((a) => parseInt(a));

const getFishAtDayForNextDay = (inputFishAtDay) => {
  return {
    8: inputFishAtDay[0],
    7: inputFishAtDay[8],
    6: inputFishAtDay[7] + inputFishAtDay[0],
    5: inputFishAtDay[6],
    4: inputFishAtDay[5],
    3: inputFishAtDay[4],
    2: inputFishAtDay[3],
    1: inputFishAtDay[2],
    0: inputFishAtDay[1],
  }
};

let fishAtDay = {
  8: 0,
  7: 0,
  6: 0,
  5: 0,
  4: 0,
  3: 0,
  2: 0,
  1: 0,
  0: 0,
};

fish.forEach((day) => {
  fishAtDay[day]++;
});

for (let i=0; i<256; i++) {
  fishAtDay = getFishAtDayForNextDay(fishAtDay);
}

let totalFish = 0;
Object.entries(fishAtDay).forEach(([, count]) => {
  totalFish += count;
});

console.log(totalFish);
