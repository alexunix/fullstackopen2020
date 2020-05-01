import React, {useState} from "react";
import ReactDOM from "react-dom";

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Statistic = ({text, value}) => <tr><td>{`${text}:`}</td><td>{value}</td></tr>

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const total = bad + good + neutral
    const average = [...[...Array(bad).keys()].map(v => -1), ...[...Array(neutral).keys()].map(v => 0), ...[...Array(good).keys()].map(v => 1)].reduce((a,b)=>a+b, 0) / total
    const positive = `${(good*100 / total).toFixed()} %`
    
    const handleClick = (feedbackType) => () => {
        switch (feedbackType) {
            case "good":
                setGood(good => good+1)
                console.log(good)
                break;
            case "neutral":
                setNeutral(neutral => neutral+1)
                break;
            case "bad":
                setBad(bad => bad+1)
                break;
            default:
                break;
        }
    }


    return (
      <div>
          <h1>Give feedback</h1>
          <Button text="good" onClick={handleClick("good")} />
          <Button text="neutral" onClick={handleClick("neutral")} />
          <Button text="bad" onClick={handleClick("bad")} />
          <h1>Statistics</h1>
          {   ([bad, good, neutral].every(feedback => feedback === 0)) 
            ?
              <p>No feedback given</p> 
            :
                <table>
                    <tbody>
                    <Statistic value={good} text="good" />
                    <Statistic value={neutral} text="neutral" />
                    <Statistic value={bad} text="bad" />
                    <Statistic value={total} text="all" />
                    <Statistic value={average} text="average" />
                    <Statistic value={positive} text="positive" />
                    </tbody>
                </table>
          }
      </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));
