import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { Form, Col, Button } from 'react-bootstrap';

export default function CandidatePage(props) {
    let { id } = useParams(); // bring the params from URL
    let [candidate, setCandidate] = useState(null)
    let history = useHistory();
    let [view, setView] = useState('detail');
    // need a function to get single candidate

    const getSingleCandidate = async (props) => {
        let url = "http://localhost:3001/candidates/" + id;
        let reponse = await fetch(url);
        let result = await reponse.json();
        console.log(result)
        setCandidate(result);
    }

    const postData = async (e) => {
        e.preventDefault();
        console.log("here")

        let config = {
            method: "PUT",
            body: JSON.stringify(candidate),
            headers: {
                "Content-Type": "application/json",
            }
        }
        console.log('config', config);

        const respone = await fetch(`http://localhost:3001/candidates/${id}`, config)
        // go back to the previous page
        history.goBack();
    }

    useEffect(() => { getSingleCandidate() }, []);
    if (candidate == null) {
        return (
            <h1> there is no candidate to show </h1>
        )
    }
    if (view === 'detail') {
        return (
            <div>
                <div>firstName: {candidate.first_name}  </div>

                <div>Last Name: {candidate.last_name}  </div>
                <button onClick={() => { setView('edit') }}> Edit Detail </button>
            </div>
        )
    }
    if (view === 'edit') {
        return (
            <div>
                <button onClick={()=>{setView('detail')}}> Closed Edit </button>
                <Form onSubmit={(e) => postData(e)} >
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" value={candidate.first_name}
                                onChange={(e) => { setCandidate({ ...candidate, first_name: e.target.value }) }} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" value={candidate.last_name}
                                onChange={(e) => { setCandidate({ ...candidate, last_name: e.target.value }) }} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={candidate.email}
                                onChange={(e) => { setCandidate({ ...candidate, email: e.target.value }) }} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Gender </Form.Label>
                            <Form.Control type="text" value={candidate.gender}
                                onChange={(e) => { setCandidate({ ...candidate, Gender: e.target.value }) }} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Company</Form.Label>
                            <Form.Control type="text" value={candidate.Company}
                                onChange={(e) => { setCandidate({ ...candidate, Company: e.target.value }) }} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Job Title</Form.Label>
                            <Form.Control type="text" value={candidate.job_title}
                                onChange={(e) => { setCandidate({ ...candidate, job_title: e.target.value }) }} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" value={candidate.city}
                                onChange={(e) => { setCandidate({ ...candidate, city: e.target.value }) }} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Country</Form.Label>
                            <Form.Control type="text" value={candidate.country}
                                onChange={(e) => { setCandidate({ ...candidate, country: e.target.value }) }} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Photo</Form.Label>
                            <Form.Control type="text" value={candidate.photo_url}
                                onChange={(e) => { setCandidate({ ...candidate, photo_url: e.target.value }) }} />
                        </Form.Group>
                    </Form.Row>



                    <Button variant="primary" type="submit">
                        Submit
      </Button>
                </Form>
            </div>
        )
    }

}
