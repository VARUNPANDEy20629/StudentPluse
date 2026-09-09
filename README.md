# AI Student Performance Predictor

A full-stack AI/ML project that predicts and analyzes student academic performance using React, Node.js, Express, Python, and Scikit-learn.

## Features

- Student performance prediction
- AI/ML-based prediction
- Interactive React frontend
- REST API using Node.js and Express
- Machine Learning model using Python and Scikit-learn
- Simple and beginner-friendly project structure

## Technologies Used

- React.js
- Vite
- Node.js
- Express.js
- Python
- Scikit-learn
- Pandas
- NumPy
- JavaScript
- HTML
- CSS

## Project Structure

AI-Student-Performance-Predictor/

    client/                 # React + Vite frontend
    server/                 # Node.js + Express backend
    ml/                     # Machine Learning module
    .gitignore
    README.md

## Run Frontend

    cd client
    npm install
    npm run dev

## Run Backend

    cd server
    npm install
    npm start

## Train ML Model

    cd ml
    python -m pip install -r requirements.txt
    python train.py

## How It Works

1. The user enters student-related information through the frontend.
2. The React application sends the data to the backend.
3. The Express server processes the prediction request.
4. The Machine Learning module can be used to train the prediction model.
5. The prediction result is displayed to the user.

## Machine Learning

The project uses Python and Scikit-learn for Machine Learning.

The ML model can be trained using:

    python train.py

The current Express API also includes a simple fallback predictor so that the complete application UI can work immediately.

## Future Improvements

- Connect the trained Python ML model with the Express backend
- Add student risk-level prediction
- Add SGPA/CGPA prediction
- Compare multiple Machine Learning algorithms
- Add performance analytics and charts
- Add database integration
- Add user authentication
- Deploy the application online

## Project Status

In Development

The frontend and Express backend are currently available. The Python Machine Learning model can be trained separately, with direct ML-to-backend integration planned as a future improvement.

## Author

Varun Pandey

AI/ML and Full-Stack Development Project

## License

This project is created for educational and academic purposes.

---

If you find this project useful, consider giving the repository a star!
