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

 ### 🔐 authentication & Security
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

### ⚙️ Account Control
- **Profile Settings**: Manage identity details, regional settings, and social connections.
- **Billing Portal**: Mock payment integration supporting multiple card types and transaction history.
- **System Controls**: Application state management and local data persistence.

# OAuth Error Scenarios
To simulate OAuth errors, you would typically modify the callback URL code manually in a real test, but for this demo, the Mock API is pre-wired to handle specific error codes if you were to redirect with them.
*   Method: The application handles standard OAuth error query params automatically (e.g., `?error=access_denied`).



#  Music Validation Logic
*   *Invalid ID**: Enter `"invalid"`, `"123"`, or `"000"` in the **Existing Music ID* field to trigger an inline validation error.
*   *Copyright Error (Upload)**: Upload any file with `"error"` in the filename to trigger a mock copyright/upload restriction.
*   *Objective Rule**: Select **Conversions** objective and try to select *No Music*. The form will auto-reset to "Existing" or show an error if you try to submit.



## 🧪 Testing Credentials

Since this project runs with mock services, use the following credentials for testing:

- **Email**: `demo@tiktokads.com`, `test@test.com`, or any valid email format.
- **Password**: `password` OR any password meeting complexity rules (8+ chars, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special).
- **OTP Code (Forgot Password)**: Any 6-digit code *except* `000000`.


#Assumptions
*   Mock Data: Since we don't have a live TikTok App for this assignment, all API calls are simulated    with `setTimeout` to mimic network latency.
*   LocalStorage: Used for persisting the "Session" (OAuth token) and "Ad History" for the demo's sake.
*   Design: Focused on a "Dark Mode" aesthetic similar to TikTok's creative tools.
