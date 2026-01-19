# Palmyre GAN - OCR & Image Recognition

A monorepo containing both the React frontend and Python Flask backend for the Palmyre GAN project - an application for handwritten text recognition and image classification using deep learning models.

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