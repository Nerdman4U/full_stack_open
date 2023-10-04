import { useState } from 'react'

const Button = ({handleClick, value}) => {
  return <button onClick={handleClick}>{value}</button>
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = () => good+neutral+bad  
  const average = () => good - bad
  const positive = () => good / all()
  const print = (m) => {
    const result = m() 
    return result ? result : "Ei palautetta"
  }

  return (
    <div>
      <h1>Feedback</h1>
      <Button value="Good" handleClick={() => setGood(good + 1)}/>
      <Button value="Neutral" handleClick={() => setNeutral(neutral + 1)}/>
      <Button value="Bad" handleClick={() => setBad(bad + 1)}/>
      <h1>Statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {print(all)}</p>
      <p>average {print(average)}</p>
      <p>positive {print(positive)}</p>
    </div>
  )
}

export default App