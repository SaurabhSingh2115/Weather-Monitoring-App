# Weather Monitoring App

This is a real-time weather monitoring app for major Indian cities built with the MERN (MongoDB, Express, React, Node.js) stack.

## Running the project

1. Clone the repository.

   ```
   git clone https://github.com/SaurabhSingh2115/Weather-Monitoring-App.git
   ```

2. Install the dependencies for both the backend and frontend.

   **backend/**

   ```
   cd weather-monitoring-app/backend
   npm install
   ```

   **client/**

   ```
   cd ../client
   npm install
   ```

3. Set your MongoDB connection string in `backend/.env`.

   **backend/.env**

   ```
   URI = "your_mongodb_connection_url"
   ```

   Note: Replace `your_mongodb_connection_url` with your actual mongodb database url.

4. Start the **backend** application.

   **backend/**

   ```
   nodemon index.js
   ```

5. Start the **frontend** application in a new terminal.

   **client/**

   ```
   npm run dev
   ```

## Accessing the Application

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:5000](http://localhost:5000)
