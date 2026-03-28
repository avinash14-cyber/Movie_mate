# MovieMate 

MovieMate is a full-stack web application to track movies and series.
Users can add, update status, rate, and manage their watchlist.

##  Live Links

Frontend: https://movie-mate1.netlify.app/ 
Backend: https://movie-mate-backend-ye39.onrender.com/media

##  Features

- Add movies and series
- Update status (Watching, Completed, Wishlist)
- Rate and review media
- Filter by genre
- Responsive UI

##  Tech Stack

Frontend: React, Bootstrap, Axios  
Backend: FastAPI  
Database: SQLite  
Deployment: Netlify & Render

## ⚙️ Setup Instructions

### Frontend
git clone https://github.com/avinash14-cyber/Movie_mate
cd moviemate-frontend
npm install
npm run dev

### Backend (optional)
cd moviemate-backend
pip install -r requirements.txt
uvicorn main:app --reload
