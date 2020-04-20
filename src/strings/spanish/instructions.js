import React, { Component }  from 'react';
export const instructions = (
<>
<h1>Acerca de</h1>
    <p>El juego The Elevation of Privilege está diseñado para ser la forma más facil de comenzar a inspeccionar tu sistema desde una perspectiva de seguridad. Es una manera de modelar amenazas, destinado para ser usado por cualquier grupo desarrollador de software.</p>
    <p>Este juego utiliza la definición de amenazas STRIDE, por lo que provee un entorno de trabajo para analizar y encontrar ejemplos de accionables específicos para cada uno de dichas amenazas.</p>
<h2>El modelo STRIDE incluye: </h2> 
    <table className="table table-sm">
    <tbody>
        <tr>
        <th scope="row">Spoofing</th>
        <td>Hacerse pasar por alguien o algo</td>
        </tr>
        <tr>
        <th scope="row">Tampering</th>
        <td>Modificar datos o código</td>
        </tr>
        <tr>
        <th scope="row">Repudio</th>
        <td>Afirmar no haber realizada una acción</td>
        </tr>
        <tr>
        <th scope="row">Revelación de información</th>
        <td>Exponer información a alguien que no autorizado/a</td>
        </tr>
        <tr>
        <th scope="row">Denegación de Servicio</th>
        <td>Denegar o degradar el servicio a los usuarios</td>
        </tr>
        <tr>
        <th scope="row">Elevación de Privilegios</th>
        <td>Obtener capacidades sobre el sistema sin la debida autorización</td>
        </tr>
    </tbody>
    </table>

<h1> Preparándose para jugar </h1>
    <p> Un juego Elevation of Privilege generalmente se inicia por una de las siguientes razones: Un grupo de desarrolladores tiene un sistema o característica sobre el cual modelar amenazas; Alguien quiere aprender o enseñar sobre posibles amenazas y brechas de seguridad; Alguien tiene alguna copia del juego y quiere explorarlo. </p>
    <p> En cualquier caso, es importante contar con un sistema para modelar amenazas y su correspondiente diagrama arquitectónico. Es importante que los participantes estén de acuerdo en que es razonablemente preciso y muestra los procesos, flujos de datos y bases de datos. Para esta versión del juego, los jugadores deben usar un modelo creado en <a target="_blank" rel="noopener noreferrer" href="https://docs.threatdragon.org/"> Threat Dragon </a>. Si no existe tal modelo, debe ser creado antes de comenzar. </p>
    <p> Los jugadores necesitarán una forma de hacer seguimientos de los posibles  errores de seguridad, por lo que es ideal usar un modelo Threat Dragon. </p>
    <h2> Cómo jugar </h2>
    <p> El juego comienza repartiendo todo el mazo (que se hace automáticamente cuando se crea el juego) y asegurando que los jugadores estén familiarizados con las reglas. </p>
    <h2> Reglas </h2>
    <p> Un jugador (probablemente un ingeniero de software) que esté desarrollando o haya desarrollado el sistema, explicará el diagrama a todos los jugadores. </p>
    <p> El juego comienza con el jugador con el 3 de “Manipulación”, y luego continúa en el sentido de las agujas del reloj alrededor de la mesa en rondas. </p>
    <p> El juego tiene dos fases, <strong> Jugar </strong> e <strong> Identificación de amenazas </strong> </p>
    <p> En la fase <strong> Jugar </strong>, el jugador actual solo podrá navegar a través del diagrama y / o seleccionar componentes. </p>
    <p> Cuando se juega una carta, comienza la fase de <strong> Identificación de amenazas </strong> y los jugadores en cualquier orden pueden interactuar con el modelo y agregar amenazas o pasar. </p>
    <p> Después de que todos los jugadores pasan se reanudará el juego. </p>
    <p> En cada ronda se juega la “pinta” (o “palo”) líder. Es decir, cada jugador debe jugar una carta de esa “pinta” si tiene una. Jugar una carta consiste en leerla en voz alta y explicar cómo se aplica al sistema que se está modelando y al componente afectado. Los jugadores pueden registrar su amenaza seleccionando el componente y agregando la amenaza asociada. </p>
    <p> Jugar una carta sobre la cual algún jugador conoce controles de compensación para dicha amenaza es un poco menos emocionante, pero aún válido, porque permite la discusión sobre los controles de compensación identificados y ayuda a los recién llegados al modelamiento de amenazas a comprender el ciclo de descubrimiento y mitigación. </p>
    <p> Si al jugador no le quedan cartas en la “pinta” líder, entonces puede jugar una carta de cualquier otra “pinta”, el juego lo hace automáticamente y solo si hay cartas válidas disponibles para jugar. Después de que cada jugador haya jugado una carta, la ronda lo gana el jugador que ha jugado la carta más alta de la misma “pinta” de la carta líder o de la “pinta” del “triunfo”. </p>
    <p> La carta más alta es la carta de mayor valor con la misma “pinta” que la carta líder, a menos que haya una o más cartas de “triunfo” jugadas. Si se ha jugado más de una carta de “triunfo”, la carta de “triunfo” de mayor valor es la carta ganadora. </p>
    <p> Se otorga un punto por cada amenaza identificada y un punto por cada ronda que se gana. </p>
    <p> El modelo final con las amenazas identificadas se puede descargar al final del juego. </p>
    <h1> Créditos </h1>
    <p> El juego fue inventado originalmente por <a target="_blank" rel="noopener noreferrer" href="https://adam.shostack.org/"> Adam Shostack </a> en Microsoft. El <a target="_blank" rel="noopener noreferrer" href="http://download.microsoft.com/download/F/A/E/FAE1434F-6D22-4581-9804-8B60C04354E4/EoP_Whitepaper.pdf"> El documento técnico de EoP </a> escrito por Adam se puede descargar y describe la motivación, la experiencia y las lecciones aprendidas en la creación del juego. </p>
    <p> La motivación para crear esta versión en línea del juego en Careem se debió a la gran cantidad de equipos que trabajan de forma remota en varias geografías y queríamos escalar nuestro método de enseñar modelos de amenazas a nuestros equipos de ingeniería. </p>
    <p> El juego está construido usando <a href="https://boardgame.io/"> boardgame.io </a>, un marco para desarrollar juegos por turnos. Los gráficos, íconos e imágenes de tarjetas utilizados en esta versión se extrajeron del juego de cartas original creado por Microsoft. </p>
</>
);