const isBool = (bool: unknown): bool is boolean => {
  return typeof bool === 'boolean' || bool instanceof Boolean
}

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

const isNumber = (num: unknown): num is number => {
  return typeof num === 'number' || num instanceof Number
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

export const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing string property')
  }

  return text
}

export const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date)
  }
  return date
}

export const parseNumber = (num: unknown): number => {
  if (!num || !isNumber(num)) {
    throw new Error('Incorrect or missing number property')
  }
  return num
}

export const parseBool = (bool: unknown): boolean => {
  console.log('object at newSeasonEntry', bool)
  if (!isBool(bool)) {
    throw new Error('Incorrect or missing boolean property')
  }
  return bool
}

export const parseLatLong = (
  object: unknown,
  prop: string
): number | undefined => {
  if (!object) {
    return
  }
  if (typeof object !== 'object') {
    throw new Error('Incorrect object property')
  }
  if (
    ('lat' in object && !('long' in object)) ||
    ('long' in object && !('lat' in object))
  ) {
    throw new Error('Incorrect lat and long object')
  } else if ('lat' in object && 'long' in object && prop === 'lat') {
    return parseNumber(object.lat)
  } else if ('lat' in object && 'long' in object && prop === 'long') {
    return parseNumber(object.long)
  }
}

export const parseWomen = (object: unknown): boolean => {
  if (!object) {
    return false
  }
  if (typeof object !== 'object') {
    throw new Error('Incorrect object property')
  }
  if ('women' in object) return parseBool(object.women)
  return false
}

export const parseStringedSeasonstructure = (
  object: unknown
): string | undefined => {
  if (!object) {
    return undefined
  }
  if (typeof object !== 'object') {
    throw new Error('Incorrect object property')
  }
  if ('seasonStructure' in object) return parseString(object.seasonStructure)
  return undefined
}
