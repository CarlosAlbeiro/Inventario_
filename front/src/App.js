// import LoginForm from './components/login';
// import './App.css';

// function App() {
//   return (
//         <LoginForm/>
//   );
// }

// export default App;
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login.js'; // Asegúrate de ajustar el camino del import según tu estructura de archivos
import Principal from './components/principal.js'; // Supongamos que tienes un componente HomePage
// import Dashboard from './components/Dashboard'; // Supongamos que tienes un componente Dashboard

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/principal" element={<Principal/>} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
