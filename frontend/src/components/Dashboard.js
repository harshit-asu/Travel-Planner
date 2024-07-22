import React from 'react'
import PropTypes from 'prop-types'
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

const data = [
  { id: 0, value: 10, label: 'Transport' },
  { id: 1, value: 15, label: 'Accommodation' },
  { id: 2, value: 20, label: 'Activities' },
  { id: 3, value: 20, label: 'Activities' },
  { id: 4, value: 20, label: 'Activities' },
  { id: 5, value: 20, label: 'Miscellaneous' },
];

const labelOffset = 20;

const Dashboard = props => {
  return (
    <Container fluid>
    <Row className='p-4'>
          <Col lg="3" sm="6">
            <Card className="card-stats" >
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fas fa-bezier-curve fa-3x" style={{color:"#04b4bd"}}></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Number of Trips</p>
                      <Card.Title as="h4">50</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                    <i className="fas fa-file-invoice-dollar fa-3x" style={{color:"#04b4bd"}}></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Total Expenses</p>
                      <Card.Title as="h4">$ 1,345</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                    <i className="fas fa-users fa-3x" style={{color:"#04b4bd"}}></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Travel Buddies </p>
                      <Card.Title as="h4">100</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                    <i className="fas fa-hand-holding-usd fa-3x" style={{color:"#04b4bd"}}></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Lent/barrowed</p>
                      <Card.Title as="h4">$ 305</Card.Title>
                    </div>
                  </Col>
                </Row>

              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className='ms-4'>
          <Col md="5" className='ms-5'>
          <Card className="card-stats py-1">
          <Card.Title className='d-flex justify-content-center'> Budget vs Actual Expenses</Card.Title>
              <Card.Body>
          <BarChart
      series={[
        { data: [15, 25, 30, 50, 70, 90, 20, 45] },
        { data: [60, 50, 15, 25, 55, 85, 70, 95] },
      ]}
      height={290}
      xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7','Q8'], scaleType: 'band' }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />  
    </Card.Body>
    </Card>
          </Col>
          <Col md="6" className=''>
          <Card className="card-stats p-4 mx-5">
            <Card.Title className='d-flex justify-content-center'> Expenses Pie Chart</Card.Title>
            <Card.Body>
              <PieChart className='pe-5'
                series={[
                  {
                    data: [
                      { id: 0, value: 10, label: 'Transport' },
                      { id: 1, value: 15, label: 'Accomodation' },
                      { id: 2, value: 20, label: 'Activities' },
                      { id: 3, value: 20, label: 'Activities' },
                      { id: 4, value: 20, label: 'Activities' },
                      { id: 5, value: 20, label: 'Miscellaneous' },

                    ],
                  },
                ]}
                width={450}
                height={250}
              />
    </Card.Body>
    </Card>
          </Col>
        </Row>
        </Container>
        
  )
}

Dashboard.propTypes = {}

export default Dashboard