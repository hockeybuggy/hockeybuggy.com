/* intersperse: Return an array with the separator interspersed between
 * each element of the input array.
 *
 * > _([1,2,3]).intersperse(0)
 * [1,0,2,0,3]
 *
 * Borrowed lightly fron: https://stackoverflow.com/a/23619085/1745922
 */
export function intersperse<X, Y>(arr: Array<X>, sep: Y): Array<X | Y> {
  const result: Array<X | Y> = [];
  if (arr.length === 0) {
    return result;
  }

  result.push(arr[0]);
  return arr.slice(1).reduce(function (xs, x) {
    return xs.concat([sep, x]);
  }, result);
}
