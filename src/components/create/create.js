import React from 'react';
import request from 'superagent';
import { Container, Card, CardHeader, CardBody, Form, FormGroup, Label, Input, Button, Col, Row, Table, FormText, FormFeedback } from 'reactstrap';
import { API_PORT } from '../../constants';
import _ from 'lodash';
import Footer from '../footer/footer';
import './create.css';
import Helmet from 'react-helmet';
import Logo from '../logo/logo';

const { LANGUAGE } = require('../../constants');

const { 
  INTRODUCTION_MESSAGE,
  NON_EMPTY_NAME_MESSAGE,
  SELECT_MODEL_MESSAGE,
  DOWNLOAD_DEMO_MODEL_MESSAGE,
  TO_TRY_OUT_MESSAGE,
  PROCEED_BUTTON_TEXT,
  HOW_PLAYERS_WILL_JOIN_MESSAGE,
  DISTRIBUTE_LINKS_AMONG_PLAYERS_MESSAGE,
  LINKS_ARE_UNIQUE_MESSAGE,
  NUMBER_OF_PLAYERS_FORM_LABEL,
  PLAYER_NAME_FORM_LABEL,
  MODEL_FORM_LABEL } = require(`../../strings/${LANGUAGE}/createGame.js`);

class Create extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      players: 3,
      gameID: "",
      names: {
        0: "Player 1",
        1: "Player 2",
        2: "Player 3",
        3: "Player 4",
        4: "Player 5",
        5: "Player 6",
      },
      secret: {
        0: "",
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
      },
      creating: false,
      created: false,
      model: null,
    };

    this.onPlayersUpdated = this.onPlayersUpdated.bind(this);
    this.onNameUpdated = this.onNameUpdated.bind(this);
    this.readFile = this.readFile.bind(this);
    this.onFileRead = this.onFileRead.bind(this);
    this.createGame = this.createGame.bind(this);

    this.fileReader = new FileReader();
    this.fileReader.onloadend = this.onFileRead;

    this.apiBase = (process.env.NODE_ENV === 'production') ? '/api' : `${window.location.protocol}//${window.location.hostname}:${API_PORT}`;
  }

  async createGame() {
    
    this.setState({
      ...this.state,
      creating: true,
    });

    const r = await request
      .post(`${this.apiBase}/create`)
      .send({
        players: this.state.players,
        model: this.state.model,
        names: this.state.names,
      });

    const gameId = r.body.game;

    for (var i=0; i<r.body.credentials.length; i++) {
      this.setState({
        ...this.state,
        secret: {
          ...this.state.secret,
          [i]: r.body.credentials[i],
        },
      });
    }

    this.setState({
      ...this.state,
      gameID: gameId,
      created: true,
    });
  }

  onFileRead() {
    this.setState({
      ...this.state,
      model: JSON.parse(this.fileReader.result),
    });
  }

  readFile(e) {
    this.fileReader.readAsText(e.target.files[0]);
  }

  onPlayersUpdated(e) {
    this.setState({
      ...this.state,
      players: parseInt(e.target.value),
    });
  }

  onNameUpdated(idx, e) {
    this.setState({
      ...this.state,
      names: {
        ...this.state.names,
        [idx]: e.target.value,
      }
    });
  }

  isFormValid() {
    for (var i=0; i<this.state.players; i++) {
      if (_.isEmpty(this.state.names[i])) {
        return false;
      }
    }
    return true;
  }

  render() {
    let createForm = <div />;
    let linkDisplay = <div />;
    if (!this.state.created) {
      createForm = (
        <div>
          {INTRODUCTION_MESSAGE}
          <hr />
          <Form>
            <FormGroup row>
              <Label for="players" sm={3}>{NUMBER_OF_PLAYERS_FORM_LABEL}</Label>
              <Col sm={9}>
                <Input type="select" name="players" id="players" onChange={e => this.onPlayersUpdated(e)} value={this.state.players}>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                </Input>
              </Col>
            </FormGroup>
            <hr />
            {Array(this.state.players).fill(0).map((v, i) => 
              <FormGroup row key={i}>
                <Label for={`p${i}`} sm={3}>{PLAYER_NAME_FORM_LABEL}</Label>
                <Col sm={9}>
                  <Input autoComplete={"off"} type="text" invalid={_.isEmpty(this.state.names[i])} name={`p${i}`} id={`p${i}`} onChange={e => this.onNameUpdated(i, e)} value={this.state.names[i]} />
                  <FormFeedback>{NON_EMPTY_NAME_MESSAGE}</FormFeedback>
                </Col>
              </FormGroup>
            )}
            <hr />
            <FormGroup row>
              <Label for="model" sm={3}>{MODEL_FORM_LABEL}</Label>
              <Col sm={9}>
                <Input type="file" name="model" id="model" onChange={this.readFile} />
                <FormText color="muted">
                  {SELECT_MODEL_MESSAGE} <a target="_blank" rel="noopener noreferrer" href="https://docs.threatdragon.org/">Threat Dragon</a>.
                </FormText>
                <FormText color="muted">
                  {DOWNLOAD_DEMO_MODEL_MESSAGE} <a target="_blank" rel="noopener noreferrer" href="https://raw.githubusercontent.com/mike-goodwin/owasp-threat-dragon-demo/master/ThreatDragonModels/Demo%20Threat%20Model/Demo%20Threat%20Model.json">sample model</a>, {TO_TRY_OUT_MESSAGE}
                </FormText>
              </Col>
            </FormGroup>
            <hr />
            <Button block size="lg" color="warning" disabled={this.state.creating || !this.isFormValid()} onClick={this.createGame}>{PROCEED_BUTTON_TEXT}</Button>
          </Form>
          <hr />
          <small className="text-muted">
            {HOW_PLAYERS_WILL_JOIN_MESSAGE}
          </small>
        </div>
      );
    } else {
      linkDisplay = (
        <div>
          <div className="text-center text-muted">
            <p>{DISTRIBUTE_LINKS_AMONG_PLAYERS_MESSAGE}</p>
          </div>
          <Table>
            <tbody>
            {Array(this.state.players).fill(0).map((v, i) => 
              <tr key={i}>
                <td>{this.state.names[i]}</td>
                <td>
                  <a href={`${window.location.origin}/${this.state.gameID}/${i}/${this.state.secret[i]}`}>{window.location.origin}/{this.state.gameID}/{i}/{this.state.secret[i]}</a>
                </td>
              </tr>
            )}
            </tbody>
          </Table>
          <hr />
          <div className="text-center">
            <small className="text-muted">
              {LINKS_ARE_UNIQUE_MESSAGE}
            </small>
          </div>
        </div>
      );
    }

    return (
      <div>
        <Helmet bodyAttributes={{style: 'background-color : #000'}}/>
        <Container className="create">
          <Row style={{paddingTop: "20px"}}>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <div className="text-center">
                <Logo />
              </div>
              <Card>
                <CardHeader className="text-center">Elevation of Privilege</CardHeader>
                <CardBody>
                  {createForm}
                  {linkDisplay}
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

export default Create;