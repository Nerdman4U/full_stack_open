import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Number = ({count, onNumberChange}) => {
  console.log("Number")
  return <input value={count} onChange={onNumberChange}/>
}

const App = () => {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState("")

  const handleNumberChange = (event) => {
    console.log("app, posting message...")
    myWorker.postMessage(event.target.value)
    console.log("app, message posted...")
    setCount(event.target.value)
  }

  // do something asynchronically
  //if (window.Worker) {
    console.log("worker 1")
    const myWorker = new Worker("worker.js")
    console.log("worker 2", myWorker)

    myWorker.onmessage = (event) => {
      console.log("app.onmessage", event)
      setMessage(event.data)
    }
    myWorker.onerror = (event) => {
      console.log("app.onerror", event)
    }
    console.log("app 1, myWorker:", myWorker)
  //}
  console.log("app 2, myWorker:", myWorker)

  return (
    <>
      <div>
        <h1>{message}</h1>
        <Number count={count} onNumberChange={handleNumberChange}/>
      </div>
    </>
  )
}

export default App
