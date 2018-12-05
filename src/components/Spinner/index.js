import React from 'react'
import './Spinner.css'

const Spinner = ({ isShowSpinner }) => {
    if (!isShowSpinner) {
        return null
    }

    return (
        <div className="spiner-wrapper">
            <div className="spiner"></div>
        </div>
    )
}
export default Spinner