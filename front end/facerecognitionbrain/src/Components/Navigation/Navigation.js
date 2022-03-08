import React from "react";

const Navigation = ({onRouteChange, route}) => {
    return(
        <nav className="f3 pa3 underline " style={{display:"flex", justifyContent: 'end'}}>
            {
            (route === 'signin') ? 
                <div></div> : (route === 'register') ?
            <div onClick={() => onRouteChange('signin')} className="link dim black b pointer">Sign In</div>:
            <div onClick={() => onRouteChange('signin')} className="link dim black b pointer">Sign Out</div>
            }
        </nav>
    )

}

export default Navigation