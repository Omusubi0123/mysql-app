import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('login');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleLoginSuccess = (token: string) => {
    localStorage.setItem('token', token);
    setErrorMessage(null);
  };

  const handleLoginFailure = (message: string) => {
    setErrorMessage(message);
  };

  const handleRegisterSuccess = (message: string) => {
    setSuccessMessage(message);
    setErrorMessage(null);
    setActiveTab('login');
  };

  const handleRegisterFailure = (message: string) => {
    setErrorMessage(message);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center relative">
      {/* タブを左上に配置 */}
      <div className="absolute top-4 left-4 flex space-x-4">
        <button
          className={`py-2 px-4 font-semibold text-lg ${activeTab === 'login' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('login')}
        >
          Login
        </button>
        <button
          className={`py-2 px-4 font-semibold text-lg ${activeTab === 'register' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('register')}
        >
          Register
        </button>
      </div>

      {/* フォームの中央揃え */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto text-center">
        {activeTab === 'login' ? (
          <div>
            <h1 className="text-2xl font-bold mb-6">Login</h1>
            <LoginForm onLoginSuccess={handleLoginSuccess} onLoginFailure={handleLoginFailure} />
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold mb-6">Register</h1>
            <RegisterForm onRegisterSuccess={handleRegisterSuccess} onRegisterFailure={handleRegisterFailure} />
          </div>
        )}
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
      </div>
    </div>
  );
};

export default App;
