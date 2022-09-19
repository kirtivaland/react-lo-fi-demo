import React from 'react';
import { Container, Row, Col } from "react-bootstrap";

import './App.css';

import Header from './components/collections/header/index';
import SaveCard from './views/SaveCard'; 

function App() {
  return (
    <div className="container-md lo-fi-demo">
      <Header />
      <main className="main">
        <Container>
          <Row>
            <Col xs={12} lg={12} md={9} sm={12}>
              <SaveCard />
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}

export default App;
