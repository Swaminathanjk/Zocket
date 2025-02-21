# 📝 AI-Powered Task Management System

## 🚀 Project Overview
This is an AI-powered task management system that helps users create, update, and organize tasks efficiently. The application also features **AI-generated task suggestions** using Google Gemini API.

## 🔥 Features
- ✅ **User Authentication** – Secure login and registration with JWT  
- ✅ **Task Management** – Create, Read, Update, and Delete (CRUD) operations  
- ✅ **AI Task Suggestions** – Get AI-generated task ideas with **Google Gemini API**  
- ✅ **Real-time Task Status Updates** – Manage pending, in-progress, and completed tasks  
- ✅ **Fully Responsive UI** – Works seamlessly on desktop and mobile  
- ✅ **Frontend & Backend Deployed on Render**  

---

## 🛠 **Tech Stack**
### **Frontend:**
- ⚡ **React (Vite)**
- 🎨 **Vanilla CSS** (for styling)
- 🔗 **Axios** (for API calls)

### **Backend:**
- 🌐 **Node.js & Express.js**
- 🛢 **MongoDB & Mongoose** (Database)
- 🔐 **JWT Authentication**
- 🤖 **Google Gemini API** (for AI suggestions)
- 🌍 **CORS & dotenv** (for security & configuration)

---

## 🌍 **Live Demo**
🚀 **Frontend:** [Your Frontend URL]([https://zocket-frontend.onrender.com])  
🔗 **Backend API:** [Your Backend URL](https://your-backend.onrender.com/api)  

---

## 🛠 **Installation & Setup**
Follow these steps to set up the project locally:

1️⃣ **Clone the Repository**  
```sh
git clone https://github.com/your-username/your-repo.git
cd your-repo



 2️⃣ Install Dependencies

cd Frontend/zocket_task
npm install  # Install frontend dependencies

cd ../backend
npm install  # Install backend dependencies


3️⃣ Set Up Environment Variables

Create a .env file in the backend directory and add:

MONGO_URI=your_mongodb_uri
PORT=5000
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_google_gemini_api_key


4️⃣ Run the Project

# Start the Backend
cd backend
npm start

# Start the Frontend
cd ../Frontend/zocket_task
npm run dev 


 API Endpoints

 Authentication

POST	[/api/auth/register]	Register a new user
POST	[/api/auth/login]	Login and get JWT token
GET	[/api/auth/user]	Get current user details

 Tasks

GET	[/api/tasks]	Get all tasks
POST	[/api/tasks]	Create a new task
PUT	[/api/tasks/:id]	Update task status
DELETE	[/api/tasks/:id]	Delete a task

 AI Task Suggestions


POST	[/api/ai/suggest]	Get AI-generated task ideas
```


## 🎥 **Demo Video**
📺 **Watch the Full Demo Here:** [Your Video Link](https://your-video-link.com)

---

## 🤖 **How AI Tools Helped**
We integrated **Google Gemini API** to generate **smart task suggestions**.

### **How It Works:**
1️⃣ User enters a **task idea**  
2️⃣ The system sends the input to **Google Gemini API**  
3️⃣ AI processes the request and **returns structured task suggestions**  
4️⃣ The suggestions appear dynamically in the UI  

### **Benefits of AI Integration:**
- 🚀 **Saves time** – Users get instant task ideas  
- 🎯 **Enhances productivity** – Helps in better task planning  
- 🔍 **More intelligent workflow** – AI-generated structured tasks  

---

## 👨‍💻 **Contributors**
- **[Your Name](https://github.com/your-username)**

