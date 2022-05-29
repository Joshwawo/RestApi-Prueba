const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(cors());

//Mysql

const conn = mysql.createConnection({
    host: 'us-cdbr-east-05.cleardb.net',
    user: 'b4db9ca3c8f28f',
    password: '0fc9e62a',
    database: 'heroku_3d99774f81371df',
});


//!mysql://b4db9ca3c8f28f:0fc9e62a@us-cdbr-east-05.cleardb.net/heroku_3d99774f81371df?reconnect=true

//route
app.get('/', (req, res) => {



    res.send('welcome to my Api')
});

// clientes
app.get('/clientes', (req, res) => {
    const sql = 'SELECT * FROM clientes';
    conn.query(sql, (error, resultados) => {
        if (error) throw error;

        if (resultados.length > 0) {
            res.json(resultados)
        } else {
            res.send('Sin resultados')
        }

    });
    // res.send('lista de clientes')
});

app.get('/clientes/:id', (req, res) => {
    // res.send('Obtener lista de clientes por id')

    const { id } = req.params
    const sql = `SELECT * FROM clientes WHERE id=${id}`;

    conn.query(sql, (error, resultado) => {
        if (error) throw error;

        if (resultado.length > 0) {
            res.json(resultado)
        } else {
            res.send('Sin resultados')
        }

    });
});

app.post('/add', (req, res) => {
    // res.send('Nuevo cliente')

    const sql = 'INSERT INTO clientes SET ?';
    const clientesObj = {
        nombre: req.body.nombre,
        ciudad: req.body.ciudad

    }

    conn.query(sql, clientesObj, err => {
        if (err) throw err;
        res.send('usuario creado!!')
    })
});

app.put('/update/:id', (req, res) => {
    // res.send('Actualizar cliente');

    const { id } = req.params;
    const { nombre, ciudad } = req.body;

    const sql = `UPDATE clientes SET nombre = '${nombre}', ciudad= '${ciudad}' WHERE id=${id}`;

    conn.query(sql, err => {
        if (err) throw err;
        res.send('usuario Actualizado!!')
    })



});

app.delete('/delete/:id', (req, res) => {
    // res.send('Eliminar Cliente');
    const { id } = req.params;
    const sql = `DELETE FROM clientes WHERE id =${id}`;



    conn.connect(err => {
        if (err) throw err;

        console.log('Se conecto a la base de datos');

        conn.query(sql, err => {
            if (err) throw err;
            res.send('usuario Eliminado!!');
        })
    });

})

//Check conn



// app.listen(PORT,`Server Runnng http://localhost:${PORT}/`);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
});


