import { useState } from 'react'

const People = ({people}) => {
  return people.map((person) => { 
     // EI TOIMI (?): return <tr key={person.name + Date.now()}><td>{person.name}</td></tr> 
     return <tr key={person.name + Math.random()}><td>{person.name}</td><td>{person.number}</td></tr>
  })
}

const App = () => {
  const [people, setPeople] = useState([
    { name: 'Arto Hellas', 'number': 123 },
    { name: 'Arto Hellas 2', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('Gimme your name')
  const [newNumber, setNewNumber] = useState('...and phone number')
  const [visible, setVisible] = useState(people);

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
    console.log("addName()", newName, hasName(newName))
    if (hasName()) {
      alert(`\"${newName}\" exists!`)
      return
    }
    if (!hasNumber()) {
      console.log(newNumber)
      alert("Missing number!")
      return
    }
    const result = people.concat({name:newName, number:newNumber})
    result.reverse()
    setPeople(result)
    setVisible(result)
  }

  /*
  Input onChange handlers.
  ============================================
  */
  const inputName = (event) => {
    setNewName(event.target.value)
  }
  const inputNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const doFilter = (regexp) => people.filter((person) => person.name.match(regexp))
  const inputFilter = (event) => {
    // Show all people when filter is empty.
    if (!event.target.value) {
      setVisible(people)
      return;
    }
    const result = doFilter(new RegExp(event.target.value,"i"))
    setVisible(result)
  }

  return (
    <div>
      <h2>Phonebook</h2>
    <h2>Filter</h2>
      { /* Filter shown with <input value={newFilter} onChange={inputFilter}/> */ }
      Filter shown with <input onChange={inputFilter}/>

      <h2>Add new</h2>
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

      <h2>People</h2>
      <table>
        <tbody>
          <People people={visible} />
        </tbody>
      </table>
    </div>
  )

}

export default App