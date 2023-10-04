import { useState } from 'react'

const printResult = (result) => {   
  return result ? result : "Ei palautetta"
}

const StatisticLine = ({text,value}) => {
  return <p>{text} {value}</p>
}

const Statistics = ({good,neutral,bad,all,average,positive}) => {
  if (all < 1) return <p>No feeback given</p>
  return <>
    <StatisticLine text="good" value={good}/>
    <StatisticLine text="neutral" value={neutral}/>
    <StatisticLine text="bad" value={bad}/>
    <StatisticLine text="all" value={printResult(all)}/>
    <StatisticLine text="average" value={average}/>
    <StatisticLine text="positive" value={positive}/>
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

  return (
    <div>
      <h1>Feedback</h1>
      <Button value="Good" handleClick={() => setGood(good + 1)}/>
      <Button value="Neutral" handleClick={() => setNeutral(neutral + 1)}/>
      <Button value="Bad" handleClick={() => setBad(bad + 1)}/>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all()} average={average()} positive={positive()}/>
    </div>
  )
}

export default App