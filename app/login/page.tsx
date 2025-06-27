import React from "react";
import LoginForm from "../ui/login-form";

export default function login() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 h-52 w-full'>
      <LoginForm />
    </div>
  );
}