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

export default PersonForm