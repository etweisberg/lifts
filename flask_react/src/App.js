import { useState } from 'react'
import axios from "axios";

function App() {

  const [liftData, setLiftData] = useState(null)

    function getLifts() {
      axios({
        method: "GET",
        url:"/lifts",
      })
      .then((response) => {
        const res =response.data
        setLiftData(({
          lifts: res.lifts}))
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })}

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={getLifts}>Lifts</button>
        {liftData && <div>
              <p>{liftData.lifts}</p>
            </div>
        }
      </header>
    </div>
  );
}

export default App;