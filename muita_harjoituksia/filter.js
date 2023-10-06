// Filter harjoituksia

function filterSearch(search) {
  return function(value) {
    return value.match(new RegExp(search,"i"));
  }
}
  
function filter_stuff(arr, value) {
  return arr.filter(filterSearch(value));
}
  
const result = filter_stuff(["a","b"],"b")
console.log("result:", result)
  
  