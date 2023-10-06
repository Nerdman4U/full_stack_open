import { useState } from 'react'

/* 
  filter_stuff() 

  People array does not update instantly and visible people will have old data
  after adding new person. By delivering array explicitely it is possible
  to filter new array instantly and have correct visible list of people.

  Moved to be global method because it does have any connection to components or objects. 

  Written as old school function just to try that it works.
*/
function filter_stuff(arr, value) {
  const regexp = new RegExp(value,"i")
  return arr.filter((person) => person.name.match(regexp))
}

/* 
  Components 
  Filter
  PersonForm
  People (phonebook list)
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
const People = ({people}) => {
  return (
    <table>
      <tbody>
        { people.map((person) =>
          <tr key={person.name + Math.random()}><td>{person.name}</td><td>{person.number}</td></tr>
        )}
      </tbody>
    </table>
  )
}

/* Main component. */
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
  const [newFilter, setNewFilter] = useState('')
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
    const result = people.concat({name:newName, number:newNumber})
    result.reverse()
    setPeople(result)
    console.log("App.addPerson() newFilter:", newFilter)

    /* TODO: setPeople() updates people- asynchronically. People have old data and setVisible()
    will filter old array =>
    >> setVisible(filter_stuff(newFilter)) 
    => New person added is NOT in people array. It seems, it must be given explicitely...
    => How to make work without passing parameters?
    */
    setVisible(filter_stuff(result, newFilter))
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    // Show all people when filter is empty.
    if (!event.target.value) {
      setVisible(people)
      return;
    }  
    setNewFilter(event.target.value);  
    setVisible(filter_stuff(people, event.target.value))
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

      <h2>People</h2>
      <People people={visible} />
    </div>
  )

}

export default App