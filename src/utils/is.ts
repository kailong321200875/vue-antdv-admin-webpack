export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}

export const isWindow = (val: any): val is Window => {
  return typeof window !== 'undefined' && is(val, 'Window')
}

export function isString(val: unknown): val is string {
  return is(val, 'String')
}

export const isDef = <T = unknown>(val?: T): val is T => {
  return typeof val !== 'undefined'
}

export const isUnDef = <T = unknown>(val?: T): val is T => {
  return !isDef(val)
}

export const isFunction = (val: unknown): val is Function => typeof val === 'function'

export const isServer = typeof window === 'undefined'
