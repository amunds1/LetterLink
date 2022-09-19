## Board representation

```
board = [
  ['A', 'B', 'C'],
  ['A', 'B', 'C'],
  ['A', 'B', 'C']
]
```

## Points representation

```
rowPoints = [0, 10, 3, 4, 2]
colPoints = [0, 3, 2, 0, 10]
```

## Search for word

Optimizations:

1. Only check for valid words in the affected row and column.
2. Only check for valid words after the letter change. For instance, if the player changes WATER to WATAR on the board, do not check WA, because this is not changed.
3. Hashmap (stored either in localStorage or Firebase) of previously checked words, which can be queried first

```
boardPrev = [
  ['A', 'B', 'C'],
  ['A', 'B', 'C'],
  ['A', 'B', 'C']
]

boardNext = [
  ['A', 'B', 'C'],
  ['A', 'B', 'C'],
  ['A', 'B', 'C']
]
```
