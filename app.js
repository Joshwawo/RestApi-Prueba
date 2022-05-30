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

setInterval(() => {
    conn.query('SELECT 1');
}, 5000);
//!mysql://b4db9ca3c8f28f:0fc9e62a@us-cdbr-east-05.cleardb.net/heroku_3d99774f81371df?reconnect=true


// conn.connect(function (err) {
//     if (err) {
//         console.log('error conecting:' + err.stack);
//         return;
//     }
//     console.log('Conectado A la BD ' + conn.threadId)
// })


//route
app.get('/', (req, res) => {
    res.send('Bienvenido a la api de apoyo de ventas local para  producccion 😪😪');


    // res.send('welcome to my Api')
});



app.get('/pedido', (req, res) => {
    const sql = "SELECT * FROM pedido";
    conn.query(sql, (error, resultados) => {
        if (error) throw error;

        if (resultados.length > 0) {
            res.json(resultados)
        } else {
            res.send('Sin resultados en pedidos')
        }
    });
});

app.get('/pedido/:id', (req, res) => {
    const { id } = req.params;

    const sql = `SELECT * FROM pedido WHERE idPedido=${id}`;
    conn.query(sql, (error, resultado) => {
        if (error) throw error;

        if (resultado.length > 0) {
            res.json(resultado)
        } else {
            res.send('Sin resultados del pedido por ID')
        }
    })

});

app.post('/agregarPedido', (req, res) => {
    const sql = 'INSERT INTO pedido SET ?';
    const pedidoObj = {
        cantidad: req.body.cantidad,
        estado_Pedido: req.body.estado_Pedido,
        fecha: req.body.fecha,
        precio: req.body.precio,
        id_producto: req.body.id_producto

    }

    conn.query(sql, pedidoObj, error => {
        if (error) throw error;
        // res.send('Pedido Creado!!')
        res.send(`pedido creado ${pedidoObj}`)
    });

});

app.put('/actualizar/:id', (req, res) => {
    const { id } = req.params;

    const { Estado_Pedido } = req.body;

    const sql = `UPDATE pedido SET Estado_Pedido ='${Estado_Pedido}' WHERE idPedido=${id}`;

    conn.query(sql, error => {
        if (error) throw error;
        res.send('Pedido Actualizado');

    });

    if (!id) {
        res.send('no existe el pedido con ese id')
    }
})

app.delete('/eliminar/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM pedido WHERE id_pedido=${id}`;

    conn.query(sql, error => {
        if (error) throw error;
        res.send('Pedido Eliminado');
    })

    if (!id) {
        res.send('no existe el pedido con ese id')
    }
})

// app.delete('/delete/:id', (req, res) => {
//     // res.send('Eliminar Cliente');
//     const { id } = req.params;
//     const sql = `DELETE FROM clientes WHERE id =${id}`;



//     conn.connect(err => {
//         if (err) throw err;

//         console.log('Se conecto a la base de datos');

//         conn.query(sql, err => {
//             if (err) throw err;
//             res.send('usuario Eliminado!!');
//         })
//     });

// })


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
});

