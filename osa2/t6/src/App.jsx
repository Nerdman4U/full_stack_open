import { useState } from 'react'

const Content = ({people}) => {
  return people.map((person) => { 
     // EI TOIMI (?): return <tr key={person.name + Date.now()}><td>{person.name}</td></tr> 
     return <tr key={person.name + Math.random()}><td>{person.name}</td></tr> 
  })
}

const App = () => {
  const [people, setPeople] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('Gimme your name')

  const verifyName = (name) => {
    // console.log("VerifyName() name:", name,
    //   people.some((person) => person.name === name)
    // )
    return people.some((person) => person.name === name)
  }

  const addName = (event) => {
    event.preventDefault();
    // console.log("addName()", newName, verifyName(newName))
    if (verifyName(newName)) { 
      alert(`\"${newName}\" exists!`)
      return
    }
    setPeople(people.concat({name:newName}))
  }

  const inputHandler = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={inputHandler}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <table>
        <tbody>
          <Content people={people} />
        </tbody>
      </table>
    </div>
  )

}

export default App