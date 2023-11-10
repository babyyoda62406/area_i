import './App.css'

function App() {
  
//Simple Hello Word Fetch Example.
  return <button onClick={()=>{
    fetch('/api/v1')
    .then(res => res.text())
    .then(data => alert(data))
  }}>
    Tócame
  </button>
}

export default App
