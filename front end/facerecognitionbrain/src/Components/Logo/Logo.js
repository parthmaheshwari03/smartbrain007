import React from "react";
import image from './brainImage.jpg'
import Tilt from 'react-parallax-tilt';

const Logo = () => {
    return(
        <div style={{display: 'flex' , justifyContent: "center"}}>
            <Tilt className="Tilt br2 " options={{ max : 100 }} style={{ height: 175 , width: 300}} >
                <div style={{display: 'flex' , justifyContent: "center", alignContent: "center"}} className="Tilt-inner pa3">
                    <img className="" src={image} height={150}/>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;