let tareas = [];

fetch('http://localhost:4000/api/todos')
  .then(function (res) {
    return res.json();
  })
  .then(function (listaDeTareas) {
    tareas = listaDeTareas;
    const lis = listaDeTareas.map(function (t) {
      return `<li id="${t.id}"><span class="titulo">${t.todoName}</span><span class="estado">${t.completed}</span>
        <button class="remove">eliminar</button>
        <button onclick="completar(${t.id}, this)">
        <img src= "https://image.shutterstock.com/image-vector/green-check-mark-icon-circle-260nw-576516469.jpg"></button>
        <button onclick="editar(${t.id}, this)">editar</button>
      </li>`;
    });

    document.querySelector('ul').innerHTML = lis.join('')

    document.querySelectorAll('li button .eliminar')
      .forEach(function (button) {
        button.onclick = eliminar;
      })
  })

function completar(id, button) {
  fetch(`http://localhost:4000/api/todos/${id}/complete`, {
    method: 'put'
  })
    .then(res => res.json())
    .then(tarea => {
      const liIndicado = document.getElementById(`${id}`)
      liIndicado
        .querySelector('span.estado')
        .innerHTML = tarea.completed;
    })

  //VALIDACION SE HACEN EN CLIENTE Y SERVIDOR
}

function editar(id, button) {
  tareas.forEach(tarea => {
    if (tarea.id === id) {
      document
        .querySelector('#nueva-tarea')
      value = tarea.texto;
      document
        .querySelector('#nueva-tarea-btn')
        .style.display = 'none';
      const botonEditar = document
        .querySelector('#editar-tarea-btn');
      botonEditar.style.display = 'block';
      botonEditar.onclick = function () {
        //alert(id);
        const texto = document.querySelector('#nueva-tarea').value;

        const todo = {
          todoName: texto,
          completed: false
        };

        console.log(todo)

        fetch(`http://localhost:4000/api/todos/${id}`, {
          method: 'put',
          body: JSON.stringify(todo),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then (res => res.json() )
        .then(data => {
          button.parentNode.querySelector('span.titulo').innerText = todo.texto;
        })
      }
    }
  })
}


function eliminar(e) {
  //console.log(e.target.parentNode) //es el padre del botón
  const id = e.target.parentNode.id;
  //AQUÍ ELIMINO SÓLO DEL DOM

  fetch(`http://localhost:4000/api/todos/${id}`, {
    method: 'delete'
    //esto matchea con el .delete del servidor, llamo a este endpoint en particular y lo elimino, lo definí en el servidor, Y LO ELIMINO DEL SERVER
  }).then(res => {
    document.getElementById(id).remove();
  });
}


document.querySelector('#nueva-tarea-btn').onclick = function () {
  const texto = document.querySelector('#nueva-tarea').value;

  // { todoName: '...', completed: false}

  const todo = {
    todoName: texto,
    completed: false
  }

  fetch('http://localhost:4000/api/todos', {
    method: 'post',
    body: JSON.stringify(todo),
    //pasa a string el contenido del json, matchea con el body del servidor
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      console.log(res)
      if (!res.ok) {
        alert("salió mal");
        //throw new Error('se fue todo al carajo!');
        throw {
          status: res.status,
          message: 'se fue todo al carajo por tu pedido mal armado'
        }
      } else {
        res.json()
      }
    })
    .then(todo => {
      console.log(todo)
      const nuevaTarea = `<li id="${todo.id}">
    ${texto} <span>${false}</span>
    <button>eliminar<button>
    <li>`;

      document.querySelector('ul').innerHTML += nuevaTarea;
    })
    //al final de los .then, se puede agregar un catch que atrapa todas las excepciones
    //excepciones lanzadas con throw o por algún problema en el código y define qué hacer con ellas
    .catch(function (err) {
      const cartel = document.querySelector('.notificacion.error');
      cartel.innerHTML = `${err.status}:${err.message}`;
      cartel.style.display = 'block';
    })
  //la validacion en el 
}