export default function Card({ user }) {
  return (
    <div className='flex flex-col bg-slate-200 w-[80vw] sm:w-[40vw] lg:w-[30vw] m-5 p-5'>
      <div className='cardName font-semibold text-lg'>{user.name}</div>
      <div className='cardEmail text-sm'>{user.email}</div>
    </div>
  );
}
