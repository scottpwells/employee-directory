import React, { useEffect, useState } from "react";
import axios from "axios";

const Table = () => {
  const [employees, setEmployees] = useState([]);
  const [employeesToDisplay, setEmployeesToDisplay] = useState([]);
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("https://randomuser.me/api/?results=50").then((response) => {
      console.log(response.data);
      setEmployeesToDisplay(response.data.results);
      setEmployees(response.data.results);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredEmployees = employees.filter((employee) => {
      return employee.phone.includes(searchTerm);
    });

    setEmployeesToDisplay(filteredEmployees);
  };

  const handleReset = () => {
    setEmployeesToDisplay(employees);
  };

  const sortByName = () => {
    if (sortDirection === "asc") {
      sortByNameAsc();
      setSortDirection("desc");
    } else {
      sortByNameDesc();
      setSortDirection("asc");
    }
  };

  const sortByNameAsc = () => {
    const tempEmployees = [...employees];
    const sortedEmployees = tempEmployees.sort((a, b) => {
      const aValue = a.name.first;
      const bValue = b.name.first;
      if (aValue < bValue) {
        return -1;
      }
      if (aValue > bValue) {
        return 1;
      }
      return 0;
    });
    console.log(sortedEmployees);
    setEmployeesToDisplay(sortedEmployees);
  };

  const sortByNameDesc = () => {
    const tempEmployees = [...employees];
    const sortedEmployees = tempEmployees.sort((a, b) => {
      const aValue = a.name.first;
      const bValue = b.name.first;
      if (aValue > bValue) {
        return -1;
      }
      if (aValue < bValue) {
        return 1;
      }
      return 0;
    });
    console.log(sortedEmployees);
    setEmployeesToDisplay(sortedEmployees);
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter phone number to filter"
            name="searchTerm"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          ></input>
          <button className="btn btn-primary">Search</button>
          <button
            className="btn btn-secondary"
            onClick={handleReset}
            type="button"
          >
            Reset
          </button>
        </form>
      </div>
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Photo</th>
              <th scope="col" onClick={sortByName}>
                Name
              </th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">DOB</th>
            </tr>
          </thead>
          <tbody>
            {employeesToDisplay.map((employee, index) => (
              <tr key={index}>
                <th scope="row">{employee.id.value}</th>
                <td>
                  <img src={employee.picture.thumbnail} alt={employee.name.first}></img>
                </td>
                <td>
                  {employee.name.first} {employee.name.last}
                </td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
                <td>{employee.dob.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;