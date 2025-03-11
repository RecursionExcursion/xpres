export function pipe<T>(...fns: Array<(t: T) => T>) {
  return function (x: T) {
    return fns.reduce((v, f) => f(v), x);
  };
}

export function asyncPipe<T>(...fns: Array<(t: T) => T | Promise<T>>) {
  return async function (x: T): Promise<T> {
    let result = x; 
    for (const fn of fns) {
      result = await fn(result); 
    }
    return result;
  };
}