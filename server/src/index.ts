import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { todoController } from './controllers/todoController';

const app = express();

app.use(express.json());
app.use(cors());
app.use("/todolist", todoController);

const port = 8080;
const host = '0.0.0.0';

app.listen(port, host, () => {
    console.log('Deu muito bom');
});

// app.get('/', (req, res) => {
//     res.json({
//         nome: "Tiago",
//         sobrenome: "Siqueira",
//         último: "Marchione"
//     });
// });

// app.get('/alunos', (req, res) => {
//     res.json(['Tiago', 'Patrícia', 'Miguel']);
// });