import React, {useState,useEffect} from 'react';
import { gql, useQuery } from "@apollo/client";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate, useParams} from 'react-router-dom';
import { Container, Row, Col, Image, Form } from 'react-bootstrap';
import patient from '../patientRecord.png';
import { useMutation} from '@apollo/client';
import { useHistory } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

const ADD_HEALTH_INFO = gql`
mutation addInfo( $patientId:String!,
$date:String!, $pulseRate:Int!, 
$bloodPressure:Int!, $weight:Int!, 
$temperature: Int!, $respiratoryRate:Int!)
{
    addInfo( patientId: $patientId
        date: $date        
        pulseRate: $pulseRate
        bloodPressure: $bloodPressure
        weight:$weight
        temperature:$temperature
        respiratoryRate: $respiratoryRate) {
            patientId            
            date
            pulseRate
            bloodPressure
            weight
            temperature            
            respiratoryRate        
        }
    }
`;

const AddHealthInfo= () => {
    let navigate = useNavigate();

    let {patientIdnew} = useParams();

    const [addInfo, { data, loading, error }] = useMutation(ADD_HEALTH_INFO);
    const [info, setInfo] = React.useState({ patientId: '', date: '', pulseRate: 0,
    bloodPressure: 0, weight: 0, temperature: 0, respiratoryRate: 0 });
    const [showLoading, setShowLoading] = useState(false);

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;
  
    const saveInfo = (e) => {
        setShowLoading(true);
        e.preventDefault();
        addInfo({variables:{patientId: info.patientId,
            date: info.date,
            pulseRate: info.pulseRate,
            bloodPressure: info.bloodPressure,
            weight: info.weight,
            temperature:info.temperature,
            respiratoryRate: info.respiratoryRate}
        });
        //
        setInfo({...info, [e.target.name]: ''})
        navigate('/')

    };
    
    const onChange = (e) => {
        e.persist();   
        const value = e.target.name === 'temperature' || e.target.name === 'bloodPressure' || e.target.name === 'weight' || e.target.name === 'pulseRate' || e.target.name === 'respiratoryRate'
            ? parseInt(e.target.value)
            : e.target.value;
        setInfo({...info, [e.target.name]: value});

      }

    return (
        <div className="App">
            {showLoading && 
            <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
            </Spinner> 
        } 
          <Container fluid>
            <Row>
              <Col xs={4.5}>
                <br></br><br></br>
                <h2>DAILY HEALTH INFO</h2>
                <p style={{color: 'red'}}>Enter vital signs: body temperature, heart rate, blood pressure, or respiratory rate!</p>
                <Form onSubmit={saveInfo}>
                  <Form.Group>
                    <Form.Control
                      className="mb-3"
                      id="patientId"
                      name="patientId"
                      type="text"
                      defaultValue={info.patientId}
                      onChange={onChange} 
                      placeholder="&#xf007;; patientId" />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      className="mb-3"
                      id="date"
                      name="date"
                      type="text"
                      defaultValue={info.date}
                      onChange={onChange} 
                      placeholder="&#xf073; date" />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      className="mb-3"
                      id="weight"
                      name="weight"
                      type="number"
                      defaultValue={info.weight}
                      onChange={onChange} 
                      placeholder="&#xf004; weight" />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      className="mb-3"
                      id="temperature"
                      type='number'
                      name="temperature"
                      defaultValue={info.temperature}
                      onChange={onChange} 
                      placeholder="&#xf182; bodyTemperature" />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      className="mb-3"
                      id="bloodPressure"
                      name="bloodPressure"
                      type="number"
                      defaultValue={info.bloodPressure}
                      onChange={onChange} 
                      placeholder="&#xf043; bloodPressure" />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      className="mb-3"
                      id="pulseRate"
                      name="pulseRate"
                      type="number"
                      defaultValue={info.pulseRate}
                      onChange={onChange} 
                      placeholder="&#xf004; heartRate" />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      className="mb-3"
                      id="respiratoryRate"
                      name="respiratoryRate"
                      type="number"
                      defaultValue={info.respiratoryRate}
                      onChange={onChange} 
                      placeholder="&#xf080; respiratoryRate" />
                  </Form.Group>
                  {loading ? <p style={{ color: 'blue' }}>Submitting</p> : <div></div>}
                  {error ? <p style={{ color: 'red' }}>{error.message}</p> : <div></div>}
                  <Button size="sm" variant="success" type="submit" >&#xF090; SAVE</Button>
                </Form>
              </Col>
            </Row>
          </Container>
    
        </div>
      );
}

export default AddHealthInfo
