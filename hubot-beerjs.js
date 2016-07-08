// Description:
//  BeerJS Santiago Hubot script
//
// Dependencies:
//  needle
//
// Configuration:
//   None
//
// Commands:
//   hubot beerjs info|todo
//   hubot beerjs fecha|cuando
//   hubot beerjs donde|lugar
//   hubot beerjs tema
//
// Notes:
//   ©2015 Jorge Epuñan
//   https://github.com/juanbrujo/
//
// Author:
//   @jorgeepunan

const needle = require('needle');

// este es el repositorio del json (estático) que se parsea con la información necesaria, hosteado en GitHub.
// revísalo para que conozcas la simple estructura que contiene la información y modifícala según tus necesidades.
const file = 'https://raw.githubusercontent.com/beerjs/santiago/master/beerjs.json';

module.exports = function(robot) {
  'use strict';

  robot.respond(/beerjs (\w+)/i, res => {

    const suffix = res.match[1];

    needle.get(file, (error, response) => {
      if (!error && response.statusCode == 200) {

        const obj = JSON.parse(response.body);

        if ( suffix === "fecha" || suffix === "cuando") {
          res.send(">*" + obj.evento + ":* " + obj.fecha);
        }
        else if ( suffix === "donde" || suffix === "lugar" ) {
          res.send(">*" + obj.evento + ":* " + obj.donde + " (" + obj.direccion + ")");
          res.send("http://maps.google.com/maps/api/staticmap?markers=" + encodeURIComponent(obj.direccion) + "&size=600x600&maptype=roadmap&sensor=false&zoom=16&format=png"); // TODO

        }
        else if ( suffix === "tema" ) {
          res.send(">*" + obj.evento + ":* " + obj.tema);
        }
        else if ( suffix === "registro" ) {
          res.send(">*" + obj.evento + ":* regístrate gratis en " + obj.registro);
        }
        else if ( suffix === "info" || suffix === "todo" ) {
          let message = ""
          for(const i in obj){
            if(obj[i] !== '') {
              message += ">*" + i + ":* " + obj[i] + "\n";
            }
          }
          res.send(message);
        }
        else {
          res.send("¿Ayuda? Comandos: @hubot beerjs [fecha|cuando, donde|lugar, tema, registro]");
        }

      }

    });

  });

};

