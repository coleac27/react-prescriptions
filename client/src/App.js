import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Resources from './components/Resources';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Logout from './components/Logout';
import {AuthProvider} from './contexts/authContext';
import Medication from './components/Medication';


function App() {
  return (
    <>
    <AuthProvider>
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/dashboard/edit/:id" element={<Medication />} />
            <Route path="/dashboard/create" element={<Medication />} />
          </Routes>
        </Router>
      </AuthProvider>
      <Footer/>
    </>
  );
}

export default App;
