/* 
  Course
    Header
    Content
      Part
      Total

*/
const Course = ({course}) => {
  const Header = ({course_name}) => {
    return <h1>{course_name}</h1>
  }

  /* 
  Content
  Component has full course data. Course name may be needed
  at content as well as header.
  */
  const Content = ({course}) => {
    const parts = course.parts
    const Part = ({part}) => {
      return <p key={part}>{part.name} {part.exercises}</p>
    }

    // Tehtävä 2.3*
    const Total = ({parts}) => {            
      return <p>Number of exercises {parts.reduce((sum, part) => { return sum + part.exercises }, 0)}</p>
    }

    // Total amount of exercises is printed here.
    return parts.map((part) => { 
      return  <Part key={part.id} part={part} />
    }).concat(<Total key="total" parts={parts}/>)
  }

  return ( 
    <>
      <Header course_name={course.name} /> 
      <Content course={course}/>
    </>
  )
}

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        id: 0,
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        id: 1,
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        id: 2,
        name: 'State of a component',
        exercises: 14
      },
      { 
        id: 3,
        name: "foo", exercises: 123 
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App
