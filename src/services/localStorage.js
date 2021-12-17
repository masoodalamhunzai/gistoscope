/**
 * Get an Item from Localstorage
 * @param {*} key string
 * @returns void
 */
export const getItemFromLocalStorages = key => {
  return JSON.parse(localStorage.getItem(key))
}

/**
 * save an item in Localstorage
 * @param {*} key string
 * @param {*} value string | number | Boolean | Array | Object
 * @returns void
 */
export const saveItemToLocalStorage = (key, value) => {
  if (typeof value === 'string') {
    return localStorage.setItem(key, value)
  } else {
    return localStorage.setItem(key, JSON.stringify(value))
  }
}

/**
 * Delete Item from Localstorage
 * @param {*} key string
 */
export const deleteItemFromLocalStorage = key => {
  localStorage.removeItem(key)
}
