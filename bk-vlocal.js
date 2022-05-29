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
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ventas_local',
});

conn.connect(function (err) {
    if (err) {
        console.log('error conecting:' + err.stack);
        return;
    }
    console.log('Conectado A la BD ' + conn.threadId)
})


//route
app.get('/', (req, res) => {
    res.send('Bienvenido A la Api de Ventas en linea ')


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

app.post('/agregarPedido', (req, res)=>{
    const sql = 'INSERT INTO pedido SET ?';
    const pedidoObj ={
        Cantidad: req.body.Cantidad,
        Estado_Pedido: req.body.Estado_Pedido,
        Fecha: req.body.Fecha,
        Precio:req.body.Precio,
        id_Producto:req.body.id_Producto

    }

    conn.query(sql, pedidoObj, error=>{
        if(error) throw error;
        res.send('Pedido Creado!!')
    });

});

app.put('/actualizar/:id', (req, res)=>{
    const {id} = req.params;

    const {Estado_Pedido} = req.body;

    const sql = `UPDATE pedido SET Estado_Pedido ='${Estado_Pedido}' WHERE idPedido=${id}`;

    conn.query(sql, error =>{
        if(error) throw error;
        res.send('Pedido Actualizado');

    });
})

app.delete('/eliminar/:id', (req,res)=>{
    const {id}= req.params;
    const sql = `DELETE FROM pedido WHERE idPedido=${id}`;

    conn.query(sql, error=>{
        if(error) throw error;
        res.send('Pedido Eliminado');
    })
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


