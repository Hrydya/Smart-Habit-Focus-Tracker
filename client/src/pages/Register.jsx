import {useState,useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {AuthContext} from '../context/AuthContext'

export default function Register(){
    const [email,setEmail]= useState('')
    const[name,setName] = useState('')
    const [password,setPassword] = useState('')
    const [confirmpassword,setConfirmPassword]= useState('')
    const [error,setError] = useState('')
    const {setToken} = useContext(AuthContext)
    const navigate= useNavigate()

    const handleSubmit= async (e)=>{
        e.preventDefault();
        if (password !== confirmpassword) {
            setError('Passwords do not match ')
            return;
        }
        try{

            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`,{name,email,password,confirmpassword})
            setToken(res.data.token);
            navigate('/dashboard')
        }
        catch{
                setError('Invalid email or password')
        }
    }
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md w-96">
                    <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full border p-2 rounded mb-4"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full border p-2 rounded mb-4"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full border p-2 rounded mb-4"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder='Confirm Password'
                            className="w-full border p-2 rounded mb-4"
                            value={confirmpassword}
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                        />
                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                            Register
                        </button>
                    </form>
                    <p className="text-center mt-4 text-sm">Already have an account? <a href="/login" className="text-blue-500">Login</a></p>
                </div>
            </div>
        </>
    )




}