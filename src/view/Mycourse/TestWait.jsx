import React from 'react';
import { Container, Row, Col, Card, Stack } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';


function formatTime(seconds) {
    const milliseconds = seconds * 1000; // Convert seconds to milliseconds
    const date = new Date(milliseconds);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours() % 12 || 12).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'pm' : 'am';
  
    return `${day}/${month}/${year}, ${hours}:${minutes} ${ampm}`;
  }


function TestWait() {
    const {id} = useParams();
    console.log(id);
    console.log(formatTime(id));
    
  return (
    <Container>
  <div style={{width:'100%',display:'flex',justifyContent:'center'}}>

  <Card className='border-0 text-center' style={{ width: '25rem' }}>
      <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKX_DD02B1hctMEzBEr9QWM7iF0jyO_clq6ZlEzliDdg&s" />
      <Card.Body>
        <Card.Title style={{textTransform:'uppercase',letterSpacing:'2px',fontSize:'2rem'}}>test successfully submited!</Card.Title>
        <Card.Title>Your result will be out on</Card.Title>
        <Card.Title style={{textTransform:'uppercase',letterSpacing:'2px',fontSize:'1.5rem'}}>{formatTime(id)}</Card.Title>
     
     
      </Card.Body>
    </Card>

  </div>
    </Container>
  );
}

export default TestWait;
