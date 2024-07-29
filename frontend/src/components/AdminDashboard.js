import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
    const navigate = useNavigate()
    function handleSubmit(){
        navigate('/choice')
    }
  return (
    <div>
        <button onClick={handleSubmit}>upload files </button>
    </div>
  )
}

export default AdminDashboard