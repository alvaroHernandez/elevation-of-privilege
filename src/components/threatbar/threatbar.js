import React from 'react';
import PropTypes from 'prop-types';
import nl2br from 'react-nl2br';
import { Card, CardHeader, CardBody, CardText, Collapse, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button, Col, Row, CardFooter, ListGroup, ListGroupItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { getComponentName, getTypeString } from '../../utils';
import confirm from 'reactstrap-confirm';
import './threatbar.css';

const { LANGUAGE } = require('../../constants');

export const { 
  ADD_THREAT_BUTTON_TEXT,
  THREAT_TITLE_FORM_LABEL,
  THREAT_TYPE_FORM_LABEL,
  THREAT_TYPE_NAME_SPOOFING,
  THREAT_TYPE_NAME_TAMPERING,
  THREAT_TYPE_NAME_REPUDIATION,
  THREAT_TYPE_NAME_INFORMATION_DISCLOSURE,
  THREAT_TYPE_NAME_DENIAL_OF_SERVICE,
  THREAT_TYPE_NAME_ELEVATION_OF_PRIVILEGE,
  THREAT_SEVERITY_LEVEL_FORM_LABEL,
  SEVERITY_LEVEL_NAME_LOW,
  SEVERITY_LEVEL_NAME_MEDIUM,
  SEVERITY_LEVEL_NAME_HIGH,
  THREAT_DESCRIPTION_FORM_LABEL,
  THREAT_MITIGATION_FORM_LABEL,
  SAVE_THREAT_FORM_BUTTON,
  SAVE_AND_ADD_THREAT_FORM_BUTTON,
  SAVE_AND_UPDATE_THREAT_FORM_BUTTON,
  SAVING_THREAT_TIP } = require(`../../strings/${LANGUAGE}/threatBar.js`)

class Threatbar extends React.Component {
  static propTypes = {
    playerID: PropTypes.any,
    model: PropTypes.any,
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    active: PropTypes.bool.isRequired,
    names: PropTypes.any.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      mitigation: "",
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.G.threat.title !== this.props.G.threat.title
      || prevProps.G.threat.description !== this.props.G.threat.description
      || prevProps.G.threat.mitigation !== this.props.G.threat.mitigation) {
      this.setState({
        ...this.state,
        title: this.props.G.threat.title,
        description: this.props.G.threat.description,
        mitigation: this.props.G.threat.mitigation,
      });
    }
  }

  saveThreat() {
    for (let field in ["title", "description", "mitigation"]) {
      if (this.props.G.threat[field] !== this.state[field]) {
        this.props.moves.updateThreat(field, this.state[field]);
      }
    }
  }

  addOrUpdate() {
    // update the values from the state
    this.saveThreat();
    this.props.moves.addOrUpdateThreat();
  }

  updateState(field, value) {
    this.setState({
      ...this.state,
      [field]: value,
    })
  }

  getSelectedComponent() {
    if (this.props.G.selectedComponent === "" || this.props.model === null) {
      return null;
    }

    let diagram = this.props.model.detail.diagrams[this.props.G.selectedDiagram].diagramJson;
    for (let i = 0; i < diagram.cells.length; i++) {
      let cell = diagram.cells[i];
      if (cell.id === this.props.G.selectedComponent) {
        return cell;
      }
    }

    return null;
  }

  getThreatsForSelectedComponent() {
    let threats = [];
    if (this.props.G.selectedComponent === "" || this.props.model === null) {
      return threats;
    }

    let diagram = this.props.model.detail.diagrams[this.props.G.selectedDiagram].diagramJson;
    for (let i = 0; i < diagram.cells.length; i++) {
      let cell = diagram.cells[i];
      if (this.props.G.selectedComponent !== "") {
        if (cell.id === this.props.G.selectedComponent) {
          if (Array.isArray(cell.threats)) {
            // fix threat ids
            for (let j=0; j<cell.threats.length; j++) {
              if (!("id" in cell.threats[j])) {
                cell.threats[j].id = j + '';
              }
            }
            return cell.threats;
          }
        }
      } else {
        /*
        if (Array.isArray(cell.threats)) {
          threats = threats.concat(cell.threats);
        }
        */
      }
    }
    return threats;
  }

  getIdentifiedThreatsForSelectedComponent() {
    let threats = [];
    if (this.props.G.selectedDiagram in this.props.G.identifiedThreats) {
      if (this.props.G.selectedComponent in this.props.G.identifiedThreats[this.props.G.selectedDiagram]) {
        for (let k in this.props.G.identifiedThreats[this.props.G.selectedDiagram][this.props.G.selectedComponent]) {
          let t = this.props.G.identifiedThreats[this.props.G.selectedDiagram][this.props.G.selectedComponent][k];
          threats.push(t);
        }
      }
    }

    return threats;
  }

  render() {
    let threats = this.getThreatsForSelectedComponent();
    let identifiedThreats = this.getIdentifiedThreatsForSelectedComponent();
    let component = this.getSelectedComponent();
    let componentName = getComponentName(component);

    return (
      <div className="threat-bar" hidden={this.props.G.selectedComponent === ""}>
        <Card>
          <CardHeader>Threats for {componentName} <FontAwesomeIcon style={{float: "right"}} icon={faBolt} /></CardHeader>
          <CardBody className="threat-container">
            <Button color="primary" size="lg" block disabled={this.props.G.selectedComponent === "" || this.props.ctx.phase !== "threats" || this.props.G.passed.includes(this.props.playerID) || !this.props.active} onClick={() => this.props.moves.toggleModal()}>
              <FontAwesomeIcon icon={faPlus} /> {ADD_THREAT_BUTTON_TEXT}
            </Button>
            <div hidden={component !== null && component.type !== 'tm.Flow'}>
              <hr />
              <Card>
                <CardHeader>Flow Data Elements</CardHeader>
                <ListGroup flush>
                  {component !== null && Array.isArray(component.dataElements) && component.dataElements.map((val, idx) =>
                    <ListGroupItem className="thin-list-group-item" key={idx}>{val}</ListGroupItem>
                  )}
                  {component !== null && !Array.isArray(component.dataElements) && <ListGroupItem><em>No data elements defined</em></ListGroupItem>}
                </ListGroup>
              </Card>
            </div>
            <hr />
            {identifiedThreats.map((val, idx) =>
              <Card key={idx}>
                <CardHeader className="hoverable" onClick={() => this.props.moves.selectThreat(val.id)}>
                  <strong>{val.title}</strong>
                  <Row>
                    <Col xs="6"><small>{getTypeString(val.type)}</small></Col>
                    <Col xs="3"><small>{val.severity}</small></Col>
                    <Col xs="3"><small className="float-right">&mdash; {this.props.names[val.owner]}</small></Col>
                  </Row>
                </CardHeader>
                <Collapse isOpen={this.props.G.selectedThreat === val.id}>
                  <CardBody>
                    <CardText>{nl2br(val.description)}</CardText>
                    <hr />
                    <CardText>{nl2br(val.mitigation)}</CardText>
                  </CardBody>
                  <CardFooter hidden={val.owner !== this.props.playerID}>
                    <Row>
                      <Col xs="6">
                        <Button block onClick={() => this.props.moves.toggleModalUpdate(val)}>
                          <FontAwesomeIcon icon={faEdit} />
                          {' '}
                          Update
                        </Button>
                      </Col>
                      <Col xs="6">
                        <Button block color="danger" onClick={
                            () => confirm().then((result) => {
                              if (result) {
                                this.props.moves.deleteThreat(val);
                              }
                            })
                          }>
                          <FontAwesomeIcon icon={faTrash} />
                          {' '}
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  </CardFooter>
                </Collapse>
              </Card>
            )}
            {(identifiedThreats.length <= 0) && <em className="text-muted">No threats identified for this component yet.</em>}
            <hr />
            {threats.map((val, idx) =>
              <Card key={idx}>
                <CardHeader className="hoverable" onClick={() => this.props.moves.selectThreat(val.id)}>
                  <strong>{val.title}</strong>
                  <Row>
                    <Col xs="6"><small>{val.type}</small></Col>
                    <Col xs="3"><small>{val.severity}</small></Col>
                    <Col xs="3"><small className="float-right">&mdash; {(typeof val.owner !== 'undefined') ? val.owner : "NA"}</small></Col>
                  </Row>
                </CardHeader>
                <Collapse isOpen={this.props.G.selectedThreat === val.id}>
                  <CardBody>
                    <CardText>{nl2br(val.description)}</CardText>
                    <hr />
                    <CardText>{nl2br(val.mitigation)}</CardText>
                  </CardBody>
                </Collapse>
              </Card>
            )}
            {(threats.length <= 0) && <em className="text-muted">No existing threats for this component.</em>}
          </CardBody>
        </Card>
        <Modal isOpen={this.props.G.threat.modal}>
          <Form>
            <ModalHeader toggle={() => this.props.moves.toggleModal()} style={{width: "100%"}}>
              {(this.props.G.threat.new ? 'Add' : 'Update')} Threat
              {' '}
              &mdash;
              {' '}
              <small className="text-muted">being {(this.props.G.threat.new ? 'added' : 'updated')} by {this.props.names[this.props.G.threat.owner]}</small>
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="title">{THREAT_TITLE_FORM_LABEL}Title</Label>
                <Input type="text" name="title" id="title" disabled={ this.props.G.threat.owner !== this.props.playerID } autoComplete="off" value={this.state.title} onBlur={(e) => this.props.moves.updateThreat("title", e.target.value)} onChange={(e) => this.updateState("title", e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label for="type">{THREAT_TYPE_FORM_LABEL}</Label>
                <Input type="select" name="type" id="type" disabled={ this.props.G.threat.owner !== this.props.playerID } value={this.props.G.threat.type} onChange={(e) => this.props.moves.updateThreat("type", e.target.value)}>
                  <option value="S">{THREAT_TYPE_NAME_SPOOFING}</option>
                  <option value="T">{THREAT_TYPE_NAME_TAMPERING}</option>
                  <option value="R">{THREAT_TYPE_NAME_REPUDIATION}</option>
                  <option value="I">{THREAT_TYPE_NAME_INFORMATION_DISCLOSURE}</option>
                  <option value="D">{THREAT_TYPE_NAME_DENIAL_OF_SERVICE}</option>
                  <option value="E">{THREAT_TYPE_NAME_ELEVATION_OF_PRIVILEGE}</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="severity">{THREAT_SEVERITY_LEVEL_FORM_LABEL}</Label>
                <Input type="select" name="severity" id="severity" disabled={ this.props.G.threat.owner !== this.props.playerID } value={this.props.G.threat.severity} onChange={(e) => this.props.moves.updateThreat("severity", e.target.value)}>
                  <option>{SEVERITY_LEVEL_NAME_LOW}</option>
                  <option>{SEVERITY_LEVEL_NAME_MEDIUM}</option>
                  <option>{SEVERITY_LEVEL_NAME_HIGH}</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="description">{THREAT_DESCRIPTION_FORM_LABEL}</Label>
                <Input type="textarea" name="description" id="description" disabled={ this.props.G.threat.owner !== this.props.playerID } style={{height: 150}} value={this.state.description} onBlur={(e) => this.props.moves.updateThreat("description", e.target.value)} onChange={(e) => this.updateState("description", e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label for="mitigation">{THREAT_MITIGATION_FORM_LABEL}</Label>
                <Input type="textarea" name="mitigation" id="mitigation" disabled={ this.props.G.threat.owner !== this.props.playerID } style={{height: 150}} value={this.state.mitigation} onBlur={(e) => this.props.moves.updateThreat("mitigation", e.target.value)} onChange={(e) => this.updateState("mitigation", e.target.value)} />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="success" className="mr-auto" hidden={ this.props.G.threat.owner !== this.props.playerID } onClick={() => this.saveThreat()}>{SAVE_THREAT_FORM_BUTTON}</Button>{' '}
              <Button color="primary" disabled={ this.props.G.threat.owner !== this.props.playerID } onClick={() => this.addOrUpdate()}>{(this.props.G.threat.new ? {SAVE_AND_ADD_THREAT_FORM_BUTTON} : {SAVE_AND_UPDATE_THREAT_FORM_BUTTON})}</Button>{' '}
              <Button color="secondary" disabled={ this.props.G.threat.owner !== this.props.playerID } onClick={() => this.props.moves.toggleModal()}>Cancel</Button>
            </ModalFooter>
            <ModalFooter hidden={ this.props.G.threat.owner !== this.props.playerID }>
              <small className="mr-auto text-muted"><b>TIP:</b> {SAVING_THREAT_TIP}</small>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Threatbar;