import Button from './Button'

const Person = ({person, handleRemoveClick}) => {
    return <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td><Button value="Poista" person={person} onRemoveClick={handleRemoveClick}/></td>
    </tr>
  }

export default Person