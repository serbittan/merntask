import React from 'react'

const Feedback = ({ message }) => {
    return ( 
        <div>
            <p className="mensaje error">{message}</p>
        </div>

     )
}
 
export default Feedback