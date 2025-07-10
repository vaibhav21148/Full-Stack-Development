
# 🎬 MyTube - A YouTube Clone

MyTube is a YouTube-like video-sharing platform built using **React.js** for the frontend and **Django REST Framework** for the backend. It allows users to upload, watch, like, and comment on videos — just like the real thing.

This project was built as part of **Week 4** of the Full Stack Web Development course at **Learners Space**.

---

## 🚀 Features

- ✅ Register, Login, Logout (Token-based authentication)
- ✅ Upload videos with title and description
- ✅ View list of all uploaded videos on homepage
- ✅ Watch videos in a dedicated video player page
- ✅ Like videos ❤️
- ✅ Add to Watch Later 🕒
- ✅ Comment on videos 💬
- ✅ User Dashboard to view own uploads and watch
- ✅ Search videos by title
- ✅ Protected routes and clean UI with Bootstrap

---

## 🛠 Tech Stack

**Frontend:**
- React.js
- Axios
- React Router DOM
- Bootstrap 5

**Backend:**
- Django
- Django REST Framework (DRF)
- Token Authentication

---

## 📁 Folder Structure

```
MyTube/
├── backend/
│   ├── api/               # Django app (models, views, serializers)
│   ├── backend/           # Django project settings
│   ├── media/             # Uploaded video files
│   ├── db.sqlite3         # Database
│   └── manage.py
├── frontend/
│   ├── src/
│   │   ├── components/    # React components (Home, Upload, VideoPlayer, etc.)
│   │   ├── App.js
│   │   ├── axiosConfig.js
│   │   └── index.js
│   └── package.json
└── README.md              

---

### 🐍 Backend Setup

```bash
cd backend
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

### 🌐 Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend: http://localhost:3000  
Backend API: http://127.0.0.1:8000/api/

---


## 📚 Possible Future Enhancements

- Edit/Delete video option
- User profile page
- Tags and categories
- Playlists
- Video analytics (views)
- Deployment (Netlify + Render)

---

## 🧑‍💻 Author

**Vaibhav**  
Full Stack Web Development | IIT Bombay | Week 4 Project

---
