import React, { useState } from "react";
import { UserDto } from "../types";
import { getUserFromLocalStorage } from "../utils/token";
import Modal from "./AuthModal";
import CreateModal from "./CreateModal";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    //user detils
    const [user, setUser] = useState<UserDto>(getUserFromLocalStorage());
   

const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    setUser({} as UserDto)

     window.location.reload()

}

    return (
        <div className="relative">
        <div className="flex fixed top-0 right-0 left-0 h-16 bg-black">
            <div className="w-[80%] flex  items-center">
                <div className="m-auto">
                    <h1 className="text-lg font-semibold text-white">Notes App</h1>
                </div>
                <div className="ml-auto" >
                
                    <ul className="flex">
                    {user ?  <>
                        <li  className="text-base font-semibold text-white">{user.name}</li>
                        <li onClick={()=>setIsCreateOpen(true)} className=" ml-2 text-base font-semibold text-white">Create</li>
                        <li onClick={handleLogout} className=" ml-2 text-base font-semibold text-white">logout</li>
                    </>: <li onClick={()=>setIsOpen(true)} className="text-base font-semibold text-white">login</li>
                    }
                    </ul>
                    
                </div>
            </div>
        </div>
        <div className="">
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        <CreateModal isCreateOpen={isCreateOpen} onCreateClose={() => setIsCreateOpen(false)} />
        </div>
        </div>
    );
}

export default Navbar;
