

# Bug Tracking System 

This is a full-stack bug tracking application built for team collaboration, inspired by the issue management system of **GitHub**. The main goal of this project is to provide a platform for teams to efficiently track, manage, and resolve bugs throughout the software development lifecycle.



## 🚀 Key Features

The application is built with a role-based access control system, supporting three distinct user roles: **Admin**, **Tester**, and **Developer**.

### 🔐 Authentication & Authorization

  * **User Management:** Secure user registration and login with JWT.
  * **Role-Based Access Control:** Permissions for actions like creating a project or assigning a bug are determined by the user's role.
  * **Protected Routes:** A `PrivateRoute` component ensures that only authenticated users can access the main parts of the application.

### 🐞 Bug Management Workflow

  * **Bug Creation:** Testers can create new bugs, providing details like title, description, and priority.
  * **Full Bug Lifecycle:** The project implements a complete bug lifecycle with dynamic status changes: `Open` -\> `In Progress` -\> `Ready for QA` -\> `Closed`/`Reopened`.
  * **Assignment:** Testers can assign bugs to specific Developers.
  * **Status Updates:** Developers can update the status of bugs assigned to them.
  * **Verification:** Testers have the final say, verifying a bug fix and changing its status to `Closed` or `Reopened`.

### 📂 Project and Dashboard Views

  * **Project Creation:** Admins and Testers can create and manage new projects.
  * **Project List:** A dedicated page displays all available projects.
  * **Dashboard:** A personalized dashboard shows a summary of the user's role and a list of bugs assigned specifically to them.

-----

## 🛠️ Tech Stack

This project is a **MERN stack** application, leveraging the following technologies:

### Frontend

  * **React:** For building the user interface.
  * **Vite:** A fast build tool for a superior development experience.
  * **Recoil:** An efficient state management library for managing shared application state.
  * **React Router DOM:** For client-side routing and navigation.
  * **Tailwind CSS:** A utility-first framework for rapid and consistent styling.
  * **Axios:** A promise-based HTTP client for making API calls.

### Backend

  * **Node.js & Express.js:** The runtime environment and web framework for the server.
  * **MongoDB & Mongoose:** A NoSQL database and an ODM for managing data.
  * **JWT (jsonwebtoken):** Used for creating and verifying secure authentication tokens.
  * **Bcryptjs:** For hashing and securing user passwords.
  * **Dotenv:** To manage environment variables securely.

-----

## ⚙️ Installation & Setup

To get a copy of this project up and running on your local machine, follow these simple steps.

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/Aman-kumar-verma2004/BugTrackingSystem.git
    cd BugTrackingSystem
    ```

2.  **Backend Installation:**

      * Navigate into the `server` directory.
      * Install the required Node.js packages.
      * Create a `.env` file and add your configuration variables.

    <!-- end list -->

    ```bash
    cd server
    npm install
    # Create a .env file with your variables
    ```

    Example `.env` content:

    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_very_secure_and_random_string
    PORT=5000
    ```

3.  **Frontend Installation:**

      * Navigate into the `client` directory.
      * Install the required npm packages.

    <!-- end list -->

    ```bash
    cd client
    npm install
    ```

-----

## 🚀 How to Run the Application

1.  **Start the Backend Server:**

      * From the `server` directory, run the following command in your terminal:

    <!-- end list -->

    ```bash
    npm start
    ```

2.  **Start the Frontend App:**

      * Open a **new terminal**, navigate to the `client` directory, and run:

    <!-- end list -->

    ```bash
    npm run dev
    ```

The application should now be live on `http://localhost:5173`.

-----

## 📸 Demo

<img width="1366" height="690" alt="image" src="https://github.com/user-attachments/assets/573c2447-504f-4321-a4e4-b229d26f788f" />
<img width="1366" height="690" alt="image" src="https://github.com/user-attachments/assets/2b07baf9-3214-4191-a30e-1f28a8937224" />
<img width="1366" height="687" alt="image" src="https://github.com/user-attachments/assets/bd9fe292-9a2e-43ae-923e-da599950646f" />

.....




-----

## 💡 Future Enhancements

  * **Full Commenting System:** Implement a feature for users to add and manage comments on bugs.
  * **Dashboard Filters:** Add advanced filters on the dashboard to allow users to sort bugs by priority, status, or project.
  * **Profile Management:** Create a user profile page where users can update their details and change their password.
  * **Project-Specific Dashboards:** Build a dedicated dashboard for each project to show its overall progress.
