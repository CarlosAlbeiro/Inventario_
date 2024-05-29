import React from 'react'

const inputClasses = 'w-full px-3 py-2 border rounded-lg'
const buttonClasses = 'w-full bg-blue-900 text-white py-2 rounded-lg'

const LoginForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <img src="https://placehold.co/100" alt="Logo" className="w-16 h-16" />
        </div>
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-zinc-700">
              Username
            </label>
            <input type="text" id="username" name="username" className={inputClasses} />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-zinc-700">
              Password
            </label>
            <input type="password" id="password" name="password" className={inputClasses} />
          </div>
          <button type="submit" className={buttonClasses}>
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm