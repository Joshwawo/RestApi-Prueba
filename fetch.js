// const fetData = async () => {

//     try {
//         const res = await fetch('https://ventas-local-api.herokuapp.com/');
//         const data = await res.json();

//         console.log(data)

//     } catch (error) {
//         console.log(error)
//     }
// }

// fetData();

const axios = require('axios');
console.log('hola soy el front')
// Make a request for a user with a given ID
axios.get('/user?ID=12345')
    .then(function (response) {
        // handle success
        console.log(response);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });

// Optionally the request above could also be done as
axios.get('https://ventas-local-api.herokuapp.com/pedido', {
    params: {
        id_pedido: 12345
    }
})
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    })
    .then(function () {
        // always executed
    });

// Want to use async/await? Add the `async` keyword to your outer function/method.
async function getUser() {
    try {
        const response = await axios.get('/user?ID=12345');
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

