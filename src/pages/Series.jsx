import React, { useEffect, useState } from 'react'
import img1 from '../assets/action_series.jpg'
import img2 from '../assets/comedy_series.jpg'
import img3 from '../assets/animated_series.jpg'
import img4 from '../assets/adventure_series.jpg'
import img5 from '../assets/dark_series.jpg'
import img6 from '../assets/fantasy_series.jpg'
import img7 from '../assets/popular_series.webp'
import nomovie from "../assets/no_movies.png"
import { FaEyeSlash } from "react-icons/fa";
import { IoMdDoneAll } from "react-icons/io";
import { FaClock } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClapperboard, faStar } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import { ToastContainer,toast } from 'react-toastify'
import { SiClockify } from "react-icons/si";
import { HiArrowSmLeft } from "react-icons/hi";


import { addMovieAPI, deleteMovieAPI, getAllMoviesAPI, updateRatingAPI, updateStatusAPI } from '../services/allAPI'
import { useNavigate } from 'react-router-dom'
const Series = () => {


  const navigate=useNavigate()

    const[showseries,setShowSeries]=useState([])
    const [series, setSeries] = useState({
      title: "",
      type:"series",
      genre: "",
      rating: "",
      platform: "",
      description: "",
      total_seasons: "",
      status: "",
      poster_url: "",
    });

     const [activeGenre, setActiveGenre] = useState("Popular");

    const seriesData = {
        Popular: {
          image: img7
          
        },
        Thriller: {
          image: img5
          
        },
        Action: {
          image: img1
          
        },
        Fantasy: {
          image: img6
          
        },
        Adventure: {
          image: img4
         
        },
        Comedy: {
          image: img2
          
        },
        Animation: {
          image: img3
         
        },
      };
    const genres = ["Popular", "Thriller", "Action", "Fantasy", "Adventure", "Comedy", "Animation"];


    const handleClose=()=>{
setSeries({
  title: "",
  type:"series",
  genre: "",
  rating: "",
  platform: "",
  description: "",
  status: "",
  poster_url: "",
});
setMovieGenre("");

}

const handleAddSeries = async() => {
 const {title, type, genre,  platform, description, total_seasons} = series
 if(!title || !type || !genre || !platform || !description || !total_seasons){
  toast.warning("Please fill all the fields")
  return
 }
 const result=await addMovieAPI(series)
 if(result){
  await Swal.fire({
  title: "Series added successfully",
  icon: "success",
  draggable: true
});
  getSeries()
  handleClose()
  setSeries({
  title: "",
  type:"series",
  genre: "",
  rating: "",
  platform: "",
  description: "",
  poster_url: "",
  status: "",
});
 }

}

const getSeries=async()=>{
  try {
    const result =await getAllMoviesAPI(series?.type)
    setShowSeries(result.data);
    
  } catch (error) {
    
  }
}

const handleUpdate=async(id,status)=>{
  try {
    const result=await updateStatusAPI({id,status})
    console.log(result);
    
    if(result){
      toast.success("Status updated successfully")
    }
    getSeries()
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
  getSeries();
} catch (error) {
  toast.error(error);

}

}
const handleDelete=async(id)=>{
  try {
    const res=await Swal.fire({
  title: "Do you want to delete this series?",
  
  showCancelButton: true,
  confirmButtonText: "Delete",
  
})
if(res.isConfirmed){
  const result=await deleteMovieAPI(id)
  if(result){
    toast.success("Series deleted successfully")
  }
  getSeries()
}
  } catch (error) {
    
  }
}

useEffect(()=>{
  getSeries()
},[])

const filteredSeries =
  activeGenre === "All"
    ? showseries
    : showseries.filter(
        (series) => series.genre?.toLowerCase() === activeGenre.toLowerCase()
      );
  return (
    <div className='text-white overflow-hidden'>

        <div
        style={{
          height: "250px",
          backgroundImage:
            `url(${seriesData[activeGenre]?.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <div className='w-100 d-flex justify-content-end p-2'>
                 <button onClick={()=>navigate('/movies')} className='btn rounded-3 bg-white text-dark'><HiArrowSmLeft />
Movies
        </button>
               </div>
       <div className='d-flex align-items-center flex-column'>
         <h1 className="fw-bold" style={{fontSize:'7rem'}}>SERIES</h1>
         <button  data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="btn w-50 btn-danger fw-semibold fs-4 btn-sm">Add series</button>
         </div>
      </div>

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

      <div className="container  no-scrollbar overflow-y-auto py-4" style={{height:'410px'}}>
              {filteredSeries.length>0 ? (filteredSeries?.map((series, index) => (
                <div
                  key={index}
                  className="card mb-3 bg-danger text-white shadow"
                >
                  <div className="row g-0">
                    
                    {/* Poster */}
                    <div className="col-md-3 col-12">
                      <img
                        src={series?.poster_url}
                        className="img-fluid w-100 rounded-start"
                        alt="no poster added"
                         style={{
            
            height: "400px",
            objectFit: "cover"
          }}
                      />
                    </div>
      
                    {/* Details */}
                    <div className="col-md-7 col-12">
                      <div className="card-body">
                        <p className="card-title " style={{fontSize:'4rem'}}>{series?.title}</p>
                        
                        <p className='fs-4'>
        
          {series?.status}
          {series?.status === "Not watched" && <FaEyeSlash className='text-warning ms-1 fs-3'/>}
          {series?.status === "Watched" && <IoMdDoneAll className='text-success ms-1 fs-3'/>}
          {series?.status === "Pending" && <FaClock className='text-warning ms-1 fs-3'/>}
          {series?.status === "Watching" && <SiClockify className='text-warning ms-1 fs-3'/>}

      
      </p>
      <p className='fs-5 '>
        <FontAwesomeIcon className='fs-4  text-black' icon={faClapperboard}/> Seasons: {series?.total_seasons}
      </p>
      <p>
        Rating:{" "}
        {series?.rating
          ? [...Array(series.rating)].map((_, i) => (
              <FontAwesomeIcon className='text-warning ms-1' key={i} icon={faStar} />
            ))
          : "Not rated"}
      </p>
      
                        <p>
                          {series?.description}
                        </p>
                       <div className='d-flex gap-2 flex-row'>
                           <div class="dropdown">
        <button class="btn btn-warning dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Update status
        </button>
        <ul class="dropdown-menu">
          <li><a onClick={()=>handleUpdate(series?.id,"Watched")} class="dropdown-item" href="#">Watched</a></li>
          <li><a onClick={()=>handleUpdate(series?.id,"Pending")} class="dropdown-item" href="#">Pending</a></li>
          <li><a onClick={()=>handleUpdate(series?.id,"Watching")} class="dropdown-item" href="#">Watching</a></li>
         
        </ul>
      </div>
      
      {series.status==="Watched"&&
      <div class="dropdown">
        <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Rate
        </button>
        <ul class="dropdown-menu">
          <li><a onClick={()=>handleRating(series?.id,1)} class="dropdown-item" href="#">1</a></li>
          <li><a onClick={()=>handleRating(series?.id,2)} class="dropdown-item" href="#">2</a></li>
          <li><a onClick={()=>handleRating(series?.id,3)} class="dropdown-item" href="#">3</a></li>
          <li><a onClick={()=>handleRating(series?.id,4)} class="dropdown-item" href="#">4</a></li>
          <li><a onClick={()=>handleRating(series?.id,5)} class="dropdown-item" href="#">5</a></li>
          
        </ul>
      </div>}
                       </div>
                      </div>
                    </div>
      
                    <div className='col-md-2 d-flex align-items-center'>
                      <button className='btn btn-light fs-5 text-danger' onClick={() => handleDelete(series?.id)}>Remove</button>
                    </div>
      
                  </div>
                </div>
              ))):<div className='h-100 text-center'>
                <img src={nomovie} className='img-fluid h-100' alt="" />
              </div>
              }
            </div>


      {/* modal for series */}
      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-3" id="staticBackdropLabel">Add your movie</h1>
        <button onClick={handleClose} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body d-flex gap-3 flex-column  ">
        <input value={series?.title} onChange={(e)=>setSeries(prev=>({...prev,title:e.target.value}))} className="form-control" type="text" placeholder="Series Title" aria-label="default input example"/>
        <input value={series?.platform} onChange={(e)=>setSeries(prev=>({...prev,platform:e.target.value}))} className="form-control" type="text" placeholder="Platform" aria-label="default input example"/>
        <input value={series?.total_seasons} onChange={(e)=>setSeries(prev=>({...prev,total_seasons:e.target.value}))} className="form-control" type="number" placeholder="Total Seasons" aria-label="default input example"/>

        <div className='w-100 gap-2 d-flex flex-row justify-content-between'>
          <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Genre
  </button>
  <ul class="dropdown-menu">
    <li><a onClick={()=>setSeries(prev=>({...prev,genre:"Popular"}))} class="dropdown-item" href="#">Popular</a></li>
    <li><a onClick={()=>setSeries(prev=>({...prev,genre:"Action"}))} class="dropdown-item" href="#">Action</a></li>
    <li><a onClick={()=>setSeries(prev=>({...prev,genre:"Comedy"}))} class="dropdown-item" href="#">Comedy</a></li>
    <li><a onClick={()=>setSeries(prev=>({...prev,genre:"Adventure"}))} class="dropdown-item" href="#">Adventure</a></li>
    <li><a onClick={()=>setSeries(prev=>({...prev,genre:"Fantasy"}))} class="dropdown-item" href="#">Fantasy</a></li>
    <li><a onClick={()=>setSeries(prev=>({...prev,genre:"Animation"}))} class="dropdown-item" href="#">Animation</a></li>
    <li><a onClick={()=>setSeries(prev=>({...prev,genre:"Thriller"}))} class="dropdown-item" href="#">Thriller</a></li>
  </ul>

</div>
<input class="form-control" value={series?.genre}  readOnly type="text" placeholder="Genre" aria-label="default input example"/>
        </div>

          <textarea
  value={series.description}
  onChange={(e) => {
    const text = e.target.value;
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

    if (wordCount <= 40) {
      setSeries(prev => ({ ...prev, description: text }));
    }
  }}
  className="form-control"
  placeholder="Description (max 40 words)"
/>
          <input 
  value={series.poster_url}
  onChange={(e)=>setSeries(prev=>({...prev, poster_url: e.target.value}))}
  className="form-control"
  type="text"
  placeholder="Poster Image URL"
/>

      </div>
      <div class="modal-footer">
        <button onClick={handleClose} type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
        <button onClick={handleAddSeries} type="button" data-bs-dismiss="modal" class="btn btn-success">Add series</button>
      </div>
    </div>
  </div>
</div>

<ToastContainer theme='colored' position='top-right' autoClose={2000}/>
    </div>
  )
}

export default Series