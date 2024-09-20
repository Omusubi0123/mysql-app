import React, { useState } from 'react';
import LoginForm  from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const App: React.FC = () => {
  const [isAuthemticated, setIsAuthenticated] = useState<boolean>(false);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleLoginSuccess = (token: string) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    setErrorMessage(null);
  };

  const handleLoginFailure = (message: string) => {
    setErrorMessage(message);
  };

  const handleRegisterSuccess = (message: string) => {
    setSuccessMessage(message);
    setErrorMessage(null);
    setIsRegistering(false);
  };

  const handleRegisterFailure = (message: string) => {
    setErrorMessage(message);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {isAuthemticated ? (
        <div>
          <h1 className="text-2xl font-bold">Welcome to the Dashboard!</h1>
          <p>You are now logged in.</p>
        </div>
      ) : (
        <div>
          {isRegistering ? (
            <div>
              <h1 className="text-2xl font-bold">Register</h1>
              <RegisterForm
                onRegisterSuccess={handleRegisterSuccess}
                onRregisterFailure={handleRegisterFailure}
              />
              {errorMessage && <p className="text-red-500 mt-4"></p>}
              <button onClick={() => setIsRegistering(false)} className="mt-4">
                Already have an account? Login here
              </button>
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-bold">Login</h1>
              <LoginForm 
                onLoginSuccess={handleLoginSuccess}
                onLoginFailure={handleLoginFailure}
              />
              {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
              {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
              <button onClick={() => setIsRegistering(true)} className="mt-4">
                Don't have an account? Register here
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;


// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
