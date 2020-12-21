import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import personService from './services/Persons'
import './App.css'

const App = () => {

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState(0)
  const [ nameFilter, setNameFilter ] = useState('')
  const [ persons, setPersons ] = useState([])
  const [ successMessage, setSuccessMessage ] = useState(null)
  const [ notificationStyle, setNotificationStyle ] = useState({})
  const updateSuccessMessage = (msg, style) => {
    setNotificationStyle(style)
    setSuccessMessage(msg)       
    setTimeout(() => {
    setSuccessMessage(null)
    } ,5000)
  }
  const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
   

  useEffect(() => {
    personService
      .getAll()
      .then(response => setPersons(response))
  }, [])

  const addNumber = (event) => {
    event.preventDefault()
    const tempPerson = 
    { 
      name: newName,
      number: newNumber
    }
    const foundPerson = persons.find(person => person.name === newName)
    if (typeof foundPerson !== 'undefined') {
      if (window.confirm(`${newName} is already in the phonebook. Update phonenumber?`)) {
        const id = foundPerson.id
        const updatedPerson = { ...foundPerson, number: newNumber }
        personService.updatePerson(tempPerson, id)
        .then(updateSuccessMessage(`${tempPerson.name} succesfully updated!`, successStyle))
        .catch(error => {
          updateSuccessMessage(`Person ${tempPerson.name} has already been removed`, errorStyle)
        })
        setPersons(persons.map(p => p.id !== updatedPerson.id ? p : updatedPerson))
      
      }
    }
      else {

      personService.create(tempPerson)
        .then((response) => setPersons(persons.concat(response)))
        .then(updateSuccessMessage(`${tempPerson.name} succesfully added!`, successStyle))
    }      
    setNewName('')
    setNewNumber('')
  }

  const handleDeleteClickOf = personKey => {
    personService.deletePerson(personKey)
    .then(updateSuccessMessage(`Entry ${personKey} succesfully deleted.`, successStyle))
    setPersons(persons.filter(person => person.id !== personKey))
    
  }
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNameFilter(event.target.value)
  const filterShownNumbers = person => person.name.toLowerCase().startsWith(nameFilter.toLowerCase())

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} notificationStyle={notificationStyle} />
      <Filter     addNumber={addNumber} 
                  nameFilter={nameFilter} 
                  handleFilterChange={handleFilterChange} 
      />
      <h2>add a new</h2>
      <PersonForm addNumber={addNumber} 
                  newName={newName} 
                  newNumber={newNumber} 
                  handleNameChange={handleNameChange} 
                  handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <PersonList filterShownNumbers={filterShownNumbers}
                  persons={persons}
                  handleDeleteClickOf={handleDeleteClickOf}
      />
 </div>
  )

}
const Filter = ({addNumber, nameFilter, handleFilterChange}) => {
  return (
    <form onSubmit={addNumber} >
    <div>
      filter shown with: <input value={nameFilter} onChange={handleFilterChange} />
    </div>
  </form>
  )
}

const PersonList = ({filterShownNumbers, persons, handleDeleteClickOf}) => {
  return (
    <ul>
    {persons.filter(filterShownNumbers).map(p => <li key={p.id}>{p.name} {p.number} <button onClick={() => handleDeleteClickOf(p.id)}>delete</button></li>)}
    </ul>
  )
}

const Notification = ({ message, notificationStyle }) => {
  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle} className="notification">
      {message}
    </div>
  )
}

export default App
