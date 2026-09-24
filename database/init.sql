CREATE DATABASE IF NOT EXISTS rli_db;
USE rli_db;

CREATE TABLE employees (
    id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    designation VARCHAR(100),
    department VARCHAR(50),
    location VARCHAR(50),
    joining_date DATE,
    status VARCHAR(20) DEFAULT 'Active',
    emp_type VARCHAR(50)
);

INSERT INTO employees (id, name, designation, department, location, joining_date, status, emp_type) VALUES
('RLI001', 'Rahul Kumar', 'Apprentice Trainee', 'RLI', 'Farakka', '2025-08-12', 'Active', 'Apprentice'),
('RLI002', 'Amit Das', 'Senior Officer', 'Electrical', 'Farakka', '2022-04-01', 'Active', 'Officer'),
('RLI003', 'Priya Sharma', 'HR Executive', 'HR', 'Farakka', '2023-11-15', 'Active', 'Employee');
