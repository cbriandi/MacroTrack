import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 font-body min-h-screen flex flex-col justify-center items-center text-center space-y-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Welcome to MacroTrack</h1>
      <Link to="/register" className="text-lg font-medium text-blue-600 hover:underline dark:text-blue-400">Register</Link>
      <Link to="/login" className="text-lg font-medium text-blue-600 hover:underline dark:text-blue-400">Login</Link>
      <Link to="/dashboard" className="text-lg font-medium text-blue-600 hover:underline dark:text-blue-400">Dashboard</Link>
    </section>
  );
}
