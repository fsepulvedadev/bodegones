import pinguino from "../assets/png/pinguino.png";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-10 my-2 border-2 border-red-600 bg-slate-100">
      <div className="">
        <div className="flex items-center">
          <img src={pinguino} className="w-14" alt="" />
          <h1 className="-ml-4 text-lg font-bold">BODEGONES</h1>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
