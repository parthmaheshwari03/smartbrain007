import React from "react";
import './imagelinkform.css'

const ImagelinkForms = ({onInputChange, onSubmit}) => {
    return(
        <div className="tc">
            <p className="f3">Enter the image link to predict the face of</p>
            <div className='form w-40 center shadow-5 pa3 br3'>
                <input onChange={onInputChange}  className="f4 w-70 pa2 mr3 center" type='text'/>
                <button onClick={onSubmit}  className="f4 ph3 white dib pv2 bg-light-purple w-20 ph3 link grow"> Detect </button>
            </div>
            
        </div>
    )

}

export default ImagelinkForms