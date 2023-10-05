/* 
Courses
  Course
    Header
    Content
      Part
      Total

*/
const Courses = ({courses}) => {
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

  return courses.map((course) => {
    return <Course key={course.id} course={course}/>
  })

}

export default Courses