import React from 'react'
import '../styles/Completion.css'
import paymentComplete from './../paymentComplete.png'
function Completion() {
    
    //After completion of payment just return to homepage
    const ReturnToHome=()=>{
        window.location.reload()
    }
    return (
        <div className="completionContainer">
            <img src={paymentComplete }alt="Payment Completed"/>
            {/* <a target="_blank" href="https://icons8.com/icon/HnXRT7E5UtPf/verified-badge">Verified Badge</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a> */}
            <h3>Payment Complete</h3>
            con
            <div className="details">
              <h3>Name :{String(localStorage.getItem("name"))} </h3>
              <h3>Age : {String(localStorage.getItem("age"))} years </h3>
              <h3>Start Date : {String(localStorage.getItem("startDate"))} </h3>
              <h3>Batch : {String(localStorage.getItem("batchNumber"))} </h3>
              <h3>Fees Paid : 500 Rs. </h3>
            </div>

            <button type="button"
             onClick={ReturnToHome}
            >
            Return to home <i class="fas fa-home"></i></button>
            <h1>check your email to get details</h1>
        </div>
    )
}

export default Completion
