import React from "react";
import {useState} from "react";
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({
        username : '',
        email :'',
        password :''
    })

    const [msg, setMsg] = useState('');

    const {username, email, password} = formData;

    const onChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post('http://localhost:5000/api/auth/register', formData);
            setMsg(res.data.msg);
        }catch(err){
            setMsg(err.response.data.error || 'Registration failed');
        }
    }
    return (
    <div className="bg-grey-theme min-h-screen flex items-center justify-center text-text-primary">
      <div className="bg-black-theme p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-violet-theme mb-6">Create an Account</h1>
        {msg && <p className="mb-4 text-center text-red-400">{msg}</p>}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={onChange}
              required
              className="w-full px-4 py-2 border border-light-grey-theme rounded-md bg-light-grey-theme text-text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-theme transition-colors"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={onChange}
              required
              className="w-full px-4 py-2 border border-light-grey-theme rounded-md bg-light-grey-theme text-text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-theme transition-colors"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
              minLength="6"
              required
              className="w-full px-4 py-2 border border-light-grey-theme rounded-md bg-light-grey-theme text-text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-theme transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-md bg-violet-theme text-text-primary font-semibold hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-theme transition-colors"
          >
            Register
          </button>
          
        </form>
        <p className="mt-4 text-center text-text-secondary">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline font-semibold">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );

}
