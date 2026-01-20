# Palmyre GAN - OCR & Image Recognition

A monorepo containing both the React frontend and Python Flask backend for the Palmyre GAN project - an application for handwritten text recognition and image classification using deep learning models.

## Quick Start

### 1. Start the Backend (Python Flask)

```bash
# Navigate to backend
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # Linux/macOS
# venv\Scripts\activate   # Windows

# Install dependencies
pip install -r Requirements.txt

# Start the server
python app.py
```
> Backend runs at http://localhost:5000

### 2. Start the Frontend (React)

Open a **new terminal**:

```bash
# Navigate to frontend
cd frontend

# Install dependencies (first time only)
npm install

# Start the development server
npm start
```
> Frontend runs at http://localhost:3000

---

## Project Structure

```
gan-palmyre-web-app/
├── frontend/          # React TypeScript frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/           # Python Flask backend with ML models
│   ├── app.py
│   ├── Requirements.txt
│   └── static/        # ML models (.h5, .pt files)
└── README.md
```

## Frontend (React)

The frontend is a React TypeScript application that provides the user interface for uploading images and displaying recognition results.

### Setup & Run

```bash
cd frontend
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view in browser.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Run development server |
| `npm test` | Run tests in watch mode |
| `npm run build` | Build for production |

### Environment Configuration

The frontend uses environment variables to configure the backend API URL:

| File | Used When | API URL |
|------|-----------|---------|
| `.env.development` | `npm start` | `http://localhost:5000/api` |
| `.env.production` | `npm run build` | `https://ml-research.pef.czu.cz/api` |

**To override locally**, create `.env.local` with:
```bash
REACT_APP_API_BASE_URL=http://your-custom-url/api
```

## Backend (Python Flask)

The backend is a Flask API that serves ML models for:
- **Handwritten text recognition** - TensorFlow/Keras model
- **Photo classification** - TensorFlow/Keras model  
- **Object detection/segmentation** - YOLOv8 model

### Setup & Run

```bash
cd backend

# Create virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # Linux/macOS
# or: venv\Scripts\activate  # Windows

# Install dependencies
pip install -r Requirements.txt

# Run the server
python app.py
```

The API will be available at [http://localhost:5000](http://localhost:5000).

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/convert` | POST | Classify handwritten/photo images |
| `/convert-augmented` | POST | Object detection with visualization |

## Development

### Running Both Services

**Terminal 1 - Backend:**
```bash
cd backend && python app.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend && npm start
```

### Frontend Proxy Configuration

To proxy API requests from the frontend to the backend during development, add to `frontend/package.json`:

```json
{
  "proxy": "http://localhost:5000"
}
```

## TODO

- [ ] Write documentation for deployment + run service as container inside SystemD
- [ ] Add environment deployment variables
- [ ] Add error handling of backend responses
- [ ] Allow select whole column in table when picking the choice
- [ ] Add Docker Compose for orchestrating both services