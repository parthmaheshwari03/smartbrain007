import React from "react";

const Rank = ({name, entries}) => {
    return(
        <div className="f3 tc">
            {name}'s count of faces is:
            <p className="f2">{entries}</p>
        </div>
        
    )

}

export default Rank