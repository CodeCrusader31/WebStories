# Web Stories Platform

A web application to create, manage, and view short visual stories (images/videos), similar to Instagram-style web stories.  
Includes an admin dashboard with secure authentication.

---

## 🌐 Live Demo
**Frontend:** https://web-stories-puce.vercel.app/  
**Backend:** https://webstories-server.onrender.com/

---

## ✨ Features
- Admin Login (JWT Authentication)
- Add / Edit / Delete Stories
- Upload Images & Videos to Cloudinary
- Stories stored in MongoDB Atlas
- Story Player with auto-play & click-next
- Protected Admin Dashboard

---

## 🛠 Tech Stack
| Layer | Technology |
|------|------------|
| Frontend | React (Vite), Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| File Uploads | Cloudinary |
| Authentication | JSON Web Token (JWT) |

---

## 📂 Project Structure


---

## 🏁 How to Run the Project Locally

### 1️⃣ Clone the Repository
```bash
git clone <your-repository-url>
cd project-root

cd server
npm install

PORT=5000
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD=1234
JWT_SECRET=your_jwt_secret

run server
node index.js
http://localhost:5000


run client
cd ../client
npm install
npm run dev
http://localhost:5173


http://localhost:5173/admin/login
Username: admin
Password: 1234

How the Platform Works

Admin logs in → receives a JWT Token.

Token allows managing stories from the dashboard.

Slides (images/videos) are uploaded to Cloudinary.

Story metadata and media URLs are stored in MongoDB.

Users can view stories in an auto-playing story viewer.


✅ Completed Functionality

Full CRUD for Stories

Secure Authentication

Cloud Upload Storage

Story Playback UI

Frontend & Backend Deployments










