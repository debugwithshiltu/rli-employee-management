from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
from config import Config

app = Flask(__name__)
CORS(app)

def get_db_connection():
    return mysql.connector.connect(
        host=Config.DB_HOST,
        user=Config.DB_USER,
        password=Config.DB_PASSWORD,
        database=Config.DB_NAME
    )

@app.route('/api/stats', methods=['GET'])
def get_stats():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT COUNT(*) as total, SUM(CASE WHEN status = 'Active' THEN 1 ELSE 0 END) as active FROM employees")
    stats = cursor.fetchone()
    cursor.close()
    conn.close()
    return jsonify(stats), 200

@app.route('/api/employees', methods=['GET'])
def get_employees():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM employees ORDER BY joining_date DESC")
    employees = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(employees), 200

@app.route('/api/employees', methods=['POST'])
def add_employee():
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(
            """INSERT INTO employees (id, name, designation, department, location, joining_date, status, emp_type)
               VALUES (%s, %s, %s, %s, %s, %s, %s, %s)""",
            (data['id'], data['name'], data['designation'], data['department'], 
             data['location'], data['joining_date'], data.get('status', 'Active'), data['emp_type'])
        )
        conn.commit()
        return jsonify({"message": "Employee added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    finally:
        cursor.close()
        conn.close()

@app.route('/api/employees/<emp_id>', methods=['DELETE'])
def delete_employee(emp_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM employees WHERE id = %s", (emp_id,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Employee deleted successfully"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
