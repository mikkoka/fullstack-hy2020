const PersonForm = ({addNumber, newName, newNumber, handleNameChange, handleNumberChange}) => {
    return (
      <form onSubmit={addNumber} >
      <div>
        name: <input 
          value={newName} 
          onChange={handleNameChange} />
      </div>
      <div>
        number: <input 
          value={newNumber === 0 ? '' : newNumber} 
          onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    ) 
  }

  export default PersonForm