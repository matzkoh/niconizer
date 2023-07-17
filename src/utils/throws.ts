export function throws(error: unknown): never {
  if (typeof error === 'string') {
    throw new TypeError(error)
  }

  throw error
}
