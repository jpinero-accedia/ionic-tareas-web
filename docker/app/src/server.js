import express from 'express';

const PORT = 3000;
const app = express();

app.get('/', (req,res) => {
    res.send("TAREAS APP");
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Aplicación web Tareas escuchando en el puerto ${PORT}`);
});