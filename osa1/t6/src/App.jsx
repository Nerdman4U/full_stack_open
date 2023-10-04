import { useState } from 'react'

const Statistics = ({good,neutral,bad,all,average,positive}) => {
  return <>
    <p>good {good}</p>
    <p>neutral {neutral}</p>
    <p>bad {bad}</p>
    <p>all {all}</p>
    <p>average {average}</p>
    <p>positive {positive}</p>
  </>
}

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
  const positive = () => all() ? good / all() : 0
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
      <Statistics good={good} neutral={neutral} bad={bad} all={print(all)} average={average()} positive={positive()}/>
    </div>
  )
}

export default App