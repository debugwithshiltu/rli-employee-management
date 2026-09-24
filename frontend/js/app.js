const API_URL = '/api';

// DOM Elements
const employeeList = document.getElementById('employeeList');
const totalEmpCount = document.getElementById('totalEmpCount');
const activeEmpCount = document.getElementById('activeEmpCount');
const modal = document.getElementById('addModal');
const btn = document.getElementById('addEmpBtn');
const span = document.getElementsByClassName('close')[0];
const form = document.getElementById('addEmployeeForm');

// Load Data on startup
document.addEventListener('DOMContentLoaded', () => {
    fetchStats();
    fetchEmployees();
});

// Fetch Dashboard Stats
async function fetchStats() {
    try {
        const res = await fetch(`${API_URL}/stats`);
        const data = await res.json();
        totalEmpCount.innerText = data.total || 0;
        activeEmpCount.innerText = data.active || 0;
    } catch (err) {
        console.error('Error fetching stats:', err);
    }
}

// Fetch and Render Employees
async function fetchEmployees() {
    try {
        const res = await fetch(`${API_URL}/employees`);
        const employees = await res.json();
        
        employeeList.innerHTML = '';
        employees.forEach(emp => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${emp.id}</td>
                <td>${emp.name}</td>
                <td>${emp.department}</td>
                <td>${emp.designation}</td>
                <td>${emp.emp_type}</td>
                <td><span style="color: ${emp.status === 'Active' ? 'green' : 'red'}">${emp.status}</span></td>
                <td><button class="btn-danger" onclick="deleteEmployee('${emp.id}')">Delete</button></td>
            `;
            employeeList.appendChild(tr);
        });
    } catch (err) {
        console.error('Error fetching employees:', err);
    }
}

// Add New Employee
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const newEmp = {
        id: document.getElementById('empId').value,
        name: document.getElementById('empName').value,
        department: document.getElementById('empDept').value,
        designation: document.getElementById('empDesig').value,
        emp_type: document.getElementById('empType').value,
        location: document.getElementById('empLoc').value,
        joining_date: document.getElementById('empDate').value,
        status: 'Active'
    };

    try {
        const res = await fetch(`${API_URL}/employees`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newEmp)
        });
        
        if (res.ok) {
            modal.style.display = "none";
            form.reset();
            fetchStats();
            fetchEmployees();
        } else {
            const error = await res.json();
            alert(`Error: ${error.error}`);
        }
    } catch (err) {
        console.error('Error adding employee:', err);
    }
});

// Delete Employee
async function deleteEmployee(id) {
    if (confirm(`Are you sure you want to delete employee ${id}?`)) {
        try {
            await fetch(`${API_URL}/employees/${id}`, { method: 'DELETE' });
            fetchStats();
            fetchEmployees();
        } catch (err) {
            console.error('Error deleting employee:', err);
        }
    }
}

// Modal Logic
btn.onclick = () => modal.style.display = "block";
span.onclick = () => modal.style.display = "none";
window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
