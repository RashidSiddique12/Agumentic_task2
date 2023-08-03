import React from 'react'
import "./Employee.css"
import axios from 'axios';

function Employee() {
    function handleLogout() {
        let y = new Date();
        // axios.patch("URL",y);
        console.log(y.getMinutes());
    }
    return (
        <div className='employee-container'>
            <h1>Welcome Employee</h1>
            <button className='logout-button' onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Employee