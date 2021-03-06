import React from 'react'
import ReactDOM from 'react-dom'


const Part = (props) => {

  return (
  <p>{props.part.name} {props.part.exercises}</p> )
}

const Header = (props) => {
  return  (<><h1>{props.course}</h1></>)
}

const Content = (props) => {

  return (
    <>      
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </>
    )
    
  }

  const Total = (props) => {
  
    return (
      <><p>Number of exercises {props.exercisesTotal}</p></>
    )
  }

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
  
  return (
    <div>
    <Header course={course} />
    <Content parts={parts} />
    <Total exercisesTotal={parts[0].exercises + parts[1].exercises + parts[2].exercises} />
    </div>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'))