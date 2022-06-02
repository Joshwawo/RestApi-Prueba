const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');



const PORT = process.env.PORT || 3000;

const app = express();

// app.use(bodyParser.json());
let formularioArray = [];


//Prueba
app.use(
    // express.urlencoded({extended:true})
    express.urlencoded({
        extended: true
    })
);
// app.use( bodyParser.urlencoded({ extended: true }) );
// app.use(express.urlencoded({ extended: true }))
app.use(express.json({
    type: "*/*"
}));

app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true}))
//Prueba

//Mysql
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();
if (dd < 10) {
    dd = '0' + dd;
}
if (mm < 10) {
    mm = '0' + mm;
}
today = yyyy + '-' + mm + '-' + dd;

const conn = mysql.createConnection({
    host: 'us-cdbr-east-05.cleardb.net',
    user: 'b4db9ca3c8f28f',
    password: '0fc9e62a',
    database: 'heroku_3d99774f81371df',
});

setInterval(() => {
    conn.query('SELECT 1');
}, 5000);


//route
app.get('/', (req, res) => {
    res.send('Bienvenido a la api de apoyo de ventas local para  producccion 😪😪');
    // res.send('welcome to my Api')
});

app.get('/addped', (req, res) => {
    // res.send(JSON.stringify(formularioArray))
});

// app.post('/addped', (req, res) => {
//     const sql = 'INSERT INTO pedido SET ?';
//     let formulario = req.body;
//     console.log('me llego el post');
//     // console.log(req.body);
//     // formularioArray.push(formulario);
//     // res.json(JSON.stringify("Guardado en la db"))
//     res.json(JSON.stringify("Guardado en la db"));
//     console.log(formularioArray);

//     conn.query(sql, formulario, error=>{
//         if(error) throw error;
//         // res.send('pedido creado');

//     })

// });

app.post('/agregarPedido', (req, res) => {
    const sql = 'INSERT INTO pedido SET ?';
    let formulario = req.body;
    console.log('me llego el post');
    // console.log(req.body);
    // formularioArray.push(formulario);
    // res.json(JSON.stringify("Guardado en la db"))
    res.json(JSON.stringify("Guardado en la db"));
    console.log(formularioArray);

    conn.query(sql, formulario, error => {
        if (error) throw error;
        // res.send('pedido creado');

    })
});

app.put('/act', (req, res) => {

})



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


// app.post('/agregarPedido', (req, res) => {
//     const sql = 'INSERT INTO pedido SET ?';
//     const pedidoObj = {
//         cantidad: req.body.cantidad,
//         estado_Pedido: req.body.estado_Pedido,
//         fecha: req.body.fecha,
//         precio: req.body.precio,
//         id_producto: req.body.id_producto
//     }

//     conn.query(sql, pedidoObj, error => {
//         if (error) throw error;
//         // res.send('Pedido Creado!!')
//         res.send(`pedido creado ${pedidoObj}`)
//     });

// });



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

app.get('/getPedido', (req, res) => {

    

})




app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
});

