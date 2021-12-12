const input = `
pq-GX
GX-ah
mj-PI
ey-start
end-PI
YV-mj
ah-iw
te-GX
te-mj
ZM-iw
te-PI
ah-ZM
ey-te
ZM-end
end-mj
te-iw
te-vc
PI-pq
PI-start
pq-ey
PI-iw
ah-ey
pq-iw
pq-start
mj-GX
`;

const caves = new Map();

input.split('\n').filter(Boolean).forEach((entry) => {
  const [left, right] = entry.split('-');
  const leftConnections = caves.get(left) || [];
  leftConnections.push(right);
  caves.set(left, leftConnections);
  const rightConnections = caves.get(right) || [];
  rightConnections.push(left);
  caves.set(right, rightConnections);
});

const isSmallCave = (input) => /^[a-z]*$/.test(input);

const explore = (cave, path = [], visitCount = new Map()) => {
  visitCount.set(cave, (visitCount.get(cave) || 0) + 1);

  const canVisitCave = (destination) => {
    if (!isSmallCave(destination)) return true;

    const visits = visitCount.get(destination) || 0;

    if (visits === 0) return true;

    if (['start', 'end'].includes(destination)) return false;
    
    const smallCaveCounts = path.filter((cave) => isSmallCave(cave)).map(((cave) => visitCount.get(cave) || 0));
    const hadDoubleSmall = smallCaveCounts.some((count) => count > 1);
    return !hadDoubleSmall;
  };
  
  const paths = [];
  const destinations = caves.get(cave);
  destinations
    .filter((destination) => canVisitCave(destination))
    .forEach((destination) => {
      if (destination === 'end') {
        paths.push(path);
      } else {
        paths.push(...explore(destination, [...path, destination],  new Map(visitCount)));
      }
    });

  return paths;
};

const paths = explore('start');
console.log(paths.length);
