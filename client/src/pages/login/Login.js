import { useRef } from "react";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className='login flex w-[100vw] h-[80vw] items-center justify-center'>
      <form
        className='loginForm h-[40vw] w-[80vw] flex flex-col items-center justify-center'
        onSubmit={(e) => onSubmit(e)}
      >
        <input
          placeholder='Email'
          className='loginInput p-3 my-2 border-2 border-black'
          ref={email}
        />
        <input
          placeholder='Password'
          type='password'
          className='loginInput p-3 my-2 border-2 border-black'
          ref={password}
        />
        <button className='transition ease-in-out delay-400 bg-black text-white hover:text-black hover:bg-white border-2 border-black px-8 py-2'>
          Login
        </button>
        <small>
          Don't have an account?{" "}
          <button
            type='submit'
            className='transition ease-in-out delay-400 bg-black text-white hover:text-black hover:bg-white border-2 border-black px-3 py-2'
          >
            Sign Up
          </button>
        </small>
      </form>
    </div>
  );
}
