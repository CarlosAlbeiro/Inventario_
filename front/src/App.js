import logo from './platzi.webp';
import LoginForm from './login';
import './App.css';


const inputClasses = "shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline";
const labelClasses = "block text-zinc-700 text-sm font-bold mb-2";
const buttonClasses = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";
// const linkClasses = "inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800";

function App() {
  return (
    <div className="App">
        <LoginForm/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edita el archivo <code>src/App.js</code> y guarda para recargar.
        </p>
        <a
          className="App-link"
          href="https://platzi.com/reactjs"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

function Login(){
  return(
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-100 dark:bg-zinc-800">
    <form className="bg-white dark:bg-zinc-700 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
            <label className={labelClasses} htmlFor="username">
                Username
            </label>
            <input className={inputClasses} id="username" type="text" placeholder="Username" />
        </div>
        <div className="mb-6">
            <label className={labelClasses} htmlFor="password">
                Password
            </label>
            <input className={inputClasses} id="password" type="password" placeholder="******************" />
        </div>
        <div className="flex items-center justify-between">
            <button className={buttonClasses} type="button">
                Sign In
            </button>
            {/* <a>
                Forgot Password?
            </a> */}
        </div>
    </form>
</div>
  );
}




export default App;