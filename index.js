const express = require('express');
const fs = require('fs');
const app = express();
const puerto = 8080;


app.listen(puerto, () => {
    console.log(`Servidor escuchando el puerto ${puerto}`)
})

app.get('/productos', async (req,res) => {
        let productos = [];
        productos = await getData();
        res.send(productos);
})

app.get('/productoRandom', async (req,res) => {  
    let productos = [];
    productos = await getData();
    let position = Math.floor((Math.random() * (productos.length - 0 + 1)) + 0);
    res.send(productos[position]);
})

let getData = async () => {
    let file = await fs.promises.readFile('./productos.txt', 'utf-8', (error,resultado) => {
        if (resultado) {
            console.log("Lei el archivo!")
        } else {
            console.error(`Ocurrio un error al leer el archivo: ${error}`);
            return error;
        }
    });
    let fileParsed = JSON.parse(file);
    return fileParsed; 
}
