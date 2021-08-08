import storage from 'good-storage'

interface CompareFunc<T> {
  (value: T, index: number, obj: T[]): unknown
}

function insertArray<T = any>(
  arr: any[],
  val: any,
  compare: CompareFunc<T>,
  maxLen?: number
) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

function deleteFromArray<T = any>(arr: any[], compare: CompareFunc<T>) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function save<T = any>(
  item: any,
  key: string,
  compare: CompareFunc<T>,
  maxLen?: number
) {
  const items = storage.get(key, [])
  insertArray(items, item, compare, maxLen)
  storage.set(key, items)
  return items
}

export function remove<T = any>(key: string, compare: CompareFunc<T>) {
  const items = storage.get(key, [])
  deleteFromArray(items, compare)
  storage.set(key, items)
  return items
}

export function load(key: string) {
  return storage.get(key, [])
}

export function clear(key: string) {
  storage.remove(key)
  return []
}

export function saveAll(items: any, key: string) {
  storage.set(key, items)
}
