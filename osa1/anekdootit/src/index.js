import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, clickHandler}) => {
  return(
    <><button onClick={clickHandler}>{text}</button></>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(getRndInteger(0, anecdotes.length))
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
  const [currPoints, setCurrPoints] = useState(0)

  const nextClickHandler = () => {
    let rnd = selected
    while (rnd === selected) rnd = getRndInteger(0, anecdotes.length)
    setSelected(rnd)
    setCurrPoints(points[rnd])
  }

  const voteClickHandler = () => {
    let tmp = points
    let newVal = tmp[selected] + 1
    tmp[selected] = newVal
    setPoints(tmp)
    setCurrPoints(newVal)
  }


  return (
    <div>
      <h1>Anecdote of the day</h1>
      <h4>{props.anecdotes[selected]} <br/> has {currPoints} votes</h4>
      <Button text="vote" votes={props.votes}clickHandler={voteClickHandler} />
      <Button text="next anecdote" clickHandler={nextClickHandler} /> 
      <h1>Anecdote with most votes</h1>
      <h4>{props.anecdotes[points.indexOf(Math.max(...points))]}</h4>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min) ) + min;
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)