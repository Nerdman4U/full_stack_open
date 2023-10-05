import { useState } from 'react'

const Content = ({people}) => {
  return people.map((person) => { 
     // EI TOIMI (?): return <tr key={person.name + Date.now()}><td>{person.name}</td></tr> 
     return <tr key={person.name + Math.random()}><td>{person.name}</td><td>{person.number}</td></tr>
  })
}

const App = () => {
  const [people, setPeople] = useState([
    { name: 'Arto Hellas', 'number': 123 }
  ]) 
  const [newName, setNewName] = useState('Gimme your name')
  const [newNumber, setNewNumber] = useState('...and phone number')

  /*
  Verify given values
  ============================================
  */
  const hasName = () => {
    return people.some((person) => person.name === newName)
  }
  const hasNumber = () => {
    if (!newNumber) return false;
    return true;
  }

  /*
  Add person.
  ============================================
  */
  const addPerson = (event) => {
    event.preventDefault();
    // console.log("addName()", newName, verifyName(newName))
    if (hasName()) {
      alert(`\"${newName}\" exists!`)
      return
    }
    if (!hasNumber()) {
      console.log(newNumber)
      alert("Missing number!")
      return
    }
    setPeople(people.concat({name:newName, number:newNumber}))
  }

  /*
  Input onChange handlers.
  ============================================
  */
  const inputName = (event) => {
    setNewName(event.target.value)
  }
  const inputNumber = (event) => {
    console.log("inputNumber() value:", event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <table>
          <tbody>
          <tr><td>name: </td><td><input value={newName} onChange={inputName}/></td></tr>
          <tr><td>number: </td><td><input value={newNumber} onChange={inputNumber}/></td></tr>
          </tbody>
        </table>
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