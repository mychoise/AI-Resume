# 🌟 Vibe Coded - AI Job Application Assistant

An intelligent job application platform that leverages AI to help professionals create tailored emails and optimize their job search process. Transform LinkedIn job posts into personalized outreach emails with ATS insights and interview predictions.

## 🚀 Features

### AI-Powered Email Generation
- **Smart Email Crafting**: Generates professional, personalized emails from LinkedIn job descriptions
- **Role-Specific Tailoring**: Customizes content based on your preferred role
- **ATS Optimization**: Ensures emails pass through automated screening systems

### Intelligent Analytics
- **Interview Chance Prediction**: AI-powered likelihood of landing an interview
- **ATS Scoring**: Comprehensive evaluation with detailed breakdown
- **Skills Gap Analysis**: Identifies matching and missing skills
- **Keyword Optimization**: Maximizes relevance to job requirements

### Modern User Experience
- **Intuitive Interface**: Clean, responsive design built with React and Tailwind CSS
- **Real-time Editing**: Review and modify AI-generated content before sending
- **Seamless Workflow**: Paste job post → Generate → Review → Send

## 🎨 Tech Stack

### Frontend
- **React 19.2.3** - Modern UI framework with hooks
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first styling for rapid development
- **Zustand** - Lightweight state management
- **React Router** - Client-side routing
- **Axios** - HTTP client with interceptors
- **React Hot Toast** - Beautiful notification system
- **Lucide React** - Consistent icon library

