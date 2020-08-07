import React, { useContext } from 'react'
import { alertContext } from '../../context/alerts'

const Feedback = ({ message, level }) => {
    const alertsContext = useContext(alertContext)
    const { alert, alertShow } = alertsContext
    return ( 
        <div className={`alert ${alert.level}`}>
            {alert.message}
        </div>

     )
}
 
export default Feedback