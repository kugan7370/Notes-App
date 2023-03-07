import axios, { AxiosError } from 'axios';
import React,{useState} from 'react';
import { setTokenCookie, setTokenToLocalStorage, setUserToLocalStorage } from '../utils/token';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

function Modal({ isOpen, onClose }: ModalProps) {
 const [isLogin, setIsLogin] = useState(true)
const [userdetails, setuserdetails] = useState({
    email: '',
    password: '',
    name: ''
})

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setuserdetails({
        ...userdetails,
        [e.target.name]: e.target.value
    })
}

const handleAuth = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)  => {
    e.preventDefault()
    try {
        const results = await axios({
            url: `api/user/${isLogin?"login":"create"}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(userdetails)
           
        })
        console.log(results);
        
        if(results.status === 200 || results.status === 201){
            const token = results?.data?.token
            const user = results?.data?.user
            const message = results?.data?.message
            if(token){
                setTokenToLocalStorage(token)
                setTokenCookie(token)
            }
            if(user){
                setUserToLocalStorage(user)
            }
            if(message){
                alert(message)
            }
          window.location.reload()
        }
    
    } catch (error:unknown) {
        if (error instanceof AxiosError && error.response) {
            alert(error.response.data.message)
          } else {
            alert(error instanceof Error ? error.message : 'Unknown error')
          }
      
        
      

      
    }
  
    setuserdetails({
        email: '',
        password: '',
        name: ''
    })

    
}


    return (
        //login modal
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" style={{ display: isOpen ? 'block' : 'none' }}>
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-title">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="absolute top-5 right-5">
                            <button onClick={onClose} className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150" aria-label="Close">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                {isLogin?"Login":"Register"}
                                </h3>
                                <div className="mt-2">
                                   {!isLogin && <input type="text" name='name' onChange={handleChange} placeholder="Username" className="w-full border-2 border-gray-300 p-2 rounded-lg outline-none focus:border-blue-400 mt-2" />}
                                    <input type="email" name='email' onChange={handleChange} placeholder="email" className="w-full border-2 border-gray-300 p-2 rounded-lg outline-none focus:border-blue-400" />
                                    <input type="password" name='password' onChange={handleChange} placeholder="password" className="w-full border-2 border-gray-300 p-2 rounded-lg outline-none focus:border-blue-400 mt-2" />
                                    <button onClick={handleAuth} className="w-full bg-blue-500 text-white p-2 rounded-lg mt-2">{isLogin?'Login':"Register"}</button>
                                    <button onClick={()=>setIsLogin(!isLogin)} className="w-full bg-red-500 text-white p-2 rounded-lg mt-2">{isLogin?"Register":"Login"}</button>
                                    <button className="w-full bg-green-500 text-white p-2 rounded-lg mt-2">Forgot Password</button>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>




        </div>


    );


}

export default Modal;