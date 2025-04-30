
# 🔐 PassOP - Your Personal Password Manager

**PassOP** is a full-stack password manager web application built with the MERN stack (MongoDB, Express, React, Node.js). It allows users to store, view, edit, and delete their passwords securely in one place.

---
## 📸 Screenshots (optional)

![Screenshot (2)](https://github.com/user-attachments/assets/fca1e980-d7f7-4b19-86ba-00ff01eaa706)


---
## 🚀 Features

- ✅ Add new passwords with site, username, and password fields
- 🖊️ Edit and update saved passwords
- 🗑️ Delete passwords with confirmation
- 👁️ Toggle password visibility
- 📋 Copy any field (site, username, or password) to clipboard
- 🎉 Toast notifications for feedback
- 🔐 Unique ID generation for each password using `uuid`
- ⚡ Fast and responsive UI

---

## 🛠️ Tech Stack

- **Frontend:** React, TailwindCSS, react-toastify
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Other Tools:** UUID, LordIcon, Fetch API

---

## ⚙️ Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/bhaveshk22/Password-Manager.git
cd Password-Manager
```

### 2. Install dependencies for both client and server
```bash
# Frontend
npm install

# Backend
cd server
npm install

```

### 3. Start the development servers

```bash
# Start React frontend (port 5173)
npm run dev

# In a new terminal: start backend server (port 3000)
cd server
node index.js

```

### 4. Set up MongoDB

- Create a free MongoDB Atlas cluster or run MongoDB locally
- Add your MongoDB connection string in the server code (e.g. in `server.js`)

```js
const uri = "your_mongo_uri_here"
```

---

## 🔐 Environment Variables (Optional)

You can use a `.env` file in `server/` for better security:

```
MONGO_URI=your_mongodb_uri
PORT=3000
```

Then use `dotenv` in your server:

```js
require('dotenv').config()
```

---

## 📦 Future Improvements

- Add user authentication (JWT or NextAuth)
- Encrypt passwords before storing (e.g., AES)
- Add password strength indicator
- Responsive mobile layout
- Export/import feature

---

## 🤝 Contributing

Pull requests are welcome! Feel free to fork this repo and improve on it.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
