//para un proyecto de node.js voy a necesitar todo este paquete, como en una web necesito html css y js
const express = require('express');
//primero importo el módulo express que me instalo en cada proyecto

const users = [
    {id: 1, nombre: '1', edad: '30'},
    {id: 2, nombre: '2', edad: '35'},
    {id: 3, nombre: '3', edad: '40'}
];
//está bueno asignarle una identificación inequívoca a cada objeto, incremental

const app = express();
//ejecutando la función express es que creo el servidor, ya que esta función de fondo tiene el módulo http

app.get('/', function (req, res) {
    res.send('hola mundo!');
});

//app es el server y .get es la acción que estoy haciendo. El primer parámetro es la dirección a la que quiero acceder (por ej /3/movies/popular)
//y luego la función de call back (es decir solo se ejecuta cuando alguien haga un get a esa dirección), el primer param es la información sobre el pedido
//y el segundo es con lo que voy a poder contestar

app.get('/users', function (req, res) {
        res.send(users);
});

app.get('/user', function (req, res) {
    res.send({
        nombre: '1',
        edad: 29,
    });
});

app.listen(4000);
//y aquí pongo el servidor a escuchar los pedidos a través del puerto