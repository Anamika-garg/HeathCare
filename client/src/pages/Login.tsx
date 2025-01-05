import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Heart } from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add authentication logic here
    try {
      const res = await axios.post(`https://heath-care-backend.vercel.app/api/user/login`, {
        email,
        password,
      });
      console.log(res);
      if (res.status == 200) {
        toast.success("Login successful!");
        let userToken = res.data.token;
        login(userToken);

        // Redirect to additional info page
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        // Server responded with a status other than 2xx
        const errorMessage =
          error.response.data.error || "An error occurred while registering.";
        toast.error(errorMessage);
      } else if (error.request) {
        // Request was made but no response received
        toast.error("No response from server. Please try again.");
      } else {
        // Other errors
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Heart className="w-12 h-12 text-blue-600 mx-auto" />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Welcome back
        </h2>
        <p className="mt-2 text-gray-600">Sign in to your healthcare account</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Email address"
              type="email"
              value={email}
              placeholder={"Enter your Email"}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              placeholder="Enter your Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <Link
                to="/forgot-password"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </Link>
            </div>

            <Button type="submit" className="w-full">
              Sign in
            </Button>

            <p className="mt-4 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
