import { useState, useEffect } from 'react'
import axios from 'axios'

/* 
  doFilter() 

  Persons array does not update instantly and visible persons will have old data
  after adding new person. By delivering array explicitely it is possible
  to filter new array instantly and have correct visible list of persons.

  Moved to be global method because it does have any connection to components or objects. 
  =====================================================
*/

const isFound = (value) => {
  const regexp = new RegExp(value,"i")
  return (person) => person.name.match(regexp)
} 
function doFilter(arr, value) {
  return (!value) ? arr : arr.filter(isFound(value))
}

/* 
  Components:
  Filter
  PersonForm
  Persons (phonebook list)
  =====================================================
*/
const Filter = ({onFilterChange}) =>
  <>Filter shown with <input onChange={onFilterChange}/></>

const PersonForm = ({onPersonSubmit,newName,newNumber,onNameChange,onNumberChange}) => {
  return (
  <form onSubmit={onPersonSubmit}>
    <table>
      <tbody>
      <tr><td>name: </td><td><input value={newName} onChange={onNameChange}/></td></tr>
      <tr><td>number: </td><td><input value={newNumber} onChange={onNumberChange}/></td></tr>
      </tbody>
    </table>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

/*
  TODO: Unique key warning exists when concanate name and Date.now(). Random number works.
  => Ei toimi kun painaa nappia nopeasti: return <tr key={person.name + Date.now()}><td>{person.name}</td></tr> 
*/
const Persons = ({persons}) => {
  return (
    <table>
      <tbody>
        { persons.map((person) =>
          <tr key={person.name + Math.random()}><td>{person.name}</td><td>{person.number}</td></tr>
        )}
      </tbody>
    </table>
  )
}

/* Main component.

    { name: 'Arto Hellas', 'number': 123 },
    { name: 'Arto Hellas 2', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  =====================================================
*/
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('Gimme your name')
  const [newNumber, setNewNumber] = useState('...and phone number')
  const [newFilter, setNewFilter] = useState('')
  const [visible, setVisible] = useState(persons);

  useEffect(() => {
    console.log("useEffect callback")
    axios
      .get('http://localhost:3001/db')
      .then((response) => {
        //console.log("axios, callback, response:", response.data.persons)
        setPersons(response.data.persons)
        //setVisible(response.data.persons)
        setVisible(doFilter(response.data.persons, newFilter))
      })
  }, [])

  /*
  Verify given values
  =====================================================
  */
  const hasName = () => {
    return persons.some((person) => person.name === newName)
  }
  const hasNumber = () => {
    if (!newNumber) return false;
    return true;
  }

  /* Event Handlers
  =====================================================
  */
  const handlePersonSubmit = (event) => {
    event.preventDefault();
    console.log("App.addPerson() newName:", newName, "hasName():", hasName(newName))
    if (hasName()) {
      alert(`\"${newName}\" exists!`)
      return
    }
    if (!hasNumber()) {
      console.log(newNumber)
      alert("Missing number!")
      return
    }

    const person = {name:newName, number:newNumber}
    /*
    const result = persons.concat({name:newName, number:newNumber})
    result.reverse()
    setPersons(result)
    console.log("App.addPerson() newFilter:", newFilter)
    */  
  
    /* TODO: setPersons() updates persons- asynchronically. Persons have old data and setVisible()
    will filter old array =>
    >> setVisible(doFilter(newFilter)) 
    => New person added is NOT in persons array. It seems, it must be given explicitely...
    => How to make work without passing parameters?
    */

    //setVisible(doFilter(result, newFilter))

    axios
      .post('http://localhost:3001/persons', person)
      .then(response => {
        const result = persons.concat(response.data)
        setPersons(result)
        setVisible(doFilter(result, newFilter))
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    // Show all persons when filter is empty.
    if (!event.target.value) {
      setVisible(persons)
      return;
    }  
    setNewFilter(event.target.value);  
    setVisible(doFilter(persons, event.target.value))
  }
  /*
  =====================================================
  */

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Filter</h2>
      <Filter onFilterChange={handleFilterChange}/>

      <h2>Add new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onPersonSubmit={handlePersonSubmit}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />

      <h2>Persons</h2>
      <Persons persons={visible} />
    </div>
  )

}

export default App