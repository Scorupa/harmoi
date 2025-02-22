import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [text, setText] = useState('')
  const [displayText, setDisplayText] = useState('')

  const handleSubmit = e => {
    e.preventDefault();
    setDisplayText(text);
  };

  const handleChange = e => {
    setText(e.target.value);
  };

  return (
    <>
      <h1>Harmoi</h1>

      <form onSubmit={e => handleSubmit(e)}>
        <h3>Insert text to see Harmoi character </h3>
        <input type="text" placeholder="Insert text here" value={text} onChange={e => handleChange(e)} />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>

        {<p>{displayText}</p>}
      </form>
    </>
  )
}

export default App
