import React, { useState, useEffect } from "react";
import {
  validateAge,
  validateEmail,
  validateName,
} from "../function/functions";
import "../styles/Form.css";


function Form() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [batchNumber, setBatchNumber] = useState();
  const [gender, setGender] = useState("");
  useEffect(() => {
    localStorage.clear();
  }, []);

  const SaveData = () => {
    console.log("SaveData function is called");

    //Changing startdate format to mm/dd/year
    var err = "";

    if (!validateEmail(email)) {
      err += "Email is Not valid\n";
    }

    if (!validateName(name)) {
      err += "Name is not valid\n";
    }

    if (!validateAge(age)) {
      err += "Age must lie between 18 and 65\n";
    }
    if (err.length === 0) {
      var newStartDate = "";
      newStartDate +=
        startDate[5] +
        startDate[6] +
        "/" +
        startDate[8] +
        startDate[9] +
        "/" +
        startDate.substr(0, 4);

        console.log("Before fetch call");

      //Store the data on the database by calling the REST API
      // fetch("https://yoga-backend-new.onrender.com/user", {
        fetch("https://yoga-backend-x71i.onrender.com/user",{
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          age: Number(age),
          email: email,
          gender: gender,
          startDate: newStartDate,
          feesPaid: 500,
          batchNumber: batchNumber,
        }),
      })
        // .then((response) => response.json())
        .then((response) => {

          console.log("Response status:", response.status);

          if (response.status === 204) {
            // Handle the case when the request is successful but there's no data in the response
            console.log("User successfully enrolled, but no additional data returned");
            // Perform actions to move to the payment page or display a success message
          } else {
            // If the server responds with a different status code, assume there's data and parse it as JSON
            return response.json();
          }
        })
        
        //Response from the REST API
        .then((responseData) => {
          console.log("Response Data:", responseData);
          const message_id = responseData.message_id;
          console.log("Message ID:", message_id);
          


          //If successful updation is there or successfull insertion is there
          if (message_id === "1" || message_id === "3" || message_id === "2") {
            //Store the information locally to be used later
            localStorage.setItem("name", name);
            localStorage.setItem("age", Number(age));
            localStorage.setItem("email", email);
            localStorage.setItem("startDate", newStartDate);
            localStorage.setItem("batchNumber", batchNumber);

            //Move to the payment dialogue box
            document.querySelector(".formContainer").style.display = "none";
            document.querySelector(".paymentContainer").style.display = "flex";
          }
          //Else anything else happens then create a mockup box
          else {
            const message = responseData.message;
            window.alert(message);
            //If plan is active then simply reload the application
            if (message_id === "2") {
              window.location.reload();
            }
          }
          console.log("After fetch call");
        })
        .catch((err) => {
          console.log(`Error in accessing the server is ${err}`);
        });
    }
    else alert('There were some errors in the filling of form:-\n' + err)
  };
  const handleNameChange = (b) => {
    setName(b);
  };
  const handleEmailChange = (b) => {
    setEmail(b);
  };
  const handleAgeChange = (b) => {
    setAge(b);
  };

  return (
    <div className="formContainer" >

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => handleNameChange(e.target.value)}
        autoComplete="off"
      />
      <input
        type="string"
        placeholder="Age"
        value={age}
        onChange={(e) => handleAgeChange(e.target.value)}
        min="18"
        max="65"
      />
      <input
        type="string"
        placeholder="Gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      />
      <input
        type="text"
        placeholder="E-mail"
        value={email}
        onChange={(e) => handleEmailChange(e.target.value)}
      />
      <input
        type="date"
        placeholder="Starting date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <div className="batchTiming">
        <h>Select batch timing:</h>
        <div className="batchOptions">
          <div>
            <input
              type="radio"
              id="first"
              name="batchNo"
              value="1"
              onChange={(e) => setBatchNumber(e.target.value)}
            />
            <label htmlFor="first">6 AM-7 AM</label>
            <br />
          </div>
          <div>
            <input
              type="radio"
              id="second"
              name="batchNo"
              value="2"
              onChange={(e) => setBatchNumber(e.target.value)}
            />
            <label htmlFor="second">7 AM-8 AM</label>
            <br />
          </div>
          <div>
            <input
              type="radio"
              id="third"
              name="batchNo"
              value="3"
              onChange={(e) => setBatchNumber(e.target.value)}
            />
            <label htmlFor="third">8 AM-9 AM</label>
          </div>
          <div>
            <input
              type="radio"
              id="fourth"
              name="batchNo"
              value="4"
              onChange={(e) => setBatchNumber(e.target.value)}
            />
            <label htmlFor="fourth">5 PM-6 PM</label>
          </div>
        </div>
      </div>
      <button className="toPayment" onClick={SaveData}>
        Enroll Now <i class="fas fa-arrow-right"></i>
      </button>
    </div>
  );
}

export default Form;
