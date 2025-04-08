import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import CreateLinkForm from './components/CreateLinkForm';
import LinkTable from './components/LinkTable';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
        
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <CreateLinkForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/links"
            element={
              <PrivateRoute>
                <LinkTable />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
};

export default App;
