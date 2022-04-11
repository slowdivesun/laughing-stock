import axios from "axios";
import { useContext } from "react";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Register() {
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const history = useHistory();

  const { dispatch } = useContext(AuthContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    const user = {
      name: name.current.value,
      email: email.current.value,
      password: password.current.value,
    };
    try {
      await axios.post("http://localhost:3004/api/auth/register", user);
      history.push("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='signup flex w-[100vw] h-[80vw] items-center justify-center'>
      <form
        className='signupForm h-[40vw] w-[80vw] flex flex-col items-center justify-center'
        onSubmit={(e) => onSubmit(e)}
      >
        <input
          ref={name}
          placeholder='Name'
          type='text'
          className='loginInput p-3 my-2 border-2 border-black'
        />
        <input
          ref={email}
          placeholder='Email'
          type='email'
          className='loginInput p-3 my-2 border-2 border-black'
        />
        <input
          ref={password}
          placeholder='Password'
          type='password'
          className='loginInput p-3 my-2 border-2 border-black'
        />
        <button className='transition ease-in-out delay-400 bg-black text-white hover:text-black hover:bg-white border-2 border-black px-8 py-2 my-3'>
          Sign Up
        </button>
        <small>
          Have an account?{" "}
          <button
            type='submit'
            className='transition ease-in-out delay-400 bg-black text-white hover:text-black hover:bg-white border-2 border-black px-3 py-1'
          >
            Login
          </button>
        </small>
      </form>
    </div>
  );
}
