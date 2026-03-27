import React, { useEffect, useState } from 'react'
import img1 from"../assets/thrillers.jpg"
import img2 from"../assets/action.jpg"
import img3 from"../assets/fantasy.jpg"
import img4 from"../assets/adventure.jpg"
import img5 from"../assets/comedy.webp"
import img6 from"../assets/popular.jpg"
import nomovie from "../assets/no_movies.png"
import { FaEyeSlash } from "react-icons/fa";
import { IoMdDoneAll } from "react-icons/io";
import { FaClock } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import { addMovieAPI, deleteMovieAPI, getAllMoviesAPI, updateRatingAPI, updateStatusAPI } from '../services/allAPI'
import { ToastContainer,toast } from 'react-toastify'
const Movies = () => {
    
  const [activeGenre, setActiveGenre] = useState("Popular");

const moviesData = {
    Popular: {
      image: img6
      
    },
    Thriller: {
      image: img1
      
    },
    Action: {
      image: img2
      
    },
    Fantasy: {
      image: img3
      
    },
    Adventure: {
      image: img4
     
    },
    Comedy: {
      image: img5
      
    },
    Animation: {
      image: img3
     
    },
  };
const genres = ["Popular", "Thriller", "Action", "Fantasy", "Adventure", "Comedy", "Animation"];


const [movies, setMovies] = useState({
  title: "",
  type:"movie",
  genre: "",
  rating: "",
  platform: "",
  description: "",
  status: "",
  poster_url: "",
});

const[showmovie,setShowMovie]=useState([])
const [moviegenre, setMovieGenre] = useState("")

const handleAddMovie = async() => {
 const {title, type, genre,  platform, description} = movies
 if(!title || !type || !genre || !platform || !description){
  alert("Please fill all the fields")
  return
 }
 const result=await addMovieAPI(movies)
 if(result){
  await Swal.fire({
  title: "Movie added successfully",
  icon: "success",
  draggable: true
});
  getMovies()
  handleClose()
  setMovies({
  title: "",
  type:"movie",
  genre: "",
  rating: "",
  platform: "",
  description: "",
  poster_url: "",
  status: "",
});
 }

}

const handleClose=()=>{
setMovies({
  title: "",
  type:"movie",
  genre: "",
  rating: "",
  platform: "",
  description: "",
  status: "",
  poster_url: "",
});
setMovieGenre("");

}

const getMovies=async()=>{
  try {
    const result =await getAllMoviesAPI(movies?.type)
    setShowMovie(result.data);
    
  } catch (error) {
    
  }
}
useEffect(()=>{
  getMovies()
},[])


const handleUpdate=async(id,status)=>{
  try {
    const result=await updateStatusAPI({id,status})
    if(result){
      toast.success("Status updated successfully")
    }
    getMovies()
  } catch (error) {
    toast.error(error)
  }
}

const handleRating=async(id,rating)=>{
try {
  const result = await updateRatingAPI({ id, rating });
  if(result){
    toast.success("Rating updated successfully");
  }
  getMovies();
} catch (error) {
  toast.error(error);

}

}
const handleDelete=async(id)=>{
  try {
    const res=await Swal.fire({
  title: "Do you want to delete this movie?",
  
  showCancelButton: true,
  confirmButtonText: "Delete",
  
})
if(res.isConfirmed){
  const result=await deleteMovieAPI(id)
  if(result){
    toast.success("Movie deleted successfully")
  }
  getMovies()
}
  } catch (error) {
    
  }
}


const filteredMovies =
  activeGenre === "All"
    ? showmovie
    : showmovie.filter(
        (movie) => movie.genre?.toLowerCase() === activeGenre.toLowerCase()
      );

  return (
   <div className=" text-white">

      {/* 🔴 Banner */}
      <div
        style={{
          height: "250px",
          backgroundImage:
            `url(${moviesData[activeGenre]?.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="d-flex justify-content-center align-items-center"
      >
       <div className='d-flex align-items-center flex-column'>
         <h1 className="fw-bold" style={{fontSize:'7rem'}}>MOVIES</h1>
         <button  data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="btn w-50 btn-danger fw-semibold fs-4 btn-sm">Add movies</button>
         </div>
      </div>

      {/* 🔴 Genre Pills */}
      <div className="bg-danger p-3 d-flex justify-content-center gap-3 flex-wrap">
        {genres?.map((genre) => (
          <button
            key={genre}
            className={`btn rounded-pill px-4 ${
              activeGenre === genre ? "btn-light text-dark" : "btn-outline-light"
            }`}
            onClick={() => setActiveGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* 🔴 Movie Content */}
      <div className="container  no-scrollbar overflow-y-auto py-4" style={{height:'410px'}}>
        {filteredMovies.length>0 ? (filteredMovies?.map((movie, index) => (
          <div
            key={index}
            className="card mb-3 bg-danger text-white shadow"
          >
            <div className="row g-0">
              
              {/* Poster */}
              <div className="col-md-3">
                <img
                  src={movie?.poster_url}
                  className="img-fluid  rounded-start"
                  alt="poster"
                   style={{
      width: "280px",
      height: "370px",
      objectFit: "cover"
    }}
                />
              </div>

              {/* Details */}
              <div className="col-md-7">
                <div className="card-body">
                  <p className="card-title " style={{fontSize:'4rem'}}>{movie?.title}</p>
                  
                  <p className='fs-4'>
  
    {movie?.status}
    {movie?.status === "Not watched" && <FaEyeSlash className='text-warning ms-1 fs-3'/>}
    {movie?.status === "Watched" && <IoMdDoneAll className='text-success ms-1 fs-3'/>}
    {movie?.status === "Pending" && <FaClock className='text-warning ms-1 fs-3'/>}

</p>
<p>
  Rating:{" "}
  {movie?.rating
    ? [...Array(movie.rating)].map((_, i) => (
        <FontAwesomeIcon className='text-warning ms-1' key={i} icon={faStar} />
      ))
    : "Not rated"}
</p>

                  <p>
                    {movie?.description}
                  </p>
                 <div className='d-flex gap-2 flex-row'>
                     <div class="dropdown">
  <button class="btn btn-warning dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Update status
  </button>
  <ul class="dropdown-menu">
    <li><a onClick={()=>handleUpdate(movie?.id,"Watched")} class="dropdown-item" href="#">Watched</a></li>
    <li><a onClick={()=>handleUpdate(movie?.id,"Pending")} class="dropdown-item" href="#">Pending</a></li>
   
  </ul>
</div>

{movie.status==="Watched"&&
<div class="dropdown">
  <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Rate
  </button>
  <ul class="dropdown-menu">
    <li><a onClick={()=>handleRating(movie?.id,1)} class="dropdown-item" href="#">1</a></li>
    <li><a onClick={()=>handleRating(movie?.id,2)} class="dropdown-item" href="#">2</a></li>
    <li><a onClick={()=>handleRating(movie?.id,3)} class="dropdown-item" href="#">3</a></li>
    <li><a onClick={()=>handleRating(movie?.id,4)} class="dropdown-item" href="#">4</a></li>
    <li><a onClick={()=>handleRating(movie?.id,5)} class="dropdown-item" href="#">5</a></li>
    
  </ul>
</div>}
                 </div>
                </div>
              </div>

              <div className='col-md-2 d-flex align-items-center'>
                <button className='btn btn-light fs-5 text-danger' onClick={() => handleDelete(movie?.id)}>Remove</button>
              </div>

            </div>
          </div>
        ))):<div className='h-100 text-center'>
          <img src={nomovie} className='img-fluid h-100' alt="" />
        </div>
        }
      </div>


{/* modal for adding movies */}

<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-3" id="staticBackdropLabel">Add your movie</h1>
        <button onClick={handleClose} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body d-flex gap-3 flex-column  ">
        <input value={movies?.title} onChange={(e)=>setMovies(prev=>({...prev,title:e.target.value}))} className="form-control" type="text" placeholder="Movie Title" aria-label="default input example"/>
        <input value={movies?.platform} onChange={(e)=>setMovies(prev=>({...prev,platform:e.target.value}))} className="form-control" type="text" placeholder="Platform" aria-label="default input example"/>

        <div className='w-100 gap-2 d-flex flex-row justify-content-between'>
          <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Genre
  </button>
  <ul class="dropdown-menu">
    <li><a onClick={()=>setMovies(prev=>({...prev,genre:"Popular"}))} class="dropdown-item" href="#">Popular</a></li>
    <li><a onClick={()=>setMovies(prev=>({...prev,genre:"Action"}))} class="dropdown-item" href="#">Action</a></li>
    <li><a onClick={()=>setMovies(prev=>({...prev,genre:"Comedy"}))} class="dropdown-item" href="#">Comedy</a></li>
    <li><a onClick={()=>setMovies(prev=>({...prev,genre:"Adventure"}))} class="dropdown-item" href="#">Adventure</a></li>
    <li><a onClick={()=>setMovies(prev=>({...prev,genre:"Fantasy"}))} class="dropdown-item" href="#">Fantasy</a></li>
    <li><a onClick={()=>setMovies(prev=>({...prev,genre:"Animation"}))} class="dropdown-item" href="#">Animation</a></li>
    <li><a onClick={()=>setMovies(prev=>({...prev,genre:"Thriller"}))} class="dropdown-item" href="#">Thriller</a></li>
  </ul>

</div>
<input class="form-control" value={movies?.genre}  readOnly type="text" placeholder="Genre" aria-label="default input example"/>
        </div>

          <textarea
  value={movies.description}
  onChange={(e) => {
    const text = e.target.value;
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

    if (wordCount <= 40) {
      setMovies(prev => ({ ...prev, description: text }));
    }
  }}
  className="form-control"
  placeholder="Description (max 40 words)"
/>
          <input 
  value={movies.poster_url}
  onChange={(e)=>setMovies(prev=>({...prev, poster_url: e.target.value}))}
  className="form-control"
  type="text"
  placeholder="Poster Image URL"
/>

      </div>
      <div class="modal-footer">
        <button onClick={handleClose} type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
        <button onClick={handleAddMovie} type="button" data-bs-dismiss="modal" class="btn btn-success">Add movie</button>
      </div>
    </div>
  </div>
</div>
 <ToastContainer theme='colored' position='top-right' autoClose={2000}/>
    </div>
  )
}

export default Movies