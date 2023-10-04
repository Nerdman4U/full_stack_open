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
  let parts = props.parts    
  return <p>Number of exercises {parts.reduce((sum,part) => {return sum + part.exercises},0)}</p>
} 

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App