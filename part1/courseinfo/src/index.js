import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) => <h1>{course}</h1>

const Content = ({parts}) => {
  return (
    <>
    {parts.map(part => 
        <Part name={part.name} exercises={part.exercises} />
    )}
    </>
  )
}

const Part = ({name, exercises}) => <p>{name} {exercises}</p>

const Total = ({parts}) => <p>Number of exercises {parts.reduce((acc,value) => acc + value.exercises, 0)}</p>

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

  const {name, parts} = course

  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total parts={parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))