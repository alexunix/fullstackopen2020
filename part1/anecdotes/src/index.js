import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";

const randomIndex = (array) => Math.floor(array.length * Math.random())

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [mostVoted, setMostVoted] = useState(0)
  const [disabled, setDisabled] = useState(false)
  const [votes, setVotes] = useState({...anecdotes.map(x => 0)})

  const vote = () => {
    const anecdoteVotes = votes[selected] + 1
    if (anecdoteVotes >= votes[mostVoted]) setMostVoted(selected)
    setDisabled(true)
    setVotes({...votes, [selected]: anecdoteVotes})
  }

  const nextAnecdote = () => {
    setDisabled(false)
    let nextIndex  = randomIndex(anecdotes)
    while (selected === nextIndex) {
          console.warn('same random value')
          nextIndex = randomIndex(anecdotes)
    }
    setSelected(nextIndex)
  }

  useEffect(() => setSelected(randomIndex(anecdotes)), [])

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>{(votes[selected]) ? `has ${votes[selected]} votes`: 'has no votes'}</p>
      <button disabled={disabled} onClick={vote}>vote</button>
      <button onClick={nextAnecdote}>next anecdote</button>
      {(votes[mostVoted] > 0) &&
        <>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[mostVoted]}</p>
        <p>with {votes[mostVoted]} votes</p>
        </>
      }

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

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
