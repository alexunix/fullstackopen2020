import React from 'react'
const Course = ({ course: { name, parts }, course}) => {
    return (
        <>
        <Header text={name}/>
        <Content parts={parts}/>
        <Total sum={parts.reduce((sum, part)=>sum+part.exercises, 0)}/>
        </>
    )
}

const Header = ({ text }) => <h3>{text}</h3>

const Total = ({ sum }) => <p><strong>Total of  {sum} exercises</strong></p>

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
      <br/>
    </p>    
  )
}

const Content = ({ parts }) => {
  return (
    <div>
        {parts.map(part => <Part key={part.id} part={part}/>)}
    </div>
  )
}

export default Course