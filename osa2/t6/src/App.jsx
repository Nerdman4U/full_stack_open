import { useState, useEffect } from 'react'
import personService from './services/persons'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Button from './components/Button'
import Person from './components/Person'
import Persons from './components/Persons'
import { filterByName } from './functions'

/* Main component.
=====================================================
*/
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('Gimme your name')
  const [newNumber, setNewNumber] = useState('...and phone number')
  const [newFilter, setNewFilter] = useState('')
  const [visible, setVisible] = useState(persons);

  // Set all persons and visible persons limited by filter.
  const showPersons = (_persons) => {
    console.log("showPersons() persons:", _persons)
    setPersons(_persons)
    setVisible(filterByName(_persons, newFilter))
  }

  useEffect(() => {
    personService._get().then((_persons) => {
      showPersons(_persons)
    })
  }, [])

  const findPerson = (name) => {
    return persons.find((person) => person.name === name )
  }

  /* Event Handlers
  =====================================================
  */
  const handlePersonSubmit = (event) => {
    event.preventDefault();
    let person = findPerson(newName)
    //console.log("handlePersonSubmit() person:", person, "newName:", newName)
    if (!newName || !newNumber) { 
      alert(`Lisää nimi ja numero.`)
      return
    }
    if (person) {
      if (!newNumber) {
        alert(`Henkilö ${newName} on jo olemassa.`)
        return
      }
      if (!confirm(`Numero on jo olemassa, päivitetäänkö ${newName}?`)) {
        return
      }
      //console.log("handlePersonSubmit() person:", person)
      const changedPerson = { ...person, number:newNumber }
      personService._put(changedPerson.id, changedPerson)
        .then((data) => {
          //console.log("data:", data)
          const new_persons = persons.map((person) => {
            return (person.id == changedPerson.id) ? data : person
          })
          //console.log("New:", new_persons)
          showPersons(new_persons)
        })
      return
    }

    // create/post
    person = {name:newName, number:newNumber}
    personService._post(person).then(data => {
      console.log("personService._post() data:", data)
      const result = persons.concat(data)
      showPersons(result)
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
    setVisible(filterByName(persons, event.target.value))
  }

  const handleRemoveClick = (event) => {
    if (!window.confirm("Poistetaanko?")) return
    console.log("Remove, button:", event.target.value)
    const _id = event.target.value;
    if (!_id) { console.log("No id"); return }
    personService._delete(_id).then(data => {
      // Get data from server after delete.
      // loadPersons()
      // console.log("filter:", persons.filter((person) => person.id != _id))     
      showPersons(persons.filter((person) => person.id != _id))
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
