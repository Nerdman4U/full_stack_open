onmessage = (event) => {
    console.log("worker.onmessage()")
    const result = event.data
    if (!result) {return}
    for(let i=0; i<9999; i++) {
      console.log("for i:", i)
      continue
    }
    postMessage(event.data * 2)
}







