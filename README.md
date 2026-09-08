# AI Student Performance Predictor

A beginner-friendly full-stack project using React/Vite, Node/Express, and Python/scikit-learn.

## Run frontend
cd client
npm install
npm run dev

## Run backend
cd server
npm install
npm start

## Train ML model
cd ml
python -m pip install -r requirements.txt
python train.py

The current Express API includes a simple fallback predictor so the complete UI works immediately. The Python model can be trained separately; connecting Express to Python is the next upgrade.
