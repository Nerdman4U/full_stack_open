import Person from './Person'

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
  
export default Persons