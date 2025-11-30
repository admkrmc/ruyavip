# CLAUDE.md - AI Assistant Guide for Rüya VİP

> **Purpose:** This document provides comprehensive guidance for AI assistants (like Claude) working on the Rüya VİP codebase. It explains the architecture, conventions, and workflows to enable efficient and consistent development.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture & Tech Stack](#architecture--tech-stack)
3. [Project Structure](#project-structure)
4. [Development Workflows](#development-workflows)
5. [Coding Conventions](#coding-conventions)
6. [Component Patterns](#component-patterns)
7. [State Management](#state-management)
8. [Styling Guidelines](#styling-guidelines)
9. [Firebase Integration](#firebase-integration)
10. [Deployment Pipeline](#deployment-pipeline)
11. [Common Tasks](#common-tasks)
12. [Important Notes for AI Assistants](#important-notes-for-ai-assistants)

---

## 🎯 Project Overview

**Rüya VİP** (Veli İletişim Platformu) is a SaaS parent communication platform designed for preschool educational institutions in Turkey. It enables schools to manage announcements, payments, messaging, food menus, and more through a modern web interface.

### Key Features
- Multi-institution support (single account managing multiple schools)
- Role-based authorization (Institution Manager, Principal, Teacher, Parent)
- Secure institution/user switching with password protection
- Announcement system with 6 different types
- Payment tracking system
- Messaging module
- Food menu management
- Dashboard with analytics

### Demo Credentials
- **Email:** admin@ruyavip.com
- **Password:** 123456

### Live URLs
- **GitHub Pages:** https://admkrmc.github.io/ruyavip/
- **Custom Domain:** https://www.tadpop.site (when DNS propagates)

---

## 🏗️ Architecture & Tech Stack

### Frontend Framework
- **React 19.2.0** - Latest React with concurrent features
- **Vite 7.2.4** - Lightning-fast build tool and dev server
- **React Router v7.9.6** - Client-side routing

### Styling
- **Tailwind CSS ~3.4.0** - Utility-first CSS framework
  - ⚠️ **CRITICAL:** Version locked to `~3.4.0` to avoid v4 compatibility issues
  - Custom color palette with purple/pink gradients as primary brand colors
  - Responsive design with mobile-first approach

### Backend & Services
- **Firebase 12.6.0** - Backend-as-a-Service
  - **Authentication:** Email/password authentication
  - **Firestore:** NoSQL database for users, institutions, payments, etc.
  - **Storage:** File uploads (photos, documents)
  - **Project ID:** ruyavip-production

### UI Components & Icons
- **Lucide React 0.555.0** - Modern icon library

### Build & Development Tools
- **ESLint 9.39.1** - Code linting
- **PostCSS 8.5.6** - CSS processing
- **Autoprefixer 10.4.22** - Browser compatibility

---

## 📁 Project Structure

```
ruyavip/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions CI/CD pipeline
│
├── public/                         # Static assets
│   ├── vite.svg                    # Vite logo
│   └── ...                         # Other static files
│
├── src/
│   ├── components/                 # Reusable React components
│   │   ├── Announcements.jsx       # Announcements module (6 types)
│   │   ├── Payments.jsx            # Payment tracking with filtering
│   │   ├── Messages.jsx            # Messaging system
│   │   ├── FoodMenu.jsx            # Weekly food menu management
│   │   ├── DashboardHome.jsx       # Dashboard stats and activities
│   │   ├── ProfileMenu.jsx         # User/institution switching menu
│   │   ├── PasswordModal.jsx       # Password verification modal
│   │   └── ComingSoon.jsx          # Placeholder for unimplemented features
│   │
│   ├── contexts/
│   │   └── AuthContext.jsx         # Authentication & user state management
│   │
│   ├── firebase/
│   │   └── config.js               # Firebase initialization & exports
│   │
│   ├── pages/
│   │   ├── Login.jsx               # Login page with gradient background
│   │   └── Dashboard.jsx           # Main dashboard with sidebar navigation
│   │
│   ├── assets/                     # Images, fonts, etc.
│   │
│   ├── App.jsx                     # Root component with routing
│   ├── main.jsx                    # Entry point
│   ├── index.css                   # Global styles & Tailwind directives
│   └── App.css                     # Component-specific styles
│
├── .env.example                    # Template for environment variables
├── .gitignore                      # Git ignore patterns
├── CLAUDE.md                       # This file
├── DNS_SETUP.md                    # Custom domain configuration guide
├── FIREBASE_SETUP.md               # Detailed Firebase setup instructions
├── QUICKSTART.md                   # Quick start guide
├── README.md                       # Project documentation
├── eslint.config.js                # ESLint configuration
├── index.html                      # HTML entry point
├── package.json                    # Dependencies & scripts
├── postcss.config.js               # PostCSS configuration
├── tailwind.config.js              # Tailwind CSS configuration
└── vite.config.js                  # Vite configuration with base path
```

### File Naming Conventions
- **Components:** PascalCase (e.g., `DashboardHome.jsx`, `ProfileMenu.jsx`)
- **Pages:** PascalCase (e.g., `Login.jsx`, `Dashboard.jsx`)
- **Contexts:** PascalCase with "Context" suffix (e.g., `AuthContext.jsx`)
- **Config files:** camelCase or kebab-case (e.g., `vite.config.js`, `tailwind.config.js`)

---

## 🔧 Development Workflows

### Environment Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/admkrmc/ruyavip.git
   cd ruyavip
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your Firebase credentials
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

### Available Scripts

```json
{
  "dev": "vite",                    // Start dev server (http://localhost:5173)
  "build": "vite build",            // Production build to ./dist
  "lint": "eslint .",               // Run ESLint
  "preview": "vite preview"         // Preview production build
}
```

### Git Workflow

1. **Development Branch:** `claude/claude-md-mim6y5gf1sfdcx1y-01Foh7UVczoRRKtw1WxLtdWJ`
2. **Main Branch:** `main` (production deployments)
3. **Commit Messages:** Clear, descriptive messages in English or Turkish
4. **Push Command:** `git push -u origin <branch-name>`

### Deployment Process

1. Push to `main` branch triggers GitHub Actions
2. CI/CD pipeline runs:
   - Checkout code
   - Install dependencies (`npm ci`)
   - Build with Firebase env vars from GitHub Secrets
   - Deploy to GitHub Pages
3. Site available at: https://admkrmc.github.io/ruyavip/

---

## 📝 Coding Conventions

### General Principles

1. **Language:** UI text in Turkish, code comments can be Turkish or English
2. **Component Structure:** Functional components with hooks (no class components)
3. **Import Order:**
   ```javascript
   // 1. React imports
   import React, { useState, useEffect } from 'react';

   // 2. Third-party imports
   import { useNavigate } from 'react-router-dom';
   import { Bell, CreditCard } from 'lucide-react';

   // 3. Local imports
   import { useAuth } from '../contexts/AuthContext';
   import DashboardHome from '../components/DashboardHome';
   ```

4. **File Organization:** One component per file
5. **Props:** Use destructuring in function parameters
6. **State:** Use hooks (`useState`, `useEffect`, `useContext`)

### Code Style

```javascript
// ✅ GOOD: Destructured props, clear naming
const ProfileMenu = ({ onClose, onSwitchRequest, onLogout }) => {
  const [activeTab, setActiveTab] = useState('institutions');
  // ...
};

// ❌ BAD: Props object, unclear naming
const ProfileMenu = (props) => {
  const [tab, setTab] = useState('institutions');
  // ...
};
```

### Error Handling

```javascript
// Always handle Firebase errors gracefully
try {
  await signIn(email, password);
  navigate('/dashboard');
} catch (err) {
  setError('Giriş başarısız. Email veya şifre yanlış.');
  console.error(err);
}
```

---

## 🧩 Component Patterns

### Page Components

Located in `src/pages/`, these are full-page views:

```javascript
// src/pages/Dashboard.jsx
const Dashboard = () => {
  const { currentUser, userProfile } = useAuth();
  const [activeMenu, setActiveMenu] = useState('dashboard');

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white">...</aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header>...</header>
        <main>{renderContent()}</main>
      </div>
    </div>
  );
};
```

### Feature Components

Located in `src/components/`, these are modular features:

```javascript
// src/components/Announcements.jsx
const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [filterType, setFilterType] = useState('all');

  // Component logic

  return (
    <div className="space-y-6">
      {/* Filter UI */}
      {/* Announcements list */}
    </div>
  );
};

export default Announcements;
```

### Modal Components

Follow this pattern for modals:

```javascript
// src/components/PasswordModal.jsx
const PasswordModal = ({ type, target, onClose, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle password verification
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        {/* Modal content */}
      </div>
    </div>
  );
};
```

### Placeholder Components

For unimplemented features, use `ComingSoon.jsx`:

```javascript
// Usage in Dashboard.jsx
case 'gallery':
  return <ComingSoon title="Galeri" />;
```

---

## 🔄 State Management

### AuthContext (Primary State Management)

Located at `src/contexts/AuthContext.jsx`, this provides global authentication state:

```javascript
// Available context values
const {
  currentUser,              // Firebase user object
  userProfile,              // Firestore user document
  currentInstitution,       // Selected institution
  loading,                  // Initial auth loading state
  signIn,                   // (email, password) => Promise
  signOut,                  // () => Promise
  switchInstitution,        // (institutionId, password) => Promise
  switchUser,               // (userId, password) => Promise
  rememberUser,             // (userId) => void
  rememberedUsers           // Object of remembered user IDs
} = useAuth();
```

### Usage Pattern

```javascript
// In any component
import { useAuth } from '../contexts/AuthContext';

const MyComponent = () => {
  const { currentUser, userProfile, currentInstitution } = useAuth();

  if (!currentUser) {
    return <div>Not authenticated</div>;
  }

  return <div>Welcome, {userProfile?.firstName}!</div>;
};
```

### Local State

Use `useState` for component-specific state:

```javascript
const [activeMenu, setActiveMenu] = useState('dashboard');
const [showModal, setShowModal] = useState(false);
const [filterType, setFilterType] = useState('all');
```

---

## 🎨 Styling Guidelines

### Tailwind CSS Utilities

The project uses Tailwind's utility-first approach with custom components defined in `src/index.css`:

```css
/* Custom component classes */
.btn-primary {
  @apply bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all;
}

.btn-secondary {
  @apply bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all;
}

.card {
  @apply bg-white rounded-lg shadow-sm border border-gray-200 p-6;
}

.input-field {
  @apply w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500;
}
```

### Color Palette

**Primary Brand Colors:**
- Purple: `purple-600` (#9333ea)
- Pink: `pink-600` (#db2777)
- Gradients: `bg-gradient-to-r from-purple-600 to-pink-600`

**UI Colors:**
- Background: `bg-gray-50`
- Cards: `bg-white`
- Borders: `border-gray-200`
- Text: `text-gray-700`, `text-gray-800`, `text-gray-900`

### Responsive Design

Use Tailwind's responsive modifiers:

```javascript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns */}
</div>
```

### Icon Usage (Lucide React)

```javascript
import { Bell, CreditCard, MessageSquare } from 'lucide-react';

<Bell className="w-5 h-5 text-purple-600" />
<CreditCard className="w-6 h-6" />
```

---

## 🔥 Firebase Integration

### Configuration (`src/firebase/config.js`)

```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
```

### Firestore Data Model

**Collections:**

1. **users** - User profiles
   ```javascript
   {
     email: "admin@ruyavip.com",
     firstName: "Admin",
     lastName: "User",
     role: "Kurum Yetkilisi",
     institutions: [
       { id: "inst1", name: "Gökkuşağı Anaokulu" }
     ]
   }
   ```

2. **institutions** - School/institution data
   ```javascript
   {
     id: "inst1",
     name: "Gökkuşağı Anaokulu",
     studentCount: 45,
     teacherCount: 12
   }
   ```

3. **payments** - Payment records
   ```javascript
   {
     institutionId: "inst1",
     parentName: "Ayşe Yılmaz",
     studentName: "Zeynep Yılmaz",
     amount: "5000",
     status: "paid",
     dueDate: "2025-01-15"
   }
   ```

### Authentication Flow

```javascript
// Sign in
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';

await signInWithEmailAndPassword(auth, email, password);

// Sign out
import { signOut as firebaseSignOut } from 'firebase/auth';

await firebaseSignOut(auth);

// Auth state listener (in AuthContext)
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // Fetch user profile from Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
  }
});
```

### Firestore Operations

```javascript
import { collection, getDocs, doc, getDoc, addDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

// Read documents
const querySnapshot = await getDocs(collection(db, 'users'));

// Read single document
const docSnap = await getDoc(doc(db, 'users', userId));

// Add document
await addDoc(collection(db, 'announcements'), { title: 'New', ... });

// Update document
await updateDoc(doc(db, 'users', userId), { firstName: 'Updated' });
```

---

## 🚀 Deployment Pipeline

### GitHub Actions Workflow (`.github/workflows/deploy.yml`)

**Trigger:** Push to `main` branch

**Steps:**
1. **Checkout** - Clone repository
2. **Setup Node.js 20** - Install Node.js with npm cache
3. **Install dependencies** - `npm ci`
4. **Build** - `npm run build` with Firebase env vars from secrets
5. **Setup Pages** - Configure GitHub Pages
6. **Upload artifact** - Upload `./dist` folder
7. **Deploy** - Deploy to GitHub Pages

**Required GitHub Secrets:**
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

### Vite Configuration (`vite.config.js`)

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/ruyavip/',  // ⚠️ CRITICAL: Required for GitHub Pages subpath
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
```

### React Router Configuration (`App.jsx`)

```javascript
<Router basename="/ruyavip">  {/* ⚠️ Must match Vite base */}
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    <Route path="/" element={<Navigate to="/dashboard" />} />
  </Routes>
</Router>
```

---

## ✅ Common Tasks

### Adding a New Component

1. Create file in `src/components/NewComponent.jsx`
2. Follow functional component pattern:
   ```javascript
   import React, { useState } from 'react';
   import { Icon } from 'lucide-react';

   const NewComponent = () => {
     return (
       <div className="space-y-6">
         <h2 className="text-2xl font-bold text-gray-800">Title</h2>
         {/* Content */}
       </div>
     );
   };

   export default NewComponent;
   ```
3. Import in `Dashboard.jsx` and add to menu

### Adding a New Page

1. Create file in `src/pages/NewPage.jsx`
2. Add route in `App.jsx`:
   ```javascript
   <Route path="/new-page" element={<NewPage />} />
   ```

### Adding a New Menu Item

In `Dashboard.jsx`, add to `menuItems` array:
```javascript
{
  id: 'new-feature',
  label: 'New Feature',
  icon: IconName,
  badge: 3  // Optional
}
```

### Updating Tailwind Config

Edit `tailwind.config.js` to add custom colors, fonts, etc.:
```javascript
theme: {
  extend: {
    colors: {
      brand: { 500: '#custom-color' }
    }
  }
}
```

### Working with Firebase

**Read data:**
```javascript
const [data, setData] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    const snapshot = await getDocs(collection(db, 'collectionName'));
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setData(items);
  };
  fetchData();
}, []);
```

**Write data:**
```javascript
const handleSubmit = async (formData) => {
  await addDoc(collection(db, 'collectionName'), formData);
};
```

---

## ⚠️ Important Notes for AI Assistants

### Critical Configuration Points

1. **Tailwind Version Lock:**
   - MUST use `"tailwindcss": "~3.4.0"` in package.json
   - DO NOT upgrade to v4.x (incompatible plugin system)

2. **GitHub Pages Routing:**
   - ALWAYS use `basename="/ruyavip"` in React Router
   - ALWAYS use `base: '/ruyavip/'` in vite.config.js
   - These MUST match exactly

3. **Environment Variables:**
   - NEVER commit `.env` file
   - ALWAYS use `import.meta.env.VITE_*` in Vite projects
   - Update GitHub Secrets when changing Firebase config

4. **Firebase Security:**
   - Current rules are in "test mode" (allow read/write if authenticated)
   - Production rules should implement proper authorization checks

### Common Pitfalls to Avoid

1. **Route Mismatch:**
   - ❌ `<Route path="/dashboard">` with `basename="/ruyavip"`
   - ✅ Routes are relative to basename

2. **Tailwind Not Applying:**
   - Check `content` paths in tailwind.config.js
   - Ensure Tailwind directives in index.css

3. **Firebase Connection Issues:**
   - Verify all 6 environment variables are set
   - Check Firebase project status in console

4. **Build Failures:**
   - Check Node.js version (should be 20)
   - Clear `node_modules` and reinstall: `rm -rf node_modules package-lock.json && npm install`

### Code Quality Standards

When adding/modifying code:

1. **Consistency:** Match existing patterns (see component examples above)
2. **Responsiveness:** Test on mobile, tablet, desktop
3. **Accessibility:** Use semantic HTML, proper ARIA labels
4. **Performance:** Avoid unnecessary re-renders, use React.memo if needed
5. **Error Handling:** Always handle async errors with try/catch
6. **Turkish UI:** All user-facing text in Turkish (except code/comments)

### Testing Checklist

Before committing changes:

- [ ] Component renders without errors
- [ ] Responsive design works on all screen sizes
- [ ] Firebase operations succeed
- [ ] No console errors/warnings
- [ ] ESLint passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] Authentication flow works
- [ ] Navigation works correctly

### When Stuck

1. Check existing similar components for patterns
2. Review Firebase documentation
3. Check Vite/React Router documentation
4. Verify environment variables are set
5. Check GitHub Actions logs for deployment issues
6. Test in incognito mode to avoid cache issues

---

## 📚 Reference Documentation

- **React:** https://react.dev
- **Vite:** https://vitejs.dev
- **React Router:** https://reactrouter.com
- **Tailwind CSS:** https://tailwindcss.com
- **Firebase:** https://firebase.google.com/docs
- **Lucide Icons:** https://lucide.dev

---

## 🔄 Document Updates

- **Created:** 2025-11-30
- **Last Updated:** 2025-11-30
- **Maintainer:** AI Assistant (Claude)
- **Version:** 1.0.0

---

**End of CLAUDE.md**
