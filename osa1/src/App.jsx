const App = () => {

  const Header = (props) => {
    return <h1>{props.course}</h1>
  }    

  const Part = (props) => {
    return <p>{props.name} {props.exercises}</p>
  }
  
  const Content = (props) => {
    return ( 
      props.parts.map(part => (
      <Part key={part[0]} name={part[1]} exercises={part[2]} />
    )))
  }
  
  const Total = (props) => {
    return <p>Number of exercises {props.total}</p>
  } 

  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content parts={[
        [1, part1,exercises1],
        [2, part2,exercises2],
        [3, part3,exercises3]
        ]} 
      />
    {/*}      
      <Content parts={[{name:part1,exercises:exercises1}]} />
    */}
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App