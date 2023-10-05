import Courses from './components/courses'

const App = () => {

  const courses = [
    {
      id: "Course-0",
      name: "Full half stack training",
      parts: [
        {
          id: "full-half-0",
          name: "At full half",
          exercises: 1.5
        }
      ]
    },
    {
      id: "Course-1",
      name: "Full better half stack training",
      parts: [
        {
          id: "half-better-0",
          name: "At better half",
          exercises: 3.25
        }
      ]
    },
    {
      id: "Course-2",
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
  ]
  return (
    <div>
      <Courses courses={courses} />
    </div>
  )
}

export default App
