/*

  Yleisiä huomioita:

  1) Tulee mahdollisesti kaksi renderöintiä jostain syystä.
  => Kohdassa // console.log("renderöityy kaksi kertaa")
  => Johtuu tilan päivittymisestä... kun data on haettu ja persons- päivitetään
  app- komponentti tulostetaan uudelleen.

*/

import { useState, useEffect } from 'react'
import personService from './services/persons'
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

const Button = ({value, person, onRemoveClick}) => {
  return <button value={person.id} type="button" onClick={onRemoveClick}>{value}</button>
}

const Person = ({person, handleRemoveClick}) => {
  return <tr>
    <td>{person.name}</td>
    <td>{person.number}</td>
    <td><Button value="Poista" person={person} onRemoveClick={handleRemoveClick}/></td>
  </tr>
}

const Persons = ({persons, handleRemoveClick}) => {
  return (
    <table>
      <tbody>
        {
          persons.map((person) => {
            return <Person key={person.id} person={person} handleRemoveClick={handleRemoveClick}/>
          })
        }
      </tbody>
    </table>
  )
}


/* Main component.
=====================================================
*/
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('Gimme your name')
  const [newNumber, setNewNumber] = useState('...and phone number')
  const [newFilter, setNewFilter] = useState('')
  const [visible, setVisible] = useState(persons);

  //console.log("renderöityy kaksi kertaa")

  const loadPersons = () => {
    personService._get().then((persons) => {
      setPersons(persons)
      setVisible(doFilter(persons, newFilter))
    })
  }

  useEffect(() => {
    loadPersons()
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
    personService._post(person).then(data => {
      console.log("personService._post() data:", data)
      const result = persons.concat(data)
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

  const handleRemoveClick = (event) => {
    if (!window.confirm("Poistetaanko?")) return
    console.log("Remove, button:", event.target.value)
    const _id = event.target.value;
    if (!_id) { console.log("No id"); return }
    personService._delete(_id).then(data => {
      // Get data from server after delete.
      loadPersons()
    }).catch(error => {
      console.log("Error:", error)
    })
  }

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
      <Persons persons={visible} handleRemoveClick={handleRemoveClick} />
    </div>
  )
}

export default App
