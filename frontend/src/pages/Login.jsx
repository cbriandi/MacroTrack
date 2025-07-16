import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <p className="text-sm">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-500 underline">
          Register here
        </Link>
      </p>
    </div>
  );
}
