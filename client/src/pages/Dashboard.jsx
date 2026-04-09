
import { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import {Link} from 'react-router-dom'



export default function Dashboard() {

    const [habits, setHabits] = useState([])
    const [habitName, setHabitName] = useState('')
    const { token, logout } = useContext(AuthContext)
    
    

    async function fetchHabits() {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/habits`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setHabits(data.habits)
        } catch (err) {
            console.log(err.response)
        }
    }

    const addHabit = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/habits`,
                { name: habitName },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            setHabitName('')
            fetchHabits()
        } catch (err) {
            console.log(err.response)
        }
    }
    const completeHabit = async (id) => {
        try {
            await axios.patch(`${process.env.REACT_APP_API_URL}/api/habits/${id}/complete`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            )
            fetchHabits()
        }
        catch (err) {
            console.log(err.response)
        }
    }
    const deleteHabit = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/habits/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            setHabits(habits.filter(habit => habit._id !== id))
        } catch (err) {
            console.log("Error deleting habit")
        }
    }

    useEffect(() => {

        fetchHabits()
        
    }, [])

    return (

        

        
        <div className="min-h-screen bg-gray-100 p-8">

                <nav className="bg-white shadow-sm mb-6 px-8 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-indigo-600">Smart Habit & Focus Tracker </h1>
                    <div className="flex gap-4">
                        <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600 font-medium">Dashboard</Link>
                        <Link to="/analytics" className="text-gray-600 hover:text-indigo-600 font-medium">Analytics</Link>
                        <Link to="/timer" className="text-gray-600 hover:text-indigo-600 font-medium">Timer</Link>
                        <button onClick={logout} className="text-red-500 hover:underline font-medium">Logout</button>
                    </div>
                </nav>

            <div className="max-w-xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">My Habits</h1>
                    <button onClick={logout} className="text-sm text-red-500 hover:underline">Logout</button>
                </div>

                <form onSubmit={addHabit} className="flex gap-2 mb-6">
                    <input
                        type="text"
                        placeholder="Add a new habit"
                        className="flex-1 border p-2 rounded"
                        value={habitName}
                        onChange={(e) => setHabitName(e.target.value)}
                    />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Add
                    </button>
                </form>

                {habits.map((habit) => (
                    <div key={habit._id} className="bg-white p-4 rounded-lg shadow-sm mb-3 flex justify-between items-center">
                        <div>
                            <p className={`font-medium ${habit.completed ? 'line-through text-gray-400' : ''}`}>
                                {habit.name}
                            </p>
                            <p className="text-sm text-gray-500">Streak: {habit.streak} days</p>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => completeHabit(habit._id)}
                                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${habit.completed
                                        ? "bg-green-500 border-green-500 text-white"
                                        : "border-gray-300 bg-transparent text-transparent hover:border-green-400"
                                    }`}
                            >
                                {habit.completed ? "✓" : ""}
                            </button>

                            <button
                                onClick={() => deleteHabit(habit._id)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}

                {habits.length === 0 && (
                    <p className="text-center text-gray-400 mt-10">No habits yet. Add one above!</p>
                )}
            </div>
        </div>
    )
}
