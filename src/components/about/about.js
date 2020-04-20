import React from 'react';
import { Container, Card, CardHeader, CardBody, Col, Row } from 'reactstrap';
import Footer from '../footer/footer';
import Logo from '../logo/logo';
import './about.css';
import Helmet from 'react-helmet';
const { LANGUAGE } = require('../../constants');

const { instructions }  = require(`../../strings/${LANGUAGE}/instructions.js`);
class About extends React.Component {

  render() {
    return (
      <div>
        <Helmet bodyAttributes={{style: 'background-color : #000'}}/>
        <Container className="about" fluid>
          <Row style={{paddingTop: "20px"}}>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <div className="text-center">
                <Logo />
              </div>
              <Card>
                <CardHeader className="text-center">Elevation of Privilege</CardHeader>
                <CardBody>
                  {instructions}
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }} className="text-center">
              <Footer />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default About;