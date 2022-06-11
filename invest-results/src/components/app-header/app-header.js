import React from "react";
import './app-header.css'

const AppHeader = ({ name }) => {
    return (
        <div className='app-header'>
            {name}
        </div>
    )
}

export default AppHeader;