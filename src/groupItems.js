function groupBy(items, n) {
  const count = Math.ceil(items.length / n);
  const groups = Array(count);
  for (let index = 0; index < count; index++) {
    groups[index] = items.slice(index * n, index * n + n);
  }
  return groups;
}

export default groupBy;
