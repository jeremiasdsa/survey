// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
//
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
//
// export default App;


import React, { useState } from 'react';
import Login from './components/Login';
import SurveyForm from './components/SurveyForm';

function App() {
  const [researcherName, setResearcherName] = useState('');

  const handleLogin = (name, pin) => {
    // Validação de PIN pode ser adicionada aqui
    setResearcherName(name);
  };

  return (
      <div>
        {researcherName ? (
            <>
              <SurveyForm researcherName={researcherName} />
            </>
        ) : (
            <Login onLogin={handleLogin} />
        )}
      </div>
  );
}

export default App;
