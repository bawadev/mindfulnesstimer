"use client"
import { useState, useEffect } from "react";

const Settings = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const storedSessions = JSON.parse(localStorage.getItem("sessions")) || [];
    setSessions(storedSessions);
  }, []);

  const handleDeleteData = () => {
    localStorage.removeItem("sessions");
    setSessions([]);
    alert("Session data deleted");
  };

  return (
    <>
      <div className="h-20" />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <LoginCard />
          <h2 className="text-2xl font-bold mb-4 mt-8">Register</h2>
          <RegisterCard />
          <button
            className="mt-8 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleDeleteData}
          >
            Delete Session Data
          </button>
        </div>
      </div>
    </>
  );
};

const LoginCard = () => (
  <div className="max-w-sm w-full lg:max-w-full lg:flex shadow-lg rounded-lg overflow-hidden">
    <div className="bg-white p-8 lg:p-12 flex flex-col justify-center">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form className="space-y-6">
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            id="password"
            type="password"
            placeholder="******************"
          />
        </div>
        <div>
          <button
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="button"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  </div>
);

const RegisterCard = () => (
  <div className="w-full max-w-sm">
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Username"
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="******************"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Register
        </button>
      </div>
    </form>
  </div>
);

export default Settings;
