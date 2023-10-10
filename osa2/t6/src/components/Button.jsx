const Button = ({value, person, onRemoveClick}) => {
    return <button value={person.id} type="button" onClick={onRemoveClick}>{value}</button>
  }
  
export default Button  