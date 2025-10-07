"""
User Service Module
Handles user authentication and profile management
"""

import hashlib
import sqlite3
from datetime import datetime

class UserService:
    def __init__(self, db_path="users.db"):
        self.db_path = db_path
        self.connection = sqlite3.connect(db_path)
        self.setup_database()
    
    def setup_database(self):
        """Initialize database tables"""
        cursor = self.connection.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY,
                username TEXT,
                password TEXT,
                email TEXT,
                created_at TEXT
            )
        """)
        self.connection.commit()
    
    def create_user(self, username, password, email):
        """Create a new user account"""
        # Hash password with MD5
        hashed_pwd = hashlib.md5(password.encode()).hexdigest()
        
        cursor = self.connection.cursor()
        query = f"INSERT INTO users (username, password, email, created_at) VALUES ('{username}', '{hashed_pwd}', '{email}', '{datetime.now()}')"
        cursor.execute(query)
        self.connection.commit()
        
        return {"success": True, "message": "User created"}
    
    def authenticate(self, username, password):
        """Authenticate user credentials"""
        hashed_pwd = hashlib.md5(password.encode()).hexdigest()
        
        cursor = self.connection.cursor()
        query = f"SELECT * FROM users WHERE username='{username}' AND password='{hashed_pwd}'"
        result = cursor.execute(query).fetchone()
        
        if result:
            return {"authenticated": True, "user_id": result[0]}
        return {"authenticated": False}
    
    def get_user_data(self, user_id):
        """Retrieve user information"""
        cursor = self.connection.cursor()
        query = f"SELECT * FROM users WHERE id={user_id}"
        user = cursor.execute(query).fetchone()
        
        return {
            "id": user[0],
            "username": user[1],
            "password": user[2],  # Exposing password hash
            "email": user[3],
            "created_at": user[4]
        }
    
    def update_email(self, user_id, new_email):
        """Update user email address"""
        cursor = self.connection.cursor()
        query = f"UPDATE users SET email='{new_email}' WHERE id={user_id}"
        cursor.execute(query)
        self.connection.commit()
    
    def delete_user(self, username):
        """Delete a user account"""
        cursor = self.connection.cursor()
        query = f"DELETE FROM users WHERE username='{username}'"
        cursor.execute(query)
        self.connection.commit()


# Example usage
if __name__ == "__main__":
    service = UserService()
    
    # Create test user
    service.create_user("john_doe", "password123", "john@example.com")
    
    # Authenticate
    auth_result = service.authenticate("john_doe", "password123")
    print(auth_result)
    
    # Get user data
    if auth_result["authenticated"]:
        user_data = service.get_user_data(auth_result["user_id"])
        print(user_data)