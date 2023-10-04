import { useState } from 'react'

import './App.css'

const Button = ({value, handler}) => {
  return <button onClick={handler}>{value}</button>
}

const Show = ({value}) => {
  return <h1>{value}</h1>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(-1)

  const pickOne = () => {
    const pick = Math.floor(Math.random()*anecdotes.length)    
    return pick
  }

  const handleClick = () => {
    setSelected(pickOne())
  }

  const getAnecdote = () => {
    console.log("selected", selected)
    if (selected < 0) return ""
    if (selected >= anecdotes.length) return ""
    return anecdotes[selected]
  }

  return (
    <div>
      <Show value={getAnecdote()}/>
      <Button value="Paina niin näytän anekdootin" handler={handleClick}/>
    </div>
  )
}

export default App