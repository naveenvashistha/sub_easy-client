import React,{useState} from "react";
import axios from 'axios';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Form, ListGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {searchSubtitles, parseToVTT} from "wyzie-lib";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { set } from "lodash";

function Download(props){
   const [movie,setMovie] = useState({
         name:"",
         year:"",
   });
   const [show, setShow] = useState(false);

   function handleChange(event){
       const {name,value} = event.target;
       setMovie((prevValue)=>{
           return {
               ...prevValue,
               [name]:value
           };
       });
   }
   const [waiting,setWaiting] = useState("");
   const [link,setLink] = useState([]); 
   const [msg,setMsg] = useState("");
   async function search(event){
        try {
            event.preventDefault();
            setMsg("Searching...");   
            var res = await axios.post("http://localhost:5000/searchIMDB", movie);
            if(res.data.Response === "True"){
                var subs = await searchSubtitles({imdb_id: res.data.imdbID});
                setMsg("");
                setLink(subs);
            } else {
                setWaiting("Movie not found");
                setMsg("");
                setShow(true);
            }
        } catch (error) {
            setWaiting("Error occurred while searching");
            setMsg("");
            setShow(true);
        }
        finally {
            setMovie({
                name:"",
                year:"",
            });
        }
   }
   async function FetchAndSetSubtitle(url){
        try {
            const vttContent = await parseToVTT(url);
            const vttBlob = new Blob([vttContent], { type: 'text/vtt' });
            const vttUrl = URL.createObjectURL(vttBlob);
            props.subRef.src = vttUrl;
            props.setsubText("");
            props.myVideo.textTracks[0].mode = "disabled";
            setLink([]);
            setWaiting("subtitle added successfully");
            setShow(true);
            setMsg("");
        } catch (error) {
            setWaiting("Error occurred while fetching subtitle");
            setMsg("");
            setShow(true);
        }
   }

    return (
    <Row className="row-content margin-above">
        <Col xs = {9} className="subtitle-box">
            <div style={{textAlign: "center", padding: "1rem"}}>
                <h1>Find Subtitles</h1>
                <p style={{color: "grey"}}>Search for any movie or TV show</p>
            </div>
        <Form onSubmit={search}>
            <Row className="row-content">
                <Col sm = {4} className="padding-bottom">
                    <Form.Control placeholder="Movie" type="text" name="name" value={movie.name} onChange={handleChange} />
                </Col>
                <Col sm = {4} className="padding-bottom">
                    <Form.Control placeholder="Year" type="text" name="year" value={movie.year} onChange={handleChange} />
                </Col>
                <Col sm = {3} style={{textAlign: "right"}}>
                    <Button type="submit" className="play-btn"><FontAwesomeIcon icon={faMagnifyingGlass}/> search</Button>
                </Col>
            </Row>        
        </Form>

        <ListGroup>
            {link.map((element,i)=>{
                return <ListGroup.Item onClick={()=>FetchAndSetSubtitle(element.url)}>{element.display}</ListGroup.Item>
            })}
        </ListGroup>
        { msg && <p className="subtitle-msg">{msg}</p>}
    </Col>
    <Row>
      <Col xs={6}>
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 10000, position: 'fixed'}}>
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide style={{backgroundColor: '#000', color: 'white'}}>
          <Toast.Body>{waiting}</Toast.Body>
        </Toast>
        </ToastContainer>
      </Col>
    </Row>
    </Row>
    
    );
}
export default Download;