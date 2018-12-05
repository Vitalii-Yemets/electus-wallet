import React from 'react'
import './Preloader.css'

const Preloader = ({ isShowPreloader }) => {
    if (!isShowPreloader) {
        return null
    }

    return (
        <div className="preloader-wrapper">
            <div className="preloader"></div>
        </div>
    )
}

export default Preloader