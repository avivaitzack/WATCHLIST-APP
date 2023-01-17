import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import '../App.css';

export default function GenreGallery(prpos) {
  let { genre } = useParams();
  const navigate = useNavigate();
  const [shows, setShows] = useState([]);

  useEffect(() => {
    axios.get(`https://api.tvmaze.com/shows`).then((res) => {
      const data = res.data.filter((show) =>
        show.genres.includes(`${genre}`)
      );
      setShows(data);

    });
  }, [genre]);
 
  function handleClick(showname) {
    navigate(`/viewmore/${showname}`)
  }

  return (
    <div style={{margin:'35px'}} className="d-flex flex-wrap justify-content-center">
      {shows.map((show) => (
         <Card key={show.id} style={{ width: '14rem', backgroundColor:'#0C090A', margin:'15px'}}>
         <Card.Img variant="top" src={show.image.medium}/>
         <Card.Body>
           <Card.Title >{show.name}</Card.Title>
           
         </Card.Body>
         <Button onClick={()=> handleClick(`${show.name}`)}  variant="primary">view more</Button>
       </Card>
   ))}
    </div>
  );
}