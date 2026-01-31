# 📒 NoteHub

NoteHub is a React application for creating, searching, paginating, and managing personal notes.  
The project was built with **Vite**, **TypeScript**, and follows modern best practices.

🔗 **Live demo:** _((https://05-notehub-f5j4misez-hannamuzychuks-projects.vercel.app/))_  
🔗 **Repository:** _((https://github.com/hannamuzychuk/05-notehub))_

---

## 🚀 Features

- Fetching notes from a remote backend
- Creating new notes
- Deleting existing notes
- Searching notes with debounced input
- Pagination of notes
- Modal window with form validation
- Fully typed with TypeScript
- Clean and modular project structure

---

## 🛠️ Tech Stack

- **React** + **TypeScript**
- **Vite**
- **Axios** – HTTP requests
- **TanStack Query** – server state management
- **Formik** + **Yup** – forms and validation
- **React Paginate** – pagination
- **use-debounce** – debounced search
- **CSS Modules**
- **modern-normalize**

---

## 📁 Project Structure

src/
├── components/
│ ├── App/
│ ├── NoteList/
│ ├── NoteForm/
│ ├── Modal/
│ ├── Pagination/
│ └── SearchBox/
├── services/
│ └── noteService.ts
├── types/
│ └── note.ts
├── main.tsx
└── index.css

Each component is placed in its own folder and contains:

- a `.tsx` file with the React component
- a `.module.css` file with styles

---

## 🔐 Environment Variables

To work with the backend, you need a personal API token.

Create a `.env` file in the root of the project:

```env
VITE_NOTEHUB_TOKEN=your_personal_token
⚠️ Do not commit the .env file to the repository.

📡 Backend
The application uses a ready-made backend API:

📄 Documentation:
https://notehub-public.goit.study/api/docs

The token is sent in the Authorization header:

Authorization: Bearer YOUR_TOKEN
▶️ Getting Started
Clone the repository:

git clone https://github.com/your-username/05-notehub.git
Install dependencies:

npm install
Start the development server:

npm run dev
```
