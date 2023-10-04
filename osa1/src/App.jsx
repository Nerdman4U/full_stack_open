const App = () => {

  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  const Header = (props) => {
    return <h1>{props.course}</h1>
  }    

  const Part = (props) => {
    return <p>{props.part.name} {props.part.exercises}</p>
  }
  
  const Content = (props) => {
    return ( 
      props.parts.map((part,index) => 
      <Part key={index} part={part} />
      // <Part name={part.name} exercises={part.exercises} />
    ))
  }
  
  const Total = (props) => {
    return <p>Number of exercises {props.total}</p>
  } 

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total total={parts.reduce((sum,part) => {return sum + part.exercises},0)} />
    </div>
  )
}

export default App