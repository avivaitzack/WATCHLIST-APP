import React from 'react';
import Slider from './Slider'

import '../App.css'

export default function Gallery() {
    const Genres =['Drama', "Romance",'Action','Horror','History','Crime','Thriller','Science-Fiction','Anime','Adventure' ]
  return (
    <div className="d-flex flex-wrap justify-content-center">
        {Genres.map((genre)=>{
  return (
    <Slider key={genre} genre={genre}/>
  )
})}
    
    </div>
  )
}