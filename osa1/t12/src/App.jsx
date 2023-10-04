import { useState } from 'react'

import './App.css'

const Button = ({value, handler}) => {
  return <button onClick={handler}>{value}</button>
}

const Show = ({anecdote, handler, votecount}) => {
  return ( 
    <>
      <h1>{anecdote}</h1> 
      <p>Votes: {votecount}</p>
      <Button value="Vote" handler={handler}/>
    </>
  )
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
  const [votes, setVotes] = useState([0,0,0,0,0,0,0,0])

  const pickOne = () => {
    const pick = Math.floor(Math.random()*anecdotes.length)    
    return pick
  }

  // Button onClick handler to select anekdote.
  // TODO: maybe rename selectAnecdoteClick ...
  const handleClick = () => {
    setSelected(pickOne())
  }

  // Button onClick handler to vote anekdote.
  const voteClick = () => {
    // console.log("VoteClick()")
    if (!isSelected()) return false
    let result = votes.slice()
    result[selected] = result[selected] + 1
    // console.log(result)
    setVotes(result)
  }

  const isSelected = () => {
    if (selected < 0) return false
    if (selected >= anecdotes.length) return false;
    return true;
  }

  const showAnecdote = () => {
    console.log("selected", selected)
    if (!isSelected()) return "";
    let votecount = votes[selected];
    return <Show anecdote={anecdotes[selected]} handler={voteClick} votecount={votecount} />
  }

  return (
    <div>
      {showAnecdote()}
      <Button value="Paina niin näytän anekdootin" handler={handleClick}/>
    </div>
  )
}

export default App