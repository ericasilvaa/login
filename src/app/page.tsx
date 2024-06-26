"use client"; // Adicione esta linha no início do arquivo

import { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

// Interface para o estado do formulário de cadastro
interface SignUpFormState {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

// Componente para o formulário de cadastro
const SignUpForm = ({ onSignUpSuccess, toggleForm }: { onSignUpSuccess: () => void; toggleForm: () => void }) => {
  const [formData, setFormData] = useState<SignUpFormState>({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Verificação da senha
    if (formData.password.length < 8 || !/\d/.test(formData.password) || !/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      setError('Password must be at least 8 characters long and contain at least one number and one special character.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/apiv1/signup', formData);
      console.log(response.data);
      onSignUpSuccess();
    } catch (error) {
      setError('An error occurred while signing up. Please try again.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap">
      <h2 className="text-2xl font-bold mb-6 text-center w-full">Sign Up</h2>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <div className="mb-4 w-1/2 pr-2">
        <label className="block text-white text-sm font-bold mb-2" htmlFor="firstname">First Name</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          id="firstname"
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          placeholder="First Name"
        />
      </div>
      <div className="mb-4 w-1/2 pl-2">
        <label className="block text-white text-sm font-bold mb-2" htmlFor="lastname">Last Name</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          id="lastname"
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          placeholder="Last Name"
        />
      </div>
      <div className="mb-4 w-full relative">
        <label className="block text-white text-sm font-bold mb-2" htmlFor="email">Email</label>
        <div className="flex items-center border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-white">
          <FontAwesomeIcon icon={faEnvelope} className="text-gray-500 mr-2" />
          <input
            className="appearance-none bg-transparent border-none w-full text-black leading-tight focus:outline-none"
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>
      </div>

      <div className="mb-6 w-full relative">
        <label className="block text-white text-sm font-bold mb-2" htmlFor="password">Password</label>
        <div className="flex items-center border rounded w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline bg-white">
          <FontAwesomeIcon icon={faLock} className="text-gray-500 mr-2" />
          <input
            className="appearance-none bg-transparent border-none w-full text-black leading-tight focus:outline-none"
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="********"
          />
        </div>
      </div>

      <div className="flex items-center justify-between mb-4 w-full">
        <button
          className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          type="submit"
        >
          Sign Up
        </button>
      </div>
      <div className="text-center my-4 w-full">
        <span className="text-white-500">or</span>
      </div>
      <div className="flex items-center justify-between mb-4 w-full">
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          type="button"
          onClick={toggleForm}
        >
          Back to Login
        </button>
      </div>
    </form>
  );
};

// Componente para o formulário de redefinição de senha
const ForgotPasswordForm = ({ toggleForm }: { toggleForm: () => void }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/apiv1/forgot-password', { email });
      console.log(response.data);
      // Adicione feedback de sucesso para o usuário aqui, se necessário
    } catch (error) {
      console.error(error);
      // Adicione tratamento de erro aqui, se necessário
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>



      <div className="mb-4 relative">
        <label className="block text-white-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
        <div className="flex items-center border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-white">
          <FontAwesomeIcon icon={faEnvelope} className="text-gray-500 mr-2" />
          <input
            className="appearance-none bg-transparent border-none w-full text-black leading-tight focus:outline-none"
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>


      </div>
      <div className="flex items-center justify-between mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          type="submit"
        >Send Reset Link</button>
      </div>
      <div className="flex items-center justify-between mb-4">
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          type="button"
          onClick={toggleForm}
        >Back to Login</button>
      </div>
    </form>
  );
};

// Componente para o formulário de login
const LoginForm = ({ toggleForm, onForgotPassword }: { toggleForm: () => void; onForgotPassword: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Verificação básica do formato do e-mail
    // Verificação básica do formato do e-mail
    if (!email.includes('@')) {
      setError('Invalid email format');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/apiv1/signin', { email, password });
      console.log(response.data);
      // Adicione lógica de redirecionamento ou feedback de sucesso aqui
    } catch (error) {
      console.error(error);
      // Adicione lógica de feedback de erro aqui, se necessário
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <div className="mb-4 relative">
        <label className="block text-white text-sm font-bold mb-2" htmlFor="email">Email</label>
        <div className="flex items-center border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-white">
          <FontAwesomeIcon icon={faEnvelope} className="text-gray-500 mr-2" />
          <input
            className="appearance-none bg-transparent border-none w-full text-black leading-tight focus:outline-none"
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
      </div>



      <div className="mb-4 relative">
        <label className="block text-white text-sm font-bold mb-2" htmlFor="password">Password</label>
        <div className="flex items-center border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-white">
          <FontAwesomeIcon icon={faLock} className="text-gray-500 mr-2" />
          <input
            className="appearance-none bg-transparent border-none w-full text-black leading-tight focus:outline-none"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
          />
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <label className="inline-flex items-center">
          <input type="checkbox" className="form-checkbox text-blue-500" />
          <span className="ml-2 text-white-700 text-sm">Remember me</span>
        </label>
        <button
          className="inline-block align-baseline font-bold text-sm text-white hover:text-white hover:underline"
          type="button"
          onClick={onForgotPassword}
        >Forgot Password?</button>
      </div>
      <div className="flex items-center justify-between mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          type="submit"
        >Sign In</button>
      </div>
      <div className="text-center my-4">
        <span className="text-white-500">or</span>
      </div>
      <div className="flex items-center justify-between mb-4">
        <button
          className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          type="button"
          onClick={toggleForm}
        >Sign up free</button>
      </div>
      <div className="flex items-center justify-between mb-4">
        <button
          className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          type="button"
        >Continue with Google</button>
      </div>
    </form>
  );
};

// Função de componente padrão que representa a página inicial
export default function Home() {
  const [isSignUp, setIsSignUp] = useState(false); // Estado para alternar entre a tela de login e cadastro
  const [isForgotPassword, setIsForgotPassword] = useState(false); // Estado para alternar entre a tela de login e redefinição de senha

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-90">
      <div className="w-96 bg-black bg-opacity-50 p-8 rounded-lg shadow-md text-white">
        {isForgotPassword ? (
          <ForgotPasswordForm toggleForm={() => setIsForgotPassword(false)} />
        ) : isSignUp ? (
          <SignUpForm onSignUpSuccess={() => setIsSignUp(false)} toggleForm={() => setIsSignUp(false)} />
        ) : (
          <LoginForm toggleForm={() => setIsSignUp(true)} onForgotPassword={() => setIsForgotPassword(true)} />
        )}
      </div>
    </main>
  );
}


