import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

const PatientSymptoms = () => {

const apiUrl = 'http://localhost:4000/runWithParam';

const [data, setData] = useState({});
const [showLoading, setShowLoading] = useState(false);
const initialInput = {
age: 1,
sex: '',
bmi: 0,
fever: '',
fatigue: '',
respiratory_symptoms: '',
gastrointestinal_symptoms: '',
headache: '',
skin_symptoms: '',
joint_pain: '',
muscle_pain: '',
swollen_lymph_nodes: '',
mental_health_symptoms: '',
};
const [currentInput, setCurrentInput] = useState(initialInput);

const handleInputChange = (event) => {
  setCurrentInput({ ...currentInput, [event.target.name]: event.target.value });
};
const getPrediction = (prediction) => {
  const maxValue = Math.max(...Object.values(prediction));
  const maxKey = Object.keys(prediction).find(key => prediction[key] === maxValue);

 
  switch (maxKey) {
    case 'row1':
      return "You are fine! However, Checkup is always recommended";
    case 'row2':
      return "Go to Doctor to confirm your diagnosis";
    default:
      return "Insufficient data to predict!";
  }
};

const handleRun = (e) => {
  e.preventDefault();
  setShowLoading(true);
  setData(null);
  axios
  .post(apiUrl, currentInput)
  .then((result) => {
  setData(result.data);
  
  })
  .catch((error) => {
  console.log("error in fetchData:", error);
  alert("An error occurred. Please try again later.");
  });
};
useEffect(() => {
if (data) {
setShowLoading(false);
}
}, [data]);


  return (
    <div className="App">
      <h2>Patient Symptoms</h2>
      <Form onSubmit={handleRun}>
        <Form.Group controlId="age" >
          <Form.Label className="float-left">Age:</Form.Label>
          <Form.Control
            className="mb-3 float-right"
            type="number"
            min="1"
            max="100"
            value={currentInput.age}
            onChange={handleInputChange}
            placeholder="Enter Age"
            name='age'
            required
          />
        </Form.Group>
        <Form.Group controlId="sex" >
          <Form.Label className="float-left">Sex:</Form.Label>
          <Form.Control
            className="mb-3 float-right"
            as="select"
            value={currentInput.sex}
            onChange={handleInputChange}
            name='sex'
            required
          >
            <option value={0}>Female</option>
            <option value={1}>Male</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="bmi" >
          <Form.Label className="float-left">BMI:</Form.Label>
          <Form.Control
            className="mb-3 float-right"
            type="number"
            step="0.01"
            placeholder='Enter BMI'
            value={currentInput.bmi}
            onChange={handleInputChange}
            name='bmi'
            required
          />
        </Form.Group>
        <Form.Group controlId="fever" >
          <Form.Label className="float-left">Fever:</Form.Label>
          <Form.Control
            className="mb-3 float-right"
            as="select"
            value={currentInput.fever}
            onChange={handleInputChange}
            name='fever'
            required
          >
            <option value={0}>Absent</option>
            <option value={1}>Present</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="fatigue" >
          <Form.Label className="float-left">Fatigue:</Form.Label>
          <Form.Control
            className="mb-3"
            as="select"
            value={currentInput.fatigue}
            onChange={handleInputChange}
            name='fatigue'
            required
        >
          <option value={0}>Absent</option>
          <option value={1}>Present</option>
        </Form.Control>
        </Form.Group>
      <Form.Group controlId="respiratorySymptoms" >
        <Form.Label className="float-left">Respiratory Symptoms:</Form.Label>
        <Form.Control
         className="mb-3"
          as="select"
          value={currentInput.respiratory_symptoms}
          onChange={handleInputChange}
          name='respiratory_symptoms'
          required
        >
          <option value={0}>Absent</option>
          <option value={1}>Present</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="gastrointestinalSymptoms" >
        <Form.Label className="float-left">Gastrointestinal Symptoms:</Form.Label>
        <Form.Control
         className="mb-3"
          as="select"
          value={currentInput.gastrointestinal_symptoms}
          onChange={handleInputChange}
          name='gastrointestinal_symptoms'
          required
        >
          <option value={0}>Absent</option>
          <option value={1}>Present</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="headache" >
        <Form.Label className="float-left">Headache:</Form.Label>
        <Form.Control
         className="mb-3"
          as="select"
          value={currentInput.headache}
          onChange={handleInputChange}
          name='headache'
          required
        >
          <option value={0}>Absent</option>
          <option value={1}>Present</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="skinSymptoms" >
          <Form.Label className="float-left">Skin Symptoms:</Form.Label>
          <Form.Control
           className="mb-3"
            as="select"
            value={currentInput.skin_symptoms}
            onChange={handleInputChange}
            name='skin_symptoms'
            required
          >
            <option value={0}>Absent</option>
            <option value={1}>Present</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="jointPain" >
          <Form.Label className="float-left">Joint Pain:</Form.Label>
          <Form.Control
           className="mb-3"
            as="select"
            value={currentInput.joint_pain}
            onChange={handleInputChange}
            name='joint_pain'
            required
          >
            <option value={0}>Absent</option>
            <option value={1}>Present</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="musclePain" >
          <Form.Label className="float-left">Muscle Pain:</Form.Label>
          <Form.Control
           className="mb-3"
            as="select"
            value={currentInput.muscle_pain}
            onChange={handleInputChange}
            name='muscle_pain'
            required
          >
            <option value={0}>Absent</option>
            <option value={1}>Present</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="swollenLymphNodes" >
            <Form.Label className="float-left">Swollen Lymph Nodes:</Form.Label>
            <Form.Control
             className="mb-3"
                as="select"
                value={currentInput.swollen_lymph_nodes}
                onChange={handleInputChange}
                name='swollen_lymph_nodes'
                required
            >
                <option value={0}>Absent</option>
                <option value={1}>Present</option>
            </Form.Control>
        </Form.Group>
        <Form.Group controlId="mentalHealthSymptoms">
            <Form.Label className="float-left">Mental Health Symptoms:</Form.Label>
            <Form.Control
             className="mb-3"
                as="select"
                value={currentInput.mental_health_symptoms}
                onChange={handleInputChange}
                name='mental_health_symptoms'
                required
            >
                <option value={0}>Absent</option>
                <option value={1}>Present</option>
            </Form.Control>
        </Form.Group>
        <Button variant="info" type="submit">
          Check Symptoms
        </Button>
      </Form>
      {data ? (
          <div>
            <h1>Prediction Results</h1>
            <h2> {getPrediction(data)}</h2>
            
          </div>
        ) : (
          <div>
            {showLoading && (
              <>
                <p>
                  {" "}
                  <span className="sr-only">Waiting for results...</span>
                </p>
                <Spinner animation="border" />
              </>
            )}
          </div>
        )}
    </div>
  );
};

export default PatientSymptoms;