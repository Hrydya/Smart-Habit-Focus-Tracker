import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Timer from './pages/Timer.jsx'
import Analytics from './pages/Analytics.jsx'
import { AuthProvider } from './context/AuthContext.js'
import ProtectedRoute from './components/ProtectedRoute.jsx'

export default function App(){
   return (
    <AuthProvider>
           <Router>
               <Routes>
                   <Route path='/' element={<Login />} />
                   <Route path="/login" element={<Login />} />
                   <Route path="/register" element={<Register />} />
                   <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                   <Route path="/timer" element={<ProtectedRoute><Timer /></ProtectedRoute>} />
                   <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
               </Routes>
           </Router>
    </AuthProvider>
   )
}