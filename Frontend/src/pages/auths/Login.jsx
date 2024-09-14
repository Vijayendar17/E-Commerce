import React, { useState, useEffect } from 'react';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/Usercontext';

export default function Login() {
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { user, setUser } = useUser(); 
  if (user.user) {
    navigate("/myprofile")
  }

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const isFormValid = email && password;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isFormValid) {
      toast.error('Please fill in both email and password!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:6900/auth/login', {
        email,
        password,
      }, { withCredentials: true });

      toast.success('Logged in successfully!');
      setUser({
        ...user,
        user: response.data.user,
        token: response.data.token,
      });
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate('/');
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Login failed. Please try again.'
      );
    }
  };

  return (
    <main className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <CssBaseline />
      <button
        onClick={() => setDarkMode(prevMode => !prevMode)}
        className={`fixed top-4 right-4 py-2 px-4 rounded shadow-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-300 text-black'} transition-all duration-300`}
      >
        {darkMode ? 'Turn Light' : 'Turn Dark'}
      </button>
      <Sheet
        sx={{
          width: 300,
          mx: 'auto',
          my: 4,
          py: 3,
          px: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
          backgroundColor: darkMode ? 'gray.800' : 'white',
          color: darkMode ? 'white' : 'black'
        }}
        variant="outlined"
      >
        <div>
          <Typography level="h4" component="h1">
            <b>Welcome!</b>
          </Typography>
          <Typography level="body-sm">Sign in to continue.</Typography>
        </div>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="..........@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 2 }}
            />
          </FormControl>
          <Button 
            sx={{ mt: 2 }} 
            fullWidth 
            disabled={!isFormValid}
            type="submit"
          >
            Log in
          </Button>
          <Typography
            endDecorator={<Link href="/signup">Sign up</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center', mt: 2 }}
          >
            Don&apos;t have an account?
          </Typography>
        </form>
      </Sheet>
      <ToastContainer />
    </main>
  );
}
