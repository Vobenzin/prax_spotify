"use client";
import Link from "next/link";
import { useState } from "react";

export function NavBar(){
  const [searchInput, SetSearchInput] = useState('')
  return(<div className="navbar bg-base-100 shadow-sm">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">daisyUI</a>
          </div>
          <div className="flex gap-2">
            <input type="text" 
            placeholder="Search" 
            className="input input-bordered w-24 md:w-auto" 
            onChange={(e) =>{
              SetSearchInput(e.target.value)
            }}/>
            <Link href={{pathname : "/search",
                          query : {
                            q: searchInput,
                          },
            }} className="btn btn-ghost text-xl">Search</Link>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
              <ul
                tabIndex={-1}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li><a>Settings</a></li>
                <li><a>Logout</a></li>
              </ul>
            </div>
          </div>
        </div>)
}


