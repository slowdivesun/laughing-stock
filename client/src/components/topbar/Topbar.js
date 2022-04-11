import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <div className='topbarContainer h-[50px] w-100% flex sticky top-0 bg-[#1877f2] text-white  py-5 px-5 items-center '>
      <div className='topbarLeft flex-1 font-bold text-lg'>
        <span className='logo'>
          {" "}
          <Link to='/'>LaughingStock</Link>
        </span>
      </div>
      <div className='topbarRight flex-1'>A chat app made in MERN</div>
    </div>
  );
}
