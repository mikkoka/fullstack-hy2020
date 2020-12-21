
const Part = (props) => {

    return (
    <p>{props.part.name} {props.part.exercises}</p> )
  }
  
const Header = (props) => {
    return  (<><h1>{props.name}</h1></>)
}
  
const Content = ({parts}) => {

    return (
      <>
        {parts.map(p => <Part part={p}/>)}      
      </>
      )      
}
  
const Total = (props) => {
    
      return (
        <><h4>Total of {props.exercisesTotal} exercises </h4></>
      )
}

const Course = ({course}) => {

    return (
        <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total exercisesTotal={course.parts.reduce((s, p) => s+= p.exercises, 0 )}/>
        </div>
        )

}

export default Course

        {/* <Part part={props.parts[1]} />
        <Part part={props.parts[2]} /> */}


  