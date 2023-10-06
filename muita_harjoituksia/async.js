/* 
    https://www.youtube.com/watch?v=8aGhZQkoFbQ 
*/

import "./styles.css";

[1,2,3,4].forEach(function(i) {console.log("sync, i:", i)})

function asyncForEach(array, cb) {
  console.log("fo2")
  array.forEach(function(i) {
      setTimeout(cb.bind(null,i),0)
  })
}

asyncForEach([1,2,3,4], function(i) { 
  console.log("async, i:", i) 
})

console.log("foo")

