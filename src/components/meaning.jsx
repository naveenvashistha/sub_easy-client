import React, {useRef} from "react";
import Tooltip from "react-bootstrap/Tooltip";
import Overlay from "react-bootstrap/Overlay";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
function Meaning(props){ 

    const target = useRef(null);
    function handleClick(){
        props.setShow(false);
    }
    
   return (
        <div>
        <div className="overlay" ref={target} onMouseUp={props.textSelect} onCopy={props.textSelect}>
           {props.subText}
        </div>
        <Overlay target={target.current} show={props.show} placement="top" container={props.container.current}>
            {(overlayProps) => (
            <Tooltip id="overlay-example" {...overlayProps}>
                <p className="meaning">{props.wordMeaning}</p>        
                <FontAwesomeIcon icon={faXmark} className="cancel-meaning-icon" onClick={handleClick}/>
            </Tooltip>
            )}
        </Overlay>
       </div>
   );
}

export default Meaning; 

