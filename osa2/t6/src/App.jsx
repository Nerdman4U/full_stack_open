import { useState, useEffect } from 'react'
import personService from './services/persons'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Button from './components/Button'
import Person from './components/Person'
import Persons from './components/Persons'
import { filterByName } from './functions'

const Notification = ({notification, notificationType}) => {
  //if (!notification) return
  //const className = `message ${notificationType}`
  const className = (notificationType) ? ["message",notificationType].join(" ") : ""
  return (
    <div id="notification" className={className}>{notification}</div>
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
  const [visible, setVisible] = useState(persons)
  const [notification, setNotification] = useState()
  const [notificationType, setNotificationType] = useState()

  // Set all persons and visible persons limited by filter.
  const showPersons = (_persons) => {
    console.log("App.showPersons() persons:", _persons)
    setPersons(_persons)
    console.log("App.showPersons() newFilter:", newFilter)
    setVisible(filterByName(_persons, newFilter))
  }

  const clearNotification = () => {
    setNotificationType()
    setNotification()
  }
  const showNotification = (msg) => {
    if (!msg) {
      clearNotification()
      return
    }
    setNotification(msg)
    setTimeout(() => {
      // TODO: If new notification is added while this
      // timeout is running it may not be shown.
      // clearNotification() is added to queue and will be
      // ran after callstack is clear.
      clearNotification()
    }, 3000)
  }

  useEffect(() => {
    personService._get().then((_persons) => {
      showPersons(_persons)
    })
  }, [])

  /* Methods to find people.
  =====================================================
  */
  const findPerson = (key, value) => {
    return persons.find((person) => person[key] == value )
  }
  const findPersonById = (_id) => {
    return findPerson("id", _id)
  }
  const findPersonByName = (name) => {
    return findPerson("name", name)
  }

  /* Event Handlers
  =====================================================
  */
  const handlePersonSubmit = (event) => {
    event.preventDefault();
    let person = findPersonByName(newName)
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
      console.log("handlePersonSubmit() person:", person)
      const changedPerson = { ...person, number:newNumber }
      console.log("handlePersonSubmit() changedPerson:", changedPerson)
      personService._put(changedPerson.id, changedPerson)
        .then((data) => {
          //console.log("data:", data)
          const new_persons = persons.map((person) => {
            console.log(person.id, changedPerson.id, person.id == changedPerson.id)
            return (person.id == changedPerson.id) ? data : person
          })
          console.log("New:", new_persons)
          setNotificationType("notification")
          showNotification(`Henkilön ${data.name} numero päivitetty.`)
          showPersons(new_persons)
        })
        .catch((error) => {
          console.log("error", error)
          setNotificationType("error")
          showNotification("Virhe henkilön tietoja päivitettäessä!")
        })
      return
    }

    // create/post
    person = {name:newName, number:newNumber}
    personService._post(person).then(data => {
      console.log("personService._post() data:", data)
      setNotificationType("notification")
      showNotification(`Lisätty ${data.name}`)
      const result = persons.concat(data)
      showPersons(result)
    })
    .catch((error) => {
      setNotificationType("error")
      showNotification("Virhe henkilön lisäyksessä!")
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
      setNewFilter('');
      setVisible(persons)
      return;
    }  
    setNewFilter(event.target.value);
    setVisible(filterByName(persons, event.target.value))
    console.log("App.handleFilterChange() newFilter:", event.target.value)
  }

  const handleRemoveClick = (event) => {
    if (!window.confirm("Poistetaanko?")) return
    console.log("Remove, button:", event.target.value)
    const _id = event.target.value;
    const person = findPersonById(_id)
    if (!_id) { console.log("No id"); return }
    if (!person) { console.log("No person"); return }
    personService._delete(_id).then(data => {
      // Get data from server after delete.
      // loadPersons()
      // console.log("filter:", persons.filter((person) => person.id != _id))     
      setNotificationType("notification")
      showNotification(`Henkilö ${person.name} poistettu.`)
      showPersons(persons.filter((person) => person.id != _id))
    }).catch(error => {
      setNotificationType("error")
      showNotification("Virhe henkilöä poistettaessa!")
    })
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification} notificationType={notificationType}/>

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
