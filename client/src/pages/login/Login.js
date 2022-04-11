export default function Login() {
  return (
    <div className='login flex w-[100vw] h-[80vw] items-center justify-center'>
      <div className='loginForm h-[40vw] w-[80vw] flex flex-col items-center justify-center'>
        <input
          placeholder='Email'
          className='loginInput p-3 my-2 border-2 border-black'
        />
        <input
          placeholder='Password'
          type='password'
          className='loginInput p-3 my-2 border-2 border-black'
        />
        <button className='transition ease-in-out delay-400 bg-black text-white hover:text-black hover:bg-white border-2 border-black px-8 py-2'>
          Login
        </button>
        <small>
          Don't have an account?{" "}
          <button className='transition ease-in-out delay-400 bg-black text-white hover:text-black hover:bg-white border-2 border-black px-3 py-2'>
            Sign Up
          </button>
        </small>
      </div>
    </div>
  );
}
