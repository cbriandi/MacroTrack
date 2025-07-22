import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginButton from '../components/LogoutButton';
import LogoutButton from '../components/LogoutButton';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/auth/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }

        else if (!res.ok) {
          throw new Error('Failed to fetch user');
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
          console.error("Fetch error:", err);
          setError(err.message);
        }

    };

    fetchUser();
  }, []);

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
      <LogoutButton />
    </div>
  );
};

export default Dashboard;
