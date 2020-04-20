const { LANGUAGE } = require('./constants');

const { definitions }  = require(`../src/strings/${LANGUAGE}/cardDefinitions.js`);

export function getThreatDescription(card) {
  if (card in definitions) {
    return definitions[card];
  }
  return "";
}