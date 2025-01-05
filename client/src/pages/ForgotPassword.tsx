import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export default function ForgotPassword(): JSX.Element {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      const res = await axios.post("https://heath-care-backend.vercel.app/api/user/reset-password", { email });
      toast.success(res.data.message);
      console.log(res)
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to send password reset email.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-blue-100">
      <ToastContainer />
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Reset Your Password</h2>
        <p className="mt-2 text-gray-600">Enter your email to receive a password reset link.</p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">Send Reset Link</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
