const input = `
4341347643
5477728451
2322733878
5453762556
2718123421
4237886115
5631617114
2217667227
4236581255
4482627641
`;

const octopuses = input.split('\n').filter(Boolean).map((row) => row.split('').map((a) => parseInt(a)));
const rowCount = octopuses.length;
const columnCount = octopuses[0].length;

const step = () => {
  for (let x = 0; x < columnCount; x++) {
    for (let y = 0; y < rowCount; y++) {
      octopuses[y][x]++;
    }
  }

  const getLocal = (x, y) => {
    const canGoUp = y > 0;
    const canGoRight = x < columnCount - 1;
    const canGoDown = y < rowCount - 1;
    const canGoLeft = x > 0;
    return {
      up: canGoUp ? { x, y: y - 1 } : null,
      upRight: canGoUp && canGoRight ? { x: x + 1, y: y - 1 } : null,
      right: canGoRight ? { x: x + 1, y } : null,
      downRight: canGoDown && canGoRight ? { x: x + 1, y: y + 1 } : null,
      down: canGoDown ? { x , y: y + 1 } : null,
      downLeft: canGoDown && canGoLeft ? { x: x - 1, y: y + 1 } : null,
      left: canGoLeft ? { x: x - 1, y } : null,
      upLeft: canGoUp && canGoLeft ? { x: x - 1, y: y - 1 } : null,
    };
  }

  const flashed = new Set();
  const flash = (x, y) => {
    if (flashed.has(`${x},${y}`)) return;
    flashed.add(`${x},${y}`);
    octopuses[y][x] = 0;

    const around = getLocal(x, y);
    Object.entries(around).filter(([, value]) => !!value).forEach(([, { x: x2, y: y2 }]) => {
      if (flashed.has(`${x2},${y2}`)) return;
      octopuses[y2][x2]++;
      if (octopuses[y2][x2] > 9) {
        flash(x2, y2);
      }
    });
  };

  for (let x = 0; x < columnCount; x++) {
    for (let y = 0; y < rowCount; y++) {
      if (octopuses[y][x] > 9) {
        flash(x, y);
      }
    }
  }
  return flashed.size;
};

let flashCount = 0;
for (let i=0; i<100; i++) {
  flashCount += step();
}

console.log(flashCount)
