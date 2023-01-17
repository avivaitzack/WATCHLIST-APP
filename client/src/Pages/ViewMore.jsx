import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBBtn,
} from "mdb-react-ui-kit";

export default function ViewMore() {
  let { showname } = useParams();
  const [show, setshow] = useState([]);
  const [showSum, setshowSum] = useState();

  useEffect(() => {
    axios.get(
        `https://api.tvmaze.com/singlesearch/shows?q=${showname}&embed=episodes`
      ).then((res) => {
        const data = res.data;
        setshow([data]);
        setshowSum(data.summary);
      });
  }, [showname]);

  
  

  console.log(show);

  return (
    <div style={{ padding: "7px", margin: "2px" }}>
      {show.map((show) => (
        <MDBCard key={show.id} style={{ backgroundColor: "#0C090A" }}>
          <MDBRow className="g-0">
            <MDBCol md="4">
              <MDBCardImage
                src={show.image.medium}
                alt="..."
                height={600}
                width={600}
              />
            </MDBCol>
            <MDBCol md="8">
              <MDBCardBody>
                <MDBCardTitle>{show.name}</MDBCardTitle>
                <MDBCardText>
                  <small className="text-muted">{show.genres}</small>
                </MDBCardText>
                <MDBCardText 
                  dangerouslySetInnerHTML={{ __html: showSum }}
                ></MDBCardText>
                <Button  variant="primary">ADD TO WATCHLIST</Button>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      ))}
    </div>
  );
}