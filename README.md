# Task Manager App 📝

A simple **Task Manager App** built using **React.js** (Frontend) and **Node.js with JSON file storage** (Backend).

## 🚀 Features
- **Add Tasks** 🆕
- **View Tasks** 👀
- **Mark as Completed** ✅
- **Delete Tasks** ❌
- **Data stored in JSON file** 📄 (instead of database)

## 🛠 Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Data Storage:** JSON File

## 📦 Installation & Setup

1. **Clone the repository**  
   ```sh
   git clone https://github.com/SatishBytes/task-manager-app.git
   cd task-manager-app
   
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install


cd server
npm start

cd ../client
npm start


Method	Endpoint	Description
GET	/tasks	Get all tasks
POST	/tasks	Add a new task
PUT	/tasks/:id	Update a task
DELETE	/tasks/:id	Delete a task
