import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => {
  return <><h1>{text}</h1></>
}

const Button = ({text, handleClick}) => {
  return <><button onClick={handleClick}>{text}</button></>
}

const StatisticsLine = (props) => {
  return (<tr><td>{props.text}</td><td>{props.value}</td></tr>)
}

const Statistics = ({good, neutral, bad, total}) => {
  if (total === 0) return <p>No feedback given</p>
  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={total} />
        <StatisticsLine text="average" value={((good - bad) / total).toFixed(1)} />
        <StatisticsLine text="positive" value={(100 * good / total).toFixed(1) + '%'} />
    </tbody>
  </table>
  )
} 


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const increaseGood = () => {
    setGood(good + 1)
    setTotal(total + 1)
  }
  const increaseNeutral = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }
  const increaseBad = () => {
    setBad(bad + 1)
    setTotal(total + 1)
  }

  return (
    <div>
      <Header text="give feedback" />
      <Button text="good" handleClick={increaseGood} />
      <Button text="neutral" handleClick={increaseNeutral}/>
      <Button text="bad" handleClick={increaseBad}/>
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)