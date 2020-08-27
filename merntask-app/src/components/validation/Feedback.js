import React from 'react'

const Feedback = ({ message, level }) => {
    return ( 
        <p className={`mensaje error alert ${level}`}>
            {message}
        </p>

     )
}
 
export default Feedback