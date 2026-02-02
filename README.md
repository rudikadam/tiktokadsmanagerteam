<<<<<<< HEAD
# TikTok Ads Creative Flow

A modern, responsive web application designed for managing TikTok advertising campaigns. This dashboard provides a premium user experience for ad creation, performance tracking, and account management.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🚀 Features

### 🔐 authentication & Security
- **Secure Login/Registration**: Comprehensive form validation (email format, password strength enforcement).
- **Forgot Password Flow**: 3-step verification process with OTP simulation and password reset.
- **Session Management**: Automatic token refresh handling, 401 error detection, and secure auto-logout.

### 📊 Dashboard & Campaign Management
- **Ad History**: Visual timeline and status tracking of advertising campaigns.
- **Creative Flow**: Interface for setting up new ad creatives and campaigns.
- **Responsive Design**: Fully optimized layouts for Mobile, Tablet, and Desktop devices.

### ⚙️ Account Control
=======
# TikTok Ads Creative Flow - Frontend Assignment

This project simulates the creative setup flow for TikTok Ads, focusing on OAuth integration, complex validation logic, and robust error handling as per the assignment requirements.
## Tech Stack
*   React:framework.
*   Vite: Build tool.
*   TailwindCSS: Styling.
*   Framer Motion: Animations. 
    copy-right https://motion.dev/
*   Lucide React: Icons. 
    copy-right https://lucide.dev/icons/
*   Routing: [React Router DOM](https://reactrouter.com/)

 #authentication & Security
**Secure Login/Registration**: Comprehensive form validation (email format, password strength enforcement).
**Forgot Password Flow**: 3-step verification process with OTP simulation and password reset.
**Session Management**: Automatic token refresh handling, 401 error detection, and secure auto-logout.   

##  Quick Start
**Kindly download the repository and extract it on your local machine**

1.  *Install Dependencies:
    npm install
2.  *Run Development Server*:
    npm run dev
3.  *Open Application*:
    Visit `http://localhost:5173`

#Account Control
>>>>>>> origin/main
- **Profile Settings**: Manage identity details, regional settings, and social connections.
- **Billing Portal**: Mock payment integration supporting multiple card types and transaction history.
- **System Controls**: Application state management and local data persistence.

<<<<<<< HEAD
## 🛠️ Technology Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router DOM](https://reactrouter.com/)

## 📋 Prerequisites

Before running this project, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** (v8 or higher) or **yarn**

## 💻 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/tiktok-ads-creative-flow.git
   cd tiktok-ads-creative-flow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173` to view the application.

## 📁 Project Structure

```
src/
├── components/        # Reusable UI components (Navbar, ErrorBanner, etc.)
├── pages/            # Main application pages
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── AdHistory.jsx
│   ├── Settings.jsx
│   └── ...
├── services/         # API and logic services
│   ├── authApi.js    # Mock Auth endpoints
│   ├── billingApi.js # Mock Billing endpoints
│   ├── tokenService.js # Token management & 401 handling
│   └── storageService.js # Safe localStorage wrapper
├── App.jsx           # Main routing and app layout
└── main.jsx          # Entry point
```

## 🧪 Testing Credentials
=======
# OAuth Error Scenarios
To simulate OAuth errors, you would typically modify the callback URL code manually in a real test, but for this demo, the Mock API is pre-wired to handle specific error codes if you were to redirect with them.
*   Method: The application handles standard OAuth error query params automatically (e.g., `?error=access_denied`).



#  Music Validation Logic
*   *Invalid ID**: Enter `"invalid"`, `"123"`, or `"000"` in the **Existing Music ID* field to trigger an inline validation error.
*   *Copyright Error (Upload)**: Upload any file with `"error"` in the filename to trigger a mock copyright/upload restriction.
*   *Objective Rule**: Select **Conversions** objective and try to select *No Music*. The form will auto-reset to "Existing" or show an error if you try to submit.



#Testing Credentials
>>>>>>> origin/main

Since this project runs with mock services, use the following credentials for testing:

- **Email**: `demo@tiktokads.com`, `test@test.com`, or any valid email format.
- **Password**: `password` OR any password meeting complexity rules (8+ chars, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special).
- **OTP Code (Forgot Password)**: Any 6-digit code *except* `000000`.

<<<<<<< HEAD
## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
=======

#Assumptions
*   Mock Data: Since we don't have a live TikTok App for this assignment, all API calls are simulated    with `setTimeout` to mimic network latency.
*   LocalStorage: Used for persisting the "Session" (OAuth token) and "Ad History" for the demo's sake.
*   Design: Focused on a "Dark Mode" aesthetic similar to TikTok's creative tools.
>>>>>>> origin/main
