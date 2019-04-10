export interface Data { [index: string]: string }

export function isData(data: Data): data is Data {
  return Object.keys(data).every((key): boolean => typeof key === 'string');
}
