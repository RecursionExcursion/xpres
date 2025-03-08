export function pipe<T>(...fns: Array<(t: T) => T>) {
  return function (x: T) {
    return fns.reduce((v, f) => f(v), x);
  };
}
