import { useState } from 'react';
import { login as apiLogin, register as apiRegister } from '../api/api';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ isRegister = false }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    userType: 'reader',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isRegister && formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      const { data } = isRegister ? await apiRegister(formData) : await apiLogin(formData);
      login(data.token);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-teal-800 p-6 rounded-lg shadow-lg text-gold-200">
      {error && <p className="text-gold-500 mb-4">{error}</p>}
      {isRegister && (
        <>
          <input
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="mb-2 p-2 border border-teal-600 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
            required={isRegister}
          />
          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            className="mb-2 p-2 border border-teal-600 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="reader">Reader</option>
          </select>
        </>
      )}
      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="mb-2 p-2 border text-gold-500 border-teal-600 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="mb-2 p-2 border border-teal-600 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
        required
      />
      {isRegister && (
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="mb-2 p-2 border border-teal-600 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
          required
        />
      )}
      <button
        type="submit"
        className="w-full bg-gold-200 text-white px-4 py-2 rounded-lg hover:bg-gold-600 transition-colors mt-4"
      >
        {isRegister ? 'Register' : 'Login'}
      </button>
    </form>
  );
};

export default AuthForm;