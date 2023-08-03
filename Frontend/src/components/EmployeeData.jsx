import React, { useEffect, useState } from 'react';
import "../styles/EmployeeData.css";

const EmployeeData = () => {
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    fetch('/api/employees')
      .then((response) => response.json())
      .then((data) => setEmployeeData(data))
      .catch((error) => console.error('Error fetching employee data:', error));
  }, []);

  return (
    <div className="employee-data-container">
        <center>
      <h2>Employee Data</h2>
      <table>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Total Timespent(in minutes)</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.map((employee, index) => (
            <tr key={index}>
              <td>{employee.name}</td>
              <td>{employee.timespent}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </center>
    </div>
  );
};

export default EmployeeData;
