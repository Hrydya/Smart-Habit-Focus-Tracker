import { useState, useEffect, useContext } from "react"
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#3b82f6']

export default function Analytics() {
        const { token } = useContext(AuthContext)
        const [analytics, setAnalytics] = useState(null)
        const [loading, setLoading] = useState(true)
        const [error, setError] = useState('')

        useEffect(() => {
                fetchAnalytics()
        }, [])

        async function fetchAnalytics() {
                try {
                        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/habits/analytics`, {
                                headers: { Authorization: `Bearer ${token}` }
                        })
                        setAnalytics(data)
                } catch (err) {
                        setError('Failed to load analytics')
                } finally {
                        setLoading(false)
                }
        }

        if (loading) return (
                <div className="min-h-screen bg-gray-100 p-8">
                        <div className="max-w-4xl mx-auto animate-pulse space-y-4">
                                <div className="h-8 bg-gray-300 rounded w-1/3"></div>
                                <div className="h-64 bg-gray-300 rounded"></div>
                                <div className="h-64 bg-gray-300 rounded"></div>
                        </div>
                </div>
        )

        if (error) return (
                <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                        <p className="text-red-500 text-lg">{error}</p>
                </div>
        )

        return (
                <div className="min-h-screen bg-gray-100 p-8">
                        <div className="max-w-4xl mx-auto space-y-8">

                                <h1 className="text-3xl font-bold text-gray-800">Analytics 📊</h1>

                                {/* Smart Insight */}
                                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
                                        <p className="text-indigo-700 font-medium text-lg">💡 {analytics.insight}</p>
                                </div>

                                {/* Bar Chart */}
                                <div className="bg-white rounded-xl shadow p-6">
                                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Completions This Week</h2>
                                        <ResponsiveContainer width="100%" height={250}>
                                                <BarChart data={analytics.completionsPerDay}>
                                                        <XAxis dataKey="date" />
                                                        <YAxis />
                                                        <Tooltip />
                                                        <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
                                                </BarChart>
                                        </ResponsiveContainer>
                                </div>

                                {/* Streak Leaderboard */}
                                <div className="bg-white rounded-xl shadow p-6">
                                        <h2 className="text-xl font-semibold mb-4 text-gray-700">🔥 Streak Leaderboard</h2>
                                        {analytics.streakLeaderboard.map((habit, i) => (
                                                <div key={i} className="flex justify-between items-center py-3 border-b last:border-0">
                                                        <span className="font-medium text-gray-700">{habit.name}</span>
                                                        <span className="text-orange-500 font-bold">🔥 {habit.streak} days</span>
                                                </div>
                                        ))}
                                </div>

                                {/* Pie Chart */}
                                <div className="bg-white rounded-xl shadow p-6">
                                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Habit Completion Split</h2>
                                        <ResponsiveContainer width="100%" height={250}>
                                                <PieChart>
                                                        <Pie data={analytics.habitCompletion} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                                                {analytics.habitCompletion.map((_, i) => (
                                                                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                                                ))}
                                                        </Pie>
                                                        <Tooltip />
                                                </PieChart>
                                        </ResponsiveContainer>
                                </div>

                        </div>
                </div>
        )
}