### Backend
- **Node.js** - JavaScript runtime with ES modules
- **Express** - Fast, minimalist web framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - Elegant MongoDB object modeling
- **JWT** - Secure authentication with tokens
- **Cloudinary** - Cloud-based file storage and optimization
- **PDF-Parse** - Resume content extraction and analysis
- **Nodemailer** - Reliable email delivery service
- **Google Gemini AI** - Advanced language model for content generation

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB instance running locally
- Google Gemini API key
- Cloudinary account (for file uploads)
- SMTP service for email delivery

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/vibe-coded.git
   cd vibe-coded
   ```

2. **Install dependencies**
   ```bash
   # Backend dependencies
   cd server
   npm install
   
   # Frontend dependencies
   cd ../client
   npm install
   ```

3. **Environment configuration**
   
   Create `.env` file in `server` directory:
   ```env
   # Database
   MONGO_URI="mongodb://localhost:27017/ai"
   
   # Authentication
   JWT_SECRET="your-super-secure-jwt-secret-here"
   
   # File Storage
   CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
   CLOUDINARY_API_KEY="your-cloudinary-api-key"
   CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
   
   # AI Services
   GEMINI_API_KEY="your-gemini-api-key"
   
   # Email Service
   SMTP_USER="your-smtp-username"
   SENDER_EMAIL="your-sender-email"
   SMTP_PASS="your-smtp-password"
   ```

4. **Launch the application**
   
   Start both services in separate terminals:
   ```bash
   # Terminal 1 - Backend server
   cd server
   npm run dev
   
   # Terminal 2 - Frontend development
   cd client
   npm run dev
   ```

5. **Access points**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000

## 📡 API Documentation

### Authentication Endpoints
- `POST /api/user/register` - Create new user account
- `POST /api/user/login` - Authenticate user and receive token
- `POST /api/user/logout` - Invalidate user session

### Profile Management
- `GET /api/user/profile` - Retrieve user profile and resume data
- `PUT /api/user/profile` - Update profile information (supports file upload)

### Email & AI Services
- `POST /api/job/email` - Generate AI-powered email with insights
- `POST /api/job/email/send` - Send generated email to recipient

### Email Generation Response
```json
{
  "subject": "Senior Software Engineer Application",
  "emailBody": "Dear Hiring Manager...",
  "interviewChance": 85,
  "matchingSkills": ["React", "Node.js", "TypeScript"],
  "missingSkills": ["GraphQL", "Kubernetes"],
  "atsScore": 92,
  "aiRecommendation": "Strong match with 85% interview chance",
  "scoreBreakdown": {
    "keywordMatch": 95,
    "experienceRelevance": 88,
    "educationMatch": 90,
    "clarity": 94
  }
}
```

## 🏗️ Project Architecture

```
vibe-coded/
├── client/                    # React frontend application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── EmailInsights.tsx
│   │   ├── layouts/           # Layout wrapper components
│   │   │   └── MainLayout.tsx
│   │   ├── pages/             # Route-based page components
│   │   │   ├── Home.tsx
│   │   │   ├── Email.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   └── Profile.tsx
│   │   ├── store/             # Zustand state management
│   │   │   ├── useEmailStore.ts
│   │   │   └── useUser.ts
│   │   ├── lib/              # Utility functions
│   │   │   └── axios.ts
│   │   └── App.tsx           # Main application component
│   └── package.json
├── server/                    # Node.js backend API
│   ├── config/               # Configuration files
│   │   ├── dbConnect.js
│   │   └── Image.config.js
│   ├── controllers/          # Request handlers
│   │   ├── user.controller.js
│   │   └── job.controller.js
│   ├── middleware/           # Express middleware
│   │   ├── protect.js
│   │   └── errorHandler.middleware.js
│   ├── models/              # Mongoose schemas
│   │   ├── user.model.js
│   │   └── resume.model.js
│   ├── routes/              # API route definitions
│   │   ├── user.route.js
│   │   └── job.route.js
│   ├── services/            # Business logic
│   │   └── email.service.js
│   └── server.js            # Application entry point
└── README.md
```

## 🧠 AI Capabilities

### Email Generation
- **Context Understanding**: Analyzes job descriptions for key requirements
- **Personalization**: Incorporates user profile and resume data
- **Professional Tone**: Maintains appropriate business communication style
- **Subject Line Optimization**: Creates compelling email subjects

### Analytics Engine
- **Interview Probability**: Machine learning-based prediction model
- **ATS Compatibility**: Evaluates against common screening criteria
- **Skills Assessment**: Compares job requirements with user qualifications
- **Score Breakdown**: Detailed metrics across multiple dimensions

### Content Optimization
- **Keyword Integration**: Strategic placement of relevant terms
- **Experience Highlighting**: Emphasizes most relevant achievements
- **Clarity Enhancement**: Improves readability and impact
- **Format Compliance**: Ensures professional email standards

## 📱 Usage Guide

### 1. Account Setup
- Register with email and password
- Complete profile with personal information
- Upload resume for AI analysis

### 2. Email Generation
- Navigate to Email Composer
- Input target company email address
- Paste LinkedIn job posting
- Select preferred role/position
- Click "AI Assist" for generation

### 3. Review & Send
- Review AI-generated subject and content
- Edit as needed for personalization
- View insights panel for analytics
- Send email with confidence

### 4. Track Performance
- Monitor sent emails in dashboard
- Analyze response rates
- Refine approach based on AI recommendations

## 🚀 Development Scripts

### Backend Commands
```bash
npm run dev    # Start development server with hot reload
npm start       # Start production server
npm test        # Run test suite
```

### Frontend Commands
```bash
npm run dev    # Start Vite development server
npm run build  # Build for production deployment
npm run start  # Preview production build locally
npm run lint   # Run ESLint for code quality
```

## 🔧 Environment Variables

| Variable | Description | Required | Example |
|-----------|-------------|-----------|----------|
| `MONGO_URI` | MongoDB connection string | ✅ | `mongodb://localhost:27017/ai` |
| `JWT_SECRET` | JWT signing secret | ✅ | `your-super-secure-secret` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | ✅ | `my-cloud` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | ✅ | `1234567890` |
| `CLOUDINARY_API_SECRET` | Cloudinary secret | ✅ | `abc123def456` |
| `GEMINI_API_KEY` | Google Gemini API key | ✅ | `AIzaSy...` |
| `SMTP_USER` | SMTP service username | ✅ | `user@gmail.com` |
| `SENDER_EMAIL` | Sender email address | ✅ | `noreply@yourapp.com` |
| `SMTP_PASS` | SMTP service password | ✅ | `app-password` |

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
   ```bash
   git fork https://github.com/yourusername/vibe-coded.git
   ```

2. **Create feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make changes**
   - Follow existing code style
   - Add tests for new features
   - Update documentation

4. **Commit and push**
   ```bash
   git commit -m "Add amazing feature"
   git push origin feature/amazing-feature
   ```

5. **Create Pull Request**
   - Provide clear description of changes
   - Include screenshots if applicable
   - Link relevant issues

## 📄 License

This project is licensed under the MIT License - feel free to use, modify, and distribute.

## 🆘 Support & Feedback

For questions, bug reports, or feature requests:

- 📧 Open an issue on GitHub
- 📧 Contact development team
- 💬 Join our community discussions

---

**🌟 Built with passion for modern job seekers**  
**Transform your job search with AI-powered intelligence**

---

*Vibe Coded - Where AI meets opportunity*
