import React from 'react'
import img from '../assets/home_pic.png'
import { faClapperboard, faFilm, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GiStopwatch } from "react-icons/gi";
import { GiPopcorn } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';


const Home = () => {

    const navigate=useNavigate()
  return (
     <div className="w-100 d-flex align-items-center flex-column justify-content-center py-5">
      <div className="row justify-content-center align-items-center">

        
        <div className="col-md-6 col-12">
          <h1 className="fw-bold text-danger display-4"style={{fontSize:'5rem'}}>
            Hello. <br /> I'm MovieMate.
          </h1>

          <p className="text-muted mt-3">
            Your personal movie tracking companion. Discover, track and manage
            all your favorite movies and series in one place.
          </p>

          <button onClick={()=>navigate('/movies')} className="btn btn-danger mt-3">
            Explore Now
          </button>
        </div>

        
        <div className="col-md-6 col-12 text-center mt-4 mt-md-0">
          <div className="animation-box">
            <img src={img} alt="" />
          </div>
        </div>

      </div>

 

<div className="overflow-hidden position-relative w-100 mt-5 bg-white py-2">
  <div className="marquee-track bg-white text-danger gap-3 fs-4 d-inline-block text-nowrap">
      <FontAwesomeIcon className='fs-4  text-black' icon={faClapperboard}/> MovieMate • Track •<FontAwesomeIcon className='fs-4  text-black' icon={faFilm} /> Discover •<GiPopcorn className='fs-4  text-black' />
 Enjoy  •<FontAwesomeIcon className='fs-4  text-black' icon={faClapperboard}/> MovieMate • <GiStopwatch className='fs-4  text-black'/>
Track •<FontAwesomeIcon className='fs-4  text-black' icon={faFilm} /> Discover •<GiPopcorn className='fs-4  text-black' /> Enjoy
  </div>
</div>
    </div>
  )
}

export default Home