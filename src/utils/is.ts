export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}

export const isWindow = (val: any): val is Window => {
  return typeof window !== 'undefined' && is(val, 'Window')
}

export function isString(val: unknown): val is string {
  return is(val, 'String')
}
