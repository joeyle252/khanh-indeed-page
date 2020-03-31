import React from 'react'
import { useState, useEffect } from 'react';
import { Card, ListGroup, ListGroupItem, Row, Col, Container } from 'react-bootstrap';
import { faMap, faEdit, faTrash, faUserMd } from "@fortawesome/free-solid-svg-icons";
import { faMapPin, faEnvelope, faVenusMars, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CandidatesPage(props) {

  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      const resp = await fetch('http://localhost:3001/candidates');
      const respJson = await resp.json();
      console.log('khanh', respJson);
      console.log('resp', resp)
      setCandidates(respJson)
    }
    fetchCandidates();

  }, [])

  const onDeleteCandidate = id => {
    try {
      const config = { method: "DELETE" };
      fetch(`http://localhost:3001/candidates/${id}`, config);
      const newCandidates = candidates.filter(candidate => candidate.id !== id);
      setCandidates(newCandidates);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <Container fluid>
      <Row>
        {candidates.map((candidate) => {
          return (
            <Col lg="3" key={candidate.id}>
              <Card>
                <Card.Img variant="top" src={candidate.photo_url} />
                <Card.Body>
                  <Card.Title>
                    {candidate.first_name + " " + candidate.last_name}
                  </Card.Title>
                  <Card.Text>{candidate.id}</Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>
                    <FontAwesomeIcon icon={faBriefcase} /> {candidate.company}
                  </ListGroupItem>
                  <ListGroupItem>
                    <FontAwesomeIcon icon={faUserMd} /> {candidate.job_title}
                  </ListGroupItem>
                  <ListGroupItem>
                    <FontAwesomeIcon icon={faVenusMars} /> {candidate.gender}
                  </ListGroupItem>
                  <ListGroupItem>
                    <FontAwesomeIcon icon={faMapPin} /> {candidate.city}
                  </ListGroupItem>
                  <ListGroupItem>
                    <FontAwesomeIcon icon={faMap} /> {candidate.country}
                  </ListGroupItem>
                  <ListGroupItem>
                    <FontAwesomeIcon icon={faEnvelope} /> {candidate.email}
                  </ListGroupItem>
                </ListGroup>
                <Card.Body>
                  <Card.Link onClick={() => onDeleteCandidate(candidate.id)}>
                    <FontAwesomeIcon icon={faTrash} /> Remove
      </Card.Link>
                  <Card.Link href={`/candidates/${candidate.id}`}>
                    <FontAwesomeIcon icon={faEdit} /> Edit
      </Card.Link>
                </Card.Body>
              </Card>
            </Col>

          )
        })}
      </Row>
    </Container>

  )
}

