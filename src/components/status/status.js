import React from 'react';
import PropTypes from 'prop-types';
import { grammarJoin, resolvePlayerNames, resolvePlayerName, getPlayers } from '../../utils';

const { LANGUAGE } = require('../../constants');

const {
  LAST_ROUND_WON_STATUS,
  WAITING_FOR_STATUS,
  TO_PLAY_A_CARD_STATUS,
  PLAYER_NAME_YOU,
  YOU_DEALT_STATUS,
  OTHER_DEALT_STATUS,
  TO_ADD_OR_PASS_STATUS } = require(`../../strings/${LANGUAGE}/roundStatus.js`);

class Status extends React.Component {
  static propTypes = {
    playerID: PropTypes.any,
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    current: PropTypes.bool.isRequired,
    active: PropTypes.bool.isRequired,
    names: PropTypes.any.isRequired,
    dealtCard: PropTypes.string.isRequired,
  };

  render() {
    if (this.props.ctx.phase === "play") {
      let currentPlayerName = resolvePlayerName(this.props.ctx.currentPlayer, this.props.names, this.props.playerID);
      let prefix = <span />;

      if (this.props.dealtCard === "" && this.props.G.round > 1) {
        let winnerName = resolvePlayerName(this.props.G.lastWinner, this.props.names, this.props.playerID);
        prefix = (
          <span>{LAST_ROUND_WON_STATUS} <strong>{winnerName}</strong>. </span>
        );
      }

      return (
        <span>{prefix}{WAITING_FOR_STATUS} <strong>{currentPlayerName}</strong> {TO_PLAY_A_CARD_STATUS}.</span>
      );
    } else if (this.props.ctx.phase === "threats") {
      let all = new Set(getPlayers(this.props.ctx.numPlayers));
      let passed = new Set(this.props.G.passed);
      let difference = new Set([...all].filter(x => !passed.has(x)));
      let players = resolvePlayerNames(Array.from(difference), this.props.names, this.props.playerID);
      let playerWhoDealt = resolvePlayerName(this.props.G.dealtBy, this.props.names, this.props.playerID);

      return (
        <span><strong>{playerWhoDealt}</strong> {playerWhoDealt === PLAYER_NAME_YOU ? YOU_DEALT_STATUS : OTHER_DEALT_STATUS} <strong>{this.props.dealtCard}</strong>, {WAITING_FOR_STATUS} <strong>{grammarJoin(players)}</strong> {TO_ADD_OR_PASS_STATUS}.</span>
      );
    }

    return <span />;
  }
}

export default Status;