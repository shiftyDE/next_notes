"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";

// Zod schema for validation
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters")
});

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  // Mock login function (replace with actual API call)
  const handleLogin = async (values) => {
    console.log("Form submitted:", values);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!getValues().email || !getValues().password) {
        setError("root", { message: "Please fill in all fields" });
        return;
      }

      // Mock successful login
      console.log("Login successful:", values.email);
    } catch (error) {
      console.error("Login failed:", error);
      if (error.message === "Network Error") {
        setError("root", { message: "Network error. Please try again." });
      } else {
        setError("root", { message: "Invalid credentials" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 relative flex items-center justify-center overflow-hidden">
      {/* Gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 -z-10" />
      
      <div className="max-w-md mx-auto px-6 py-8 animate-fade-in-up">
        {/* Header */}
        <div className="text-center mb-8 z-10">
          <h1 className="text-4xl font-bold text-gray-100 mb-2">Welcome Back</h1>
          <p className="text-gray-500 text-sm">Sign in to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleLogin)} className="animate-fade-in-up">
          {errors.root && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-xl text-red-400 text-sm animate-shake" role="alert">
              ✖️ {errors.root.message}
            </div>
          )}

          {/* Email Input */}
          <div className="mb-6">
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter your email..."
              aria-label="Email"
              className={`w-full p-3 border rounded-xl bg-gray-800/50 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-all duration-200 h-12 focus-visible:ring-2 focus-visible:ring-purple-400 ${
                errors.email ? 'border-red-500' : 'border-gray-700/50'
              }`}
            />
            {errors.email && (
              <p className="mt-1 p-2 text-xs text-red-400">{errors.email.message}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Enter your password..."
              aria-label="Password"
              className={`w-full p-3 border rounded-xl bg-gray-800/50 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-all duration-200 h-12 focus-visible:ring-2 focus-visible:ring-purple-400 ${
                errors.password ? 'border-red-500' : 'border-gray-700/50'
              }`}
            />
            {errors.password && (
              <p className="mt-1 p-2 text-xs text-red-400">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !getValues().email || !getValues().password}
            className="mt-4 w-full py-3 px-6 bg-gradient-to-r from-teal-800 to-blue-900 hover:from-teal-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg focus-visible:ring-2 focus-visible:ring-purple-500 active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.333 0 2 3.333 2 8h2z"></path>
                </svg>
                <span>Loading...</span>
              </span>
            ) : (
              "Sign In"
            )}
          </button>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link href="/signup" className="text-purple-400 hover:text-purple-300 transition-colors duration-200">
              Sign up
            </Link>
          </p>

          {/* Error message */}
          {errors.root && (
            <div className="mt-6 p-4 bg-red-900/20 border border-red-500/50 rounded-xl text-red-400 text-sm animate-shake" role="alert">
              ✖️ {errors.root.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

// Re-export types for use elsewhere
export type FormValues = z.infer<typeof formSchema>;