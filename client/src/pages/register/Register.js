export default function Register() {
  return (
    <div className='signup flex w-[100vw] h-[80vw] items-center justify-center'>
      <div className='signupForm h-[40vw] w-[80vw] flex flex-col items-center justify-center'>
        <input
          placeholder='Email'
          className='loginInput p-3 my-2 border-2 border-black'
        />
        <input
          placeholder='Password'
          type='password'
          className='loginInput p-3 my-2 border-2 border-black'
        />
        <input
          placeholder='Password'
          type='password'
          className='loginInput p-3 my-2 border-2 border-black'
        />
        <button className='transition ease-in-out delay-400 bg-black text-white hover:text-black hover:bg-white border-2 border-black px-8 py-2 my-3'>
          Sign Up
        </button>
        <small>
          Have an account?{" "}
          <button className='transition ease-in-out delay-400 bg-black text-white hover:text-black hover:bg-white border-2 border-black px-3 py-1'>
            Login
          </button>
        </small>
      </div>
    </div>
  );
}
