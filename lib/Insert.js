export default function insert(element, array) {
  array.push(element);
  array.sort((a, b) => a.l - b.l);
  return array;
}