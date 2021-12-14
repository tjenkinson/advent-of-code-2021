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

const step = (input) => {
  let output = '';
  for (let i=0; i<input.length - 1; i++) {
    const inputPair = input.substring(i, i+2);
    const toInsert = rules.get(inputPair) || '';
    output += [inputPair[0], toInsert].join('');
  }
  output += input[input.length - 1];
  return output;
};

let result = template;
for (let i=0; i<10; i++) {
  result = step(result);
}

const elementCounts = new Map();
result.split('').forEach((element) => {
  elementCounts.set(element, (elementCounts.get(element) || 0) + 1);
});

console.log(Math.max(...elementCounts.values()) - Math.min(...elementCounts.values()));
