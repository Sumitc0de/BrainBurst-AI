# BrainBurst AI 🧠⚡
An AI-powered quiz-generating web app that helps users **learn, practice, and test knowledge** all in one place. Powered by **Gemini API** for intelligent quiz creation.

## 🚀 Features
- 🤖 **AI-Generated Quizzes** – Fresh quizzes every time using **Gemini API**.
- 📚 **Learning Section** – Study and practice concepts without leaving the platform.
- 🎨 **Modern UI** – Clean, responsive, and fast design using **React + TailwindCSS**.
- 🔐 **Authentication (Frontend)** – User login/signup implemented with `localStorage`.
- 💾 **Local Storage** – Save user quizzes and progress directly in the browser.
- ⚡ **Fully Frontend Project** – Easy to set up, no complex backend required.

## 🛠️ Tech Stack
- **Frontend:** React.js, TailwindCSS
- **AI Integration:** Gemini API
- **Storage & Auth:** LocalStorage

## 📸 Screenshots
> *(Add screenshots/gifs of your UI here for better presentation)*

## 📂 Project Structure
```
BrainBurst-AI/
│-- public/           # Static files
│-- src/
│   │-- components/   # Reusable UI components
│   │-- pages/        # Different app pages (Quiz, Learn, Progress, etc.)
│   │-- context/      # User auth & global state
│   │-- App.js        # Main app entry
│   │-- index.js      # React root
│-- package.json
│-- tailwind.config.js
│-- README.md
```

## ⚙️ Installation & Setup
Clone the repository and install dependencies:
```bash
# Clone repo
git clone https://github.com/your-username/BrainBurst-AI.git

# Go into project folder
cd BrainBurst-AI

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🔑 Environment Variables
Create a `.env` file in the root directory and add your Gemini API key:
```
VITE_GEMINI_API_KEY=your_api_key_here
```

## 📖 Usage
1. **Sign up / Log in** using your email.
2. **Generate a Quiz** – AI (Gemini API) will create fresh questions.
3. **Learn & Practice** from the learning section.
4. **Track your progress** – quizzes saved in localStorage.

## 🌟 Future Improvements
- ⛅ Add a backend (Node.js + MongoDB) for secure authentication & storage.
- 📊 Detailed quiz analytics and leaderboard.
- 🌐 Multi-language quiz support.
- 📱 Mobile app version.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!
Feel free to fork this repo and submit a pull request.

## 📜 License
This project is licensed under the **MIT License**.
