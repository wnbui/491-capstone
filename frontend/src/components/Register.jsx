import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const location = useLocation();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState(location.state?.prefillUsername || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('http://127.0.0.1:5000/api/auth/register', {
        full_name: fullName,
        username,
        email,
        password,
        role: 'user'
      });

      // auto-login after register
      const loginRes = await axios.post('http://127.0.0.1:5000/api/auth/login', { username, password });
      localStorage.setItem('token', loginRes.data.token);
      navigate('/notes');

    } catch (err) {
      const msg = err.response?.data?.error || err.response?.data?.ERROR || 'Registration failed';
      setError(msg);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required style={{ width: '100%', padding: '8px', margin: '5px 0' }} />
        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required style={{ width: '100%', padding: '8px', margin: '5px 0' }} />
        <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '8px', margin: '5px 0' }} />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '8px', margin: '5px 0' }} />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Create Account</button>
      </form>
      <p style={{ marginTop: '10px' }}>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Register;
