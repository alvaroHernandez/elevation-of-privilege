import React  from 'react';
import { Link } from 'react-router-dom'
export const INTRODUCTION_MESSAGE = (
<>
    <p>Elevation of Privilege (EoP) is the easy way to get started and learn threat modeling. It is a card game that developers, architects or security experts can play.</p>
    <p>To learn more about the game, navigate to the <Link to="/about">about page</Link>.</p>
    <small className="text-muted">To start playing, select the number of players and enter their names.</small>
</>
)
export const NON_EMPTY_NAME_MESSAGE = "The name cannot be empty";
export const SELECT_MODEL_MESSAGE = "Select the JSON model produced by";
export const DOWNLOAD_DEMO_MODEL_MESSAGE = "Or download a";
export const TO_TRY_OUT_MESSAGE = "to try it out.";
export const PROCEED_BUTTON_TEXT = "Proceed";
export const HOW_PLAYERS_WILL_JOIN_MESSAGE = "Players will be able to join the game with the links that are generated after you proceed.";
export const DISTRIBUTE_LINKS_AMONG_PLAYERS_MESSAGE = "The following links should be distributed to the players respectively.";
export const LINKS_ARE_UNIQUE_MESSAGE = "These links are unique for each player and would allow them to join the game.";
export const NUMBER_OF_PLAYERS_FORM_LABEL = "Players";
export const PLAYER_NAME_FORM_LABEL = "Name";
export const MODEL_FORM_LABEL = "Model";