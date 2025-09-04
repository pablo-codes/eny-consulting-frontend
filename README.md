# Business Analysis School AI Student Support Portal

An intelligent, conversational AI assistant designed to provide instant support to current and prospective students of the Business Analysis School. This portal leverages a modern React frontend to deliver a seamless user experience, answer queries about certifications and programs, and capture leads effectively.

## ✨ Key Features

- **🤖 Intelligent AI Chat**: A responsive chat interface that answers questions about certifications (SAMC™, SDC®), coaching programs, and career guidance.
- **🔗 Lead Capture & Tracking**: Integrated Call-to-Action (CTA) buttons within AI responses to guide users and track engagement with backend services.
- **🗂️ Offline Chat History**: Leverages IndexedDB to persist chat sessions locally, allowing users to resume conversations even after closing the browser.
- **📉 Low-Confidence Fallback**: Automatically presents an option to connect with a human agent when the AI's response confidence is low.
- **❤️ System Health Dashboard**: A dedicated page to monitor the real-time operational status of backend microservices (AI Chat & Lead Tracking).
- **📄 Markdown Support**: AI responses are rendered with rich formatting, including lists, links, and bold text for improved readability.
- **📱 Responsive Design**: A clean, mobile-first interface built with Tailwind CSS for a consistent experience across all devices.

## 🛠️ Technologies Used

| Technology         | Description                                             |
| ------------------ | ------------------------------------------------------- |
| **React**          | A JavaScript library for building user interfaces.      |
| **Vite**           | Next-generation frontend tooling for fast builds.       |
| **Tailwind CSS**   | A utility-first CSS framework for rapid UI development. |
| **React Router**   | Client-side routing for single-page applications.       |
| **Axios**          | A promise-based HTTP client for API communication.      |
| **IDB**            | A lightweight wrapper for the IndexedDB API.            |
| **React Markdown** | Renders Markdown as React components.                   |
| **React Icons**    | A library for including popular icons in the project.   |

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn package manager

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/pablo-codes/eny-consulting-frontend.git
    ```
2.  **Navigate to the Project Directory**
    ```bash
    cd eny-consulting-frontend/client
    ```
3.  **Install Dependencies**
    ```bash
    npm install
    ```
4.  **Run the Development Server**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

## 🖥️ Usage

Once the application is running, you can interact with its main features:

### AI Chat Interface

The main page (`/`) features the AI assistant.

- Type your questions about Business Analysis School's offerings into the input field at the bottom.
- Press `Enter` or click the send button to submit your message.
- The AI will respond with information and may include interactive buttons (CTAs) for actions like signing up for a masterclass or viewing a certification page.

### System Health Dashboard

Navigate to the `/health` page to view the status of backend services.

- This dashboard provides a real-time check on the "AI Chat Service" and "Lead Tracking Service".
- Statuses are color-coded: green for healthy, red for unhealthy.
- Click the "Refresh Health Check" button to manually trigger a new status check.

## 📂 Project Structure

The codebase is organized to maintain a clean and scalable architecture.

```
/src
|-- /assets         # Static assets like images and logos
|-- /components     # Reusable UI components
|   |-- /chat       # Components specific to the chat interface
|   |-- /ui         # Generic UI elements (Button, Modal, etc.)
|-- /pages          # Top-level page components (Home, Health)
|-- /services       # Modules for API communication and data handling
|-- App.jsx         # Main application component with routing
|-- main.jsx        # Entry point of the React application
|-- index.css       # Global styles and Tailwind CSS configuration
```
