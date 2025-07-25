import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', email: '', password: '', role: 'agent',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await register(form.name, form.email, form.password, form.role);
      navigate('/dashboard');
    } catch {
      alert('Erreur d’inscription');
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nom" onChange={handleChange} required /><br />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required /><br />
        <input name="password" type="password" placeholder="Mot de passe" onChange={handleChange} required /><br />
        <select name="role" onChange={handleChange}>
          <option value="agent">Agent</option>
          <option value="supervisor">Superviseur</option>
        </select><br />
        <button type="submit">Créer un compte</button>
      </form>
    </div>
  );
}
