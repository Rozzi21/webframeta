import React from "react";
import handlerCetak from "../handler/handleCetak.jsx"
// import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-blue-500 mb-3">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
          <a to={'/'}
            className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
    
          >
            PinjamBang
          </a>
          <button
            className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
          >
            <span className="block relative w-6 h-px rounded-sm bg-white"></span>
            <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
            <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
          </button>
        </div>
        <div
          className="lg:flex flex-grow items-center"
          id="example-navbar-warning"
        >
          <ul className="flex flex-col lg:flex-row list-none ml-auto">
            <li className="nav-item">
              <a to={'/tambah'}
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
              >
                Tambah Pinjaman
              </a>
            </li>
            <li className="nav-item">
              <a to={'/daftarPeminjam'}
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                
              >
                Daftar Pinjaman
              </a>
            </li>
            <li className="nav-item">
              <a
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                href="#pablo"
              >
                Total Pinjaman
              </a>
            </li>
            <li className="nav-item">
                <button
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                onClick={handlerCetak}
                >
                Cetak
                </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
