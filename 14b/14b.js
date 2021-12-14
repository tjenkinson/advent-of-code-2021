const input = `
PHVCVBFHCVPFKBNHKNBO

HK -> F
VN -> S
NB -> F
HF -> B
CK -> N
VP -> B
HO -> P
NH -> N
CC -> N
FC -> P
OK -> S
OO -> P
ON -> C
VF -> B
NN -> O
KS -> P
FK -> K
HB -> V
SH -> O
OB -> K
PB -> V
BO -> O
NV -> K
CV -> H
PH -> H
KO -> B
BC -> B
KC -> B
SO -> P
CF -> V
VS -> F
OV -> N
NS -> K
KV -> O
OP -> O
HH -> C
FB -> S
CO -> K
SB -> K
SN -> V
OF -> F
BN -> F
CP -> C
NC -> H
VH -> S
HV -> V
NF -> B
SS -> K
FO -> F
VO -> H
KK -> C
PF -> V
OS -> F
OC -> H
SK -> V
FF -> H
PK -> N
PC -> O
SP -> B
CB -> B
CH -> H
FN -> V
SV -> O
SC -> P
NP -> B
BB -> S
PV -> S
VB -> P
SF -> H
VC -> O
HN -> V
BF -> O
NO -> O
HP -> N
VV -> K
HS -> P
FH -> N
KB -> F
KF -> B
PN -> K
KH -> K
CN -> S
PP -> O
BP -> O
OH -> B
FS -> O
BK -> B
PO -> V
CS -> C
BV -> N
KP -> O
KN -> B
VK -> F
HC -> O
BH -> B
FP -> H
NK -> V
BS -> C
FV -> F
PS -> P
`;

const [templateInput, rulesInput] = input.split('\n\n');
const template = templateInput.trim();
const rules = new Map();
rulesInput.split('\n').filter(Boolean).forEach((rule) => {
  const [pair, value] = rule.split('->').map((side) => side.trim());
  rules.set(pair, value);
});


const increment = (input, key, amount = 1) => {
  const newValue = (input.get(key) || 0) + amount;
  if (newValue > 0) {
    input.set(key, newValue);
  } else {
    input.delete(key);
  }
}

const initialElementCounts = new Map();
const initialPairCounts = new Map();
for (let i=0; i<template.length - 1; i++) {
  const pair = template.substring(i, i+2);
  increment(initialPairCounts, pair);
}
template.split('').forEach((element) => {
  increment(initialElementCounts, element);
});

const step = ({ pairCounts: _pairCounts, elementCounts }) => {
  const pairCounts = new Map(_pairCounts);
  const newPairCounts = new Map();
  const newElementCounts = new Map(elementCounts);
  for (const [rule, toInsert] of rules) {
    const currentCount = pairCounts.get(rule) || 0;
    if (currentCount) {
      increment(newPairCounts, `${rule[0]}${toInsert}`, currentCount);
      increment(newPairCounts, `${toInsert}${rule[1]}`, currentCount);
      pairCounts.delete(rule);
      increment(newElementCounts, toInsert, currentCount);
    }
  }
  for (const [currentPair, count] of pairCounts) {
    increment(newPairCounts, currentPair, count);
  }
  return { pairCounts: newPairCounts, elementCounts: newElementCounts };
};

let result = { pairCounts: initialPairCounts, elementCounts: initialElementCounts };
for (let i=0; i<40; i++) {
  result = step(result);
}

console.log(Math.max(...result.elementCounts.values()) - Math.min(...result.elementCounts.values()));
