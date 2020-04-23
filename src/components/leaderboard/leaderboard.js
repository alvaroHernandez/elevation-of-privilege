import React from 'react';
import PropTypes from 'prop-types';
import { Table, Card, CardHeader, Badge } from 'reactstrap';
const { LANGUAGE } = require('../../constants');
const { STATISTICS_HEADER, NAME_HEADER, CARD_HEADER, SCORE_HEADER, YOU_INDICATOR } = require(`../../strings/${LANGUAGE}/leaderboard.js`)

class Leaderboard extends React.Component {
  static propTypes = {
    scores: PropTypes.any.isRequired,
    names: PropTypes.any.isRequired,
    cards: PropTypes.any.isRequired,
    playerID: PropTypes.any.isRequired,
  };
  render() {
    return (
      <Card>
        <CardHeader>{STATISTICS_HEADER}</CardHeader>
          <Table size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>{NAME_HEADER}</th>
                <th>{CARD_HEADER}</th>
                <th>{SCORE_HEADER}</th>
              </tr>
            </thead>
            <tbody>
              {this.props.scores.map((val,idx) => 
                <tr key={idx}>
                  <td>{idx}</td>
                  <td>{this.props.names[idx]} <strong>{(parseInt(this.props.playerID) === idx) ? YOU_INDICATOR : ""}</strong></td>
                  <td><strong>{this.props.cards[idx]}</strong></td>
                  <td><Badge>{val}</Badge></td>
                </tr>
              )}
            </tbody>
          </Table>
      </Card>
    );
  }
}

export default Leaderboard;