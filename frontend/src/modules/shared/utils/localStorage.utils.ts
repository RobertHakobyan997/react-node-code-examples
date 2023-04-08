export const getStorageData = (key: string, defaultValue: any = null) => {
  const saved = localStorage.getItem(key)
  const initial = saved && JSON.parse(saved)
  return initial || defaultValue
}

export const saveStorageData = (key: string, data: any) => {
  return localStorage.setItem(key, JSON.stringify(data))
}

export const deleteStorageData = (key: string) => {
  return localStorage.removeItem(key)
}
