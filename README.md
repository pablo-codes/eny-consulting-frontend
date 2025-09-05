# Business Analysis School AI Student Support Portal 🤖

This project is a modern, responsive frontend application for the Business Analysis School. It features an intelligent AI chatbot designed to provide instant support to students, answer questions about certifications and programs, and offer career guidance. Built with React and Tailwind CSS, the portal enhances user engagement and captures valuable leads through an integrated tracking system.

## ✨ Features

- **🧠 AI-Powered Chat Interface**: A conversational AI that provides detailed information about certifications (SAMC™, SDC®), coaching programs, and career paths.
- **💾 Local Chat Persistence**: Chat history is automatically saved to the browser's IndexedDB, allowing users to continue their conversations across sessions.
- **📈 Lead Generation & Tracking**: Seamlessly captures user interest by tracking clicks on Call-to-Action (CTA) buttons, providing valuable data for converting prospects.
- **📊 System Health Dashboard**: A dedicated page (`/health`) to monitor the real-time status of the backend chat and lead tracking services.
- **📄 CSV Data Export**: An admin-focused feature to export all captured lead data into a CSV file for analysis.
- **📱 Fully Responsive Design**: The user interface is crafted with Tailwind CSS for a seamless experience on desktops, tablets, and mobile devices.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/pablo-codes/eny-consulting-frontend.git
    ```

2.  **Navigate to the Project Directory**

    ```bash
    cd eny-consulting-frontend
    ```

3.  **Install Dependencies**

    ```bash
    npm install
    ```

4.  **Backend Configuration**
    This frontend application is designed to connect to a backend API. The API service in (`src/services/api.js`) is pre-configured to use `http://localhost:5000/api/` for local development. Ensure your local backend server is running on port `5000`. No `.env` file is required for this default setup.

5.  **Run the Development Server**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

## Usage

Once the application is running, you can explore its features:

- **Chat with the AI Assistant**: Open your browser to `http://localhost:3000`. The main page features the chat interface. You can ask questions such as:
  - "What is the SAMC certification?"
  - "Tell me about your coaching programs."
  - "How can I land a six-figure job in business analysis?"
- **Check System Health**: Navigate to `/health` (e.g., `http://localhost:3000/#/health`) to view the operational status of the backend services. You can refresh the status manually.
- **Export Lead Data**: Navigate to `/export` (e.g., `http://localhost:3000/#/export`) to download a CSV file containing all tracked lead interactions.

## 🛠️ Technologies Used

| Technology                                                    | Description                                                           |
| :------------------------------------------------------------ | :-------------------------------------------------------------------- |
| **[React](https://react.dev/)**                               | A JavaScript library for building user interfaces.                    |
| **[Vite](https://vitejs.dev/)**                               | A modern frontend build tool for an optimized development experience. |
| **[Tailwind CSS](https://tailwindcss.com/)**                  | A utility-first CSS framework for rapid UI development.               |
| **[React Router](https://reactrouter.com/)**                  | A library for declarative routing in React applications.              |
| **[Axios](https://axios-http.com/)**                          | A promise-based HTTP client for making API requests.                  |
| **[IndexedDB (`idb`)](https://github.com/jakearchibald/idb)** | Client-side database for storing chat history locally.                |
