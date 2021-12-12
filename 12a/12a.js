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

const explore = (cave, path = [], visited = new Set()) => {
  if (isSmallCave(cave)) visited.add(cave);
  
  const paths = [];
  const destinations = caves.get(cave);
  destinations
    .filter((destination) => !visited.has(destination))
    .forEach((destination) => {
      if (destination === 'end') {
        paths.push(path);
      } else {
        paths.push(...explore(destination, [...path, destination],  new Set(visited)));
      }
    });

  return paths;
};

const paths = explore('start');

console.log(paths.length);
