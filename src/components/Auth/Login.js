import React from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react';

function Login() {
  const { handleLoginClick, user } = useDynamicContext();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 max-w-sm w-full bg-white shadow-md rounded-md">
        {user ? (
          <div>
            <p className="text-2xl font-semibold text-gray-800">Welcome, {user.address}</p>
            <p className="mt-2 text-gray-600">You are now logged in with Dynamic.</p>
          </div>
        ) : (
          <button 
            onClick={handleLoginClick}
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
          >
            Login with Dynamic
          </button>
        )}
      </div>
    </div>
  );
}

export default Login;