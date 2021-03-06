import { STARTING_CARD } from './constants';
const { LANGUAGE } = require('./constants');
const { threatTypes } = require(`../src/strings/${LANGUAGE}/threatTypes`);
const { PLAYER_NAME_YOU } = require(`../src/strings/${LANGUAGE}/roundStatus`);
const { AND_GRAMMAR_CONNECTOR } = require(`../src/strings/${LANGUAGE}/grammar`);

export function getDealtCard(G) {
  let dealtCard = "";
  if (G.dealt.length > 0) {
      dealtCard = G.dealt[G.dealt.length - 1];
  }
  return dealtCard;
}

export function getDealtCardsForPlayers(order, dealt) {
  let cards = Array(order.length).fill("");
  for (let i=0; i<dealt.length; i++) {
    let idx = parseInt(order[i]);
    cards[idx] = dealt[i];
  }
  return cards;
}

export function resolvePlayerNames(players, names, current) {
  let resolved = [];
  for (let i=0; i<players.length; i++) {
    let c = players[i];
    resolved.push( (parseInt(c) === parseInt(current)) ? PLAYER_NAME_YOU : names[c]);
  }
  return resolved;
}

export function resolvePlayerName(player, names, current) {
  return (parseInt(player) === parseInt(current)) ? PLAYER_NAME_YOU : names[player];
}

export function grammarJoin(arr) {
  var last = arr.pop();
  
  if (arr.length <= 0)
    return last;

  return arr.join(', ') + AND_GRAMMAR_CONNECTOR + last;
}

export function getPlayers(count) {
  let players = [];
  for (let i=0; i<count; i++) {
    players.push(i + '');
  }
  return players;
}

export function getComponentName(component) {
  if (component === null)
    return "";

  let prefix = component.type.substr(3);

  if (component.type === "tm.Flow") {
    return `${prefix}: ${component.labels[0].attrs.text.text}`;
  }

  return `${prefix}: ${component.attrs.text.text}`;
}

export function getValidMoves(cards, suit, round) {
  let validMoves = [];

  if (suit === "" && round <= 1) {
    validMoves.push(STARTING_CARD);
  } else {
    if (suit !== "")
      validMoves = cards.filter(e => e.startsWith(suit));
    if (validMoves.length <= 0)
      validMoves = cards;
  }

  return validMoves;
}

export function getTypeString(type) {
  if (type in threatTypes) {
    return threatTypes[type];
  }
  return "";
}