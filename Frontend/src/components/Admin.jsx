import React, { useState } from "react";
import "../styles/Admin.css";

function Admin({ removeAuth }) {
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleRegisterEmployee = (e) => {
    e.preventDefault();
    //  logic to register the employee

    
    setName("");
    setContactNumber("");
    setEmail("");
    setGender("");
    
    setShowPopup(true); 
  };

  return (
    <div className="admin-container">
      <h1>Employee Register and Track Record</h1>
      <div className="admin-form-container">
        <form>
          <div className="input-field">
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="input-field">
            <label>Contact Number</label>
            <input type="tel" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />
          </div>
          <div className="input-field">
            <label>Email ID</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="input-field">
            <label>Gender</label>
            <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} required />
          </div>
          <div className="input-field">
            <label>Upload Profile Photo</label>
            <input type="file" accept="image/*" required />
          </div>
          <button id="update-btn" onClick={handleRegisterEmployee}>Register Employee</button>
        </form>
      </div>

      <button id="logout-btn" onClick={removeAuth}>
        Log out
      </button>

      {showPopup && (
        <div className="popup">
          <p>Employee registered successfully!</p>
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default Admin;
