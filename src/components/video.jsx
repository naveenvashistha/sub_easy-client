import React,{useState,useRef,useEffect} from "react";
import Meaning from "./meaning";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faExpand} from '@fortawesome/free-solid-svg-icons';
import "./styles.css";
import UploadVideo from "./upload-video";
import UploadSubtitle from "./upload-subtitle";
import Download from "./download.jsx";

import Msg from "./msg";
import Footer from "./footer";
import Heading from "./heading";
const _ = require("lodash");

function Video(){
   const [subName,setSubName] = useState("");
   const [msg,setmsg] = useState("");
   const [videoName,setVideoName] = useState("");
   const subRef = useRef();
   const myVideo = useRef();
   const mainBox = useRef();
   const [show, setShow] = useState(false);
   const [wordMeaning,setwordMeaning] = useState([]);
   const [screenHeight,setScreenHeight] = useState("video-box");
   const [Video,setVideo] = useState();
   const [subtitle,setSubtitle] = useState();
   const [subText,setsubText] = useState("");
   useEffect(() => {
       setVideo(myVideo.current);
       setSubtitle(subRef.current);
       myVideo.current.textTracks.onchange = (event)=>{
           if(event.target[0].mode === "disabled"){
              setShow(false);
              setsubText("");
           }
       }

       myVideo.current.addEventListener("play",()=>{
          setShow(false);
       });

      // Listen for fullscreen change events for different browsers
      function handleFullscreenChange() {
         if (
           !document.fullscreenElement &&
           !document.webkitFullscreenElement &&
           !document.mozFullScreenElement &&
           !document.msFullscreenElement
         ) {
           setShow(false);
           setScreenHeight("video-box");
         }
      }

      document.addEventListener("fullscreenchange", handleFullscreenChange);
      document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.addEventListener("mozfullscreenchange", handleFullscreenChange);
      document.addEventListener("MSFullscreenChange", handleFullscreenChange);
      

      subRef.current.addEventListener("cuechange",(event)=>{
         
         console.log(event.target.track.activeCues);
         
         if (event.target.track.activeCues.length > 0){
         setsubText(event.target.track.activeCues[0].text);
         }
         else{
            setsubText("");
         }
      });
       
    }, []);
   
   function goFullScreen(){
      setScreenHeight("fullscreen-height");
      setShow(false);
      mainBox.current.webkitRequestFullscreen();
      
   }

   
   function textSelect(){
      
      if(myVideo.current.paused){
      const text = window.getSelection();
      const str = _.trim(text.toString());
      
      window.getSelection().removeAllRanges();
      console.log(str);
      if (str.split(" ").length === 1 && str.split(" ")[0] !== ""){
         axios.get('https://api.dictionaryapi.dev/api/v2/entries/en/'+ str)
         .then(results=>{
             setwordMeaning(results.data[0].meanings[0].definitions[0].definition);
             setShow(true);
            })
            .catch((error)=>{
                setwordMeaning("No definition found");
                setShow(true);
            });
     }
   }
}

   return (
      <div className="main-box">
      <Heading />
      

      <Row className="row-content" style={{marginTop: "7rem"}}>
      <Col sm={9} xs={9} className="main-box no-padding" ref={mainBox}>
      <video controls preload="metadata" className={screenHeight} ref={myVideo} controlsList="nofullscreen">       
       <track src={process.env.PUBLIC_URL + "/test.vtt"} kind="subtitles" srcLang="en" label="English" ref={subRef}></track>
    </video>
    <Meaning
         textSelect = {textSelect}
         subText = {subText}
       show = {show}
       wordMeaning = {wordMeaning}
       setShow = {setShow}
       container = {mainBox}
    />
    </Col>
    </Row>
    <Row className="row-content">
    <Col sm={9} xs={9} className="no-padding row-content-space-between">
    <div onClick={goFullScreen}><FontAwesomeIcon icon={faExpand} className="fullscreen-btn" /></div>
    <UploadVideo
       myVideo = {Video}
       setsubText = {setsubText}
       setVideoName = {setVideoName}
    />
    <UploadSubtitle
       myVideo = {Video}
       subRef = {subtitle}
       setsubText = {setsubText}
       setSubName = {setSubName}
       setmsg = {setmsg}
    />
    </Col>
    </Row>
    <Msg 
       msg={msg}
       subName={subName}
       videoName={videoName}
    />
    <Download 
      myVideo={Video}
      subRef={subtitle}
      setsubText={setsubText}
    />
    <Footer />
    </div>
   );
}

export default Video;