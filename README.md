# TikTok Ads Creative Flow - Frontend Assignment

This project simulates the creative setup flow for TikTok Ads, focusing on OAuth integration, complex validation logic, and robust error handling as per the assignment requirements.
## Tech Stack
*   React: Core framework.
*   Vite: Build tool.
*   TailwindCSS: Styling.
*   Framer Motion: Animations. 
    copy-right https://motion.dev/
*   Lucide React: Icons. 
    copy-right https://lucide.dev/icons/

##  Quick Start

1.  *Install Dependencies:
    npm install
2.  *Run Development Server*:
    npm run dev
3.  *Open Application*:
    Visit `http://localhost:5173`



# OAuth Error Scenarios
To simulate OAuth errors, you would typically modify the callback URL code manually in a real test, but for this demo, the Mock API is pre-wired to handle specific error codes if you were to redirect with them.
*   Method: The application handles standard OAuth error query params automatically (e.g., `?error=access_denied`).



# 3. Music Validation Logic
*   **Invalid ID**: Enter `"invalid"`, `"123"`, or `"000"` in the **Existing Music ID** field to trigger an inline validation error.
*   **Copyright Error (Upload)**: Upload any file with `"error"` in the filename to trigger a mock copyright/upload restriction.
*   **Objective Rule**: Select **Conversions** objective and try to select **No Music**. The form will auto-reset to "Existing" or show an error if you try to submit.



#Assumptions
*   Mock Data: Since we don't have a live TikTok App for this assignment, all API calls are simulated    with `setTimeout` to mimic network latency.
*   LocalStorage: Used for persisting the "Session" (OAuth token) and "Ad History" for the demo's sake.
*   Design: Focused on a "Dark Mode" aesthetic similar to TikTok's creative tools.
