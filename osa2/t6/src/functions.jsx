/* 
  Generic methods
  
  Can be used from any component or module.
*/

/*
  _by()
  Function used as a filter callback.

  Params
    value :: value is used to match name.

  Returns 
    a search function with regexp.
*/
const _match = (value, _type) => {
  ["name","number"].find((valid) => {
    return valid === _type
  })
  const regexp = new RegExp(value,"i")
  return (obj) => obj[_type].match(regexp)
} 
const byName = (value) => _match(value,"name")
const byNumber = (value) => _match(value,"number")

/*
  filterByName()
  Find all array values with matching value.

  Params
    arr :: array of persons.
    value :: name of a person.

  Returns 
    an initial array if no value, else filtered new 
    array.
*/
function filterByName(arr, value) {
  return (!value) ? arr : arr.filter(byName(value))
}
  
export { filterByName }



