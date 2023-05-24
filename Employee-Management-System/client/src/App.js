import { useState } from 'react';
import './App.css';
import MainPage from './pages/MainPage/Mainpage';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';
import { getUser } from './utilities/users-service';
import SignUpForm from './components/SignUpForm/SignUpForm';



function App() {
  const [user, setUser] = useState (getUser())
  const [employeeId, setEmployeeId] = useState('')
  console.log(employeeId)
  return (
    <div className="App">
      { user ?  (
        <Routes> 
          <Route 
          path="/login"
          element={<LoginForm user={user} setUser={setUser} />}
          />

          <Route
          path="/mainpage"
          element={<MainPage user={user} setUser={setUser} />} />
        </Routes>
        
      ):(
        <>
        <LoginForm setUser={setUser} />
        <SignUpForm setUser={setUser} />
        </>
      ) }

      
    </div>
  );
}

export default App;
