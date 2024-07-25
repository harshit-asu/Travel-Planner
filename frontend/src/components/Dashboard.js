import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import {
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from './Misc/Loading';
import { isLoggedIn } from '../services/api';
import { useAuth } from '../AuthProvider';
import { MDBCard } from 'mdb-react-ui-kit';

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

  const { auth, userId } = useAuth();
  let navigate = useNavigate();

  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    if (!auth && !userId) {
      setIsDataLoading(true);
      navigate('/login', {
        state: {
          alertData: {
            showAlert: true,
            severity: "error",
            message: "Please login to access the dashboard!"
          }
        }
      });
      return;
    }
    if (isDataLoading) {
      // fetch data
      setIsDataLoading(false);
    }
  });

  if (isDataLoading) {
    return <Loading />
  }

  return (
    <MDBCard className='p-5'>

      <Container fluid>
        <Row className='mb-5 mt-2 d-flex justify-content-center align-items-center'>
          <Col lg="3" sm="6">
            <Card className="card-stats" >
              <Card.Body>
                <Row className='d-flex align-items-center'>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fas fa-bezier-curve fa-3x" style={{ color: "#04b4bd" }}></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category fw-bold" style={{ color: "gray" }}>Number of Trips</p>
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
                <Row className='d-flex align-items-center'>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fas fa-file-invoice-dollar fa-3x" style={{ color: "#04b4bd" }}></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category fw-bold" style={{ color: "gray" }}>Total Expenses</p>
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
                <Row className='d-flex align-items-center'>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fas fa-users fa-3x" style={{ color: "#04b4bd" }}></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category fw-bold" style={{ color: "gray" }}>Travel Buddies </p>
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
                <Row className='d-flex align-items-center'>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fas fa-hand-holding-usd fa-3x" style={{ color: "#04b4bd" }}></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category fw-bold" style={{ color: "gray" }}>Amount borrowed</p>
                      <Card.Title as="h4">$ 305</Card.Title>
                    </div>
                  </Col>
                </Row>

              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className=''>
          <Col lg="6">
            <Card className="card-stats">
              <Card.Title className='d-flex justify-content-center p-4 fw-bold' style={{color: '#04b4bd'}}> Budget vs Actual Expenses</Card.Title>
              <Card.Body>
                <BarChart
                  series={[
                    { data: [15, 25, 30, 50, 70, 90, 20, 45] },
                    { data: [60, 50, 15, 25, 55, 85, 70, 95] },
                  ]}
                  height={250}
                  xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'], scaleType: 'band' }]}
                  margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col lg="6">
            <Card className="card-stats">
              <Card.Title className='d-flex justify-content-center p-4 fw-bold' style={{color: '#04b4bd'}}> Expenses</Card.Title>
              <Card.Body>
                <PieChart className='ms-3'
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
                  width={500}
                  height={250}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </MDBCard>

  )
}

Dashboard.propTypes = {}

export default Dashboard