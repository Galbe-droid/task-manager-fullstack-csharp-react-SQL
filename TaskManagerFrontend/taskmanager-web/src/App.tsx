import { Route, Routes } from 'react-router-dom'
import './App.css'
import AddTaskPage from './pages/AddTaskPage'
import DashboardPage from './pages/DashboardPage'
import EditTaskPage from './pages/EditTaskPage'
import ViewTaskPage from './pages/ViewTaskPage'
import RegisterUserPage from './pages/RegisterUserPage'
import LoginUserPage from './pages/LoginUserPage'
import PublicRoute from './routes/PublicRoute'
import PrivateRoute from './routes/PrivateRoute'
import api from './api/api'
import Layout from './layout/Layout'

const token = localStorage.getItem("token");

if(token){
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

function App() {

  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<DashboardPage/>}></Route>
        <Route path="/register" element={<PublicRoute><RegisterUserPage/></PublicRoute>}></Route>
        <Route path='/login' element={<PublicRoute><LoginUserPage/></PublicRoute>}></Route>
        <Route path='/view/:id' element={<PrivateRoute><ViewTaskPage/></PrivateRoute>}></Route>
        <Route path="/todos/add" element={<PrivateRoute><AddTaskPage/></PrivateRoute>}></Route>
        <Route path="/edit/:id" element={<PrivateRoute><EditTaskPage/></PrivateRoute>}></Route>
      </Route>
    </Routes>
  )
}

export default App
