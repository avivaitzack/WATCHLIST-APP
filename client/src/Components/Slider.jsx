import React, { useEffect, useState  } from "react";
import  { useNavigate  } from "react-router-dom";
import { getData } from "../ApiCalls/shows";
import Carousel from "react-bootstrap/Carousel";
import Button from 'react-bootstrap/Button';


export default function Slider(prpos) {
  const [shows, setShows] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const getshowsData = async () =>{
      const result = await getData();
      const data = result.data.filter((show) => show.genres.includes(`${prpos.genre}`));
      setShows(data);
    }
    getshowsData();
  }, [prpos.genre]);

  
  function handleClick() {
    navigate(`/genre/${prpos.genre}`)
  }

  return (
    <div style={{ height: "500px", width: "300px",margin:'50px'}}>
      <Carousel>
        {shows.map((show) => (
          <Carousel.Item  key={show.id}>
            <img
              className="d-block w-100"
              src={show.image.medium}
              alt=''
            />
             <Carousel.Caption>
        </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      <Button style={{width: "300px",}} onClick={handleClick}  variant="primary">{prpos.genre}</Button>
    </div>
  );
}