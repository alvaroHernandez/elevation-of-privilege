import React, { Component }  from 'react';
import { Link } from 'react-router-dom'
export const INTRODUCTION_MESSAGE = (
<>
    <p>El juego Elevation of Privilege (EoP) es una manera fácil de comenzar y aprender sobre modelamiento de amenazas. Es un juego de cartas en el cuál desarrolladores, arquitect@s y otr@s expert@s en seguridad pueden jugar.</p>
    <p>Para aprneder más acerca de éste juego, puedes ir a la página <Link to="/about">Acerca de</Link>.</p>
    <small className="text-muted">Para comenzar a jugar, selecciona el número de jugadores e ingresa sus nombres.</small>
</>
)
export const NON_EMPTY_NAME_MESSAGE = 'El nombre no puede estar vacío'
export const SELECT_MODEL_MESSAGE = 'Selecciona un modelo JSON producido por'
export const DOWNLOAD_DEMO_MODEL_MESSAGE = 'O descarga un modelo de ejemplo aquí: '
export const TO_TRY_OUT_MESSAGE = "para hacer una prueba.";
export const PROCEED_BUTTON_TEXT = 'Continuar'
export const HOW_PLAYERS_WILL_JOIN_MESSAGE = 'Los jugadores podrán unirse al juego con los links que se generarán después de presionar el botón "Continuar".'
export const DISTRIBUTE_LINKS_AMONG_PLAYERS_MESSAGE = 'Los siguientes enlaces deben ser distribuídos a los jugadores respectivamente.'
export const LINKS_ARE_UNIQUE_MESSAGE = 'Estos enlaces son únicos para cada jugador y les permitirán unirse al juego.'
export const NUMBER_OF_PLAYERS_FORM_LABEL = "Jugadores";
export const PLAYER_NAME_FORM_LABEL = "Nombre";
export const MODEL_FORM_LABEL = "Modelo";