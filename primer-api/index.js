const express = require('express');
//para importarlo primero tengo que haberlo bajado en la terminal con npm i express

const cors = require('cors');
//para importarlo primero tengo que haberlo bajado en la terminal con npm i cors

const todoList = [
    {id: 1, todoName: 'tarea1', completed: true},
    {id: 2, todoName: 'tarea2', completed: true},
    {id: 3, todoName: 'tarea3', completed: false},
];

let ID = 4;  

const app = express();
app.use( cors() );
//esto significa que puedo aceptar pedidos de cualquier dirección
app.use( express.json() )
//esto interpreta los datos como json, a pesar de que por internet siempre viajan como texto


//a partir de aquí creo mis rutas o endpoints
app.get('/api/todos', function (req, res) {
    //res.send(todoList);
    res.json(todoList)
    //de esta manera también puedo responder (en vez de send), y aclaro que lo q respondo es un json 
});


app.delete('/api/todos/:todoId', function (req, res) {
    //con el : después de la barra indico que lo que sigue es un parámetro, es decir que van a venir distintos datos
    //con esto habilito la posibilidad de que me pidan borrar una tarea
    console.log(req.params.todoId)
    //podria hacer const id = parseInt(req.params.todoId);

    //el req tiene un monton de info, y params es un objeto que contiene la propiedad que me interesa

    // todoList = todoList.filter(todoList => todoList.id != id)
    for (let i = 0; i < todoList.length; i++) {
        if (todoList[i].id == req.params.todoId)    {
            //el == está expresado así porque el .id es un número y lo otro es un string, si no, lo parseo como en la linea comentada arriba
            //parseado es más seguro porque me aseguro que sea número y no se rompa
            todoList.splice(i, 1);
            //este método modifica el array
        }    
    }
    res.json(todoList)
});

app.post('/api/todos', function (req, res) {
    //1.obtener los datos que me llegaron del cliente
    const nuevoTodo = req.body;
    //.body es la propiedad que permite al servidor interpretar la info del cliente, salvo el id, que deberemos del lado del server asignarselo
    //este es un dato sensible
    //matchea con el data del fetch
    //en este caso, nuevoTodo es un objeto
    // { todoName: '...', completed: false}
    //vamos a validar que todoName no esté vacío, que no sean espacios y/o que no sean sólo números (datos)
    //validar que tenga las propiedades todoName y completed, y sólo esas

    //empezamos conn que la propiedad exista, que no sean solo espacios, y que no esté vacía
    if(!nuevoTodo.todoName || nuevoTodo.todoName.trim().length === 0) {
        //trim() elimina espacios en blanco en el principio y el final
        //tengo que mandar un respuesta
        //return res.status(400).end()
        return res.status(400).send('salió todo mal')
    }
    nuevoTodo.id = ID++;
    //2. pushear los datos al array
    todoList.push(nuevoTodo);
    res.json(nuevoTodo);
});

app.put('/api/todos/:idParametro/complete', function (req, res) {
    //el método put se usa para editar todo el objeto y devuelve el objeto editado
    const idMiVariable = req.params.idParametro;
    todoList.forEach( function (tarea) {
        if (idMiVariable == tarea.id) {
            tarea.completed = true
        }
    }
    );
    return res.json(tarea);
})

app.put('/api/todos/:idTarea', function (req, res) {
    const todoId = req.params.idTarea;
    const todoEditado = req.body; // pueden no llegar todas las propiedades del obj

  // si no existe la propiedad texto de nuevoTodo
  // O
  // si la propiedad texto es un string vacio
  if (!todoEditado.texto || todoEditado.texto.trim().length === 0) {
    // un aviso
    // un res
    // return
    // return res.status(400).end();
    return res.status(400).send('salió todo mal');
  }

  todos.forEach(function (todo) {
    if (todoId == todo.id) {
      todo.texto = todoEditado.texto;
      todo.completada = todoEditado.completada;

      return res.json(todo);
    }
  });
});

app.listen(4000);
//poner el programa a la escucha