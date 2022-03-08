import React from "react";
import './FaceRecognition.css'

const FaceRecognition = ({imageURL, box}) => {
    return(
        <div className=" ma" style = {{display: 'flex' , justifyContent: 'center'}} >
            <div className="absolute mt2">
                <img id = 'inputImage' className="pa3" alt="girlImage" src={imageURL} 
                width={400} />
                <div className="bounding_box" style={{left: box.leftCol, top: box.topRow, right: box.rightCol, bottom: box.bottomRow}}> </div>
            </div>

        </div>
    );

}

export default FaceRecognition