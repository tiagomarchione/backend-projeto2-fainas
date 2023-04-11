import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2/promise';
import { requireSQL } from '../requireSQL';
import { connectionConfig } from '../connectionConfig';

async function createTables() {
    const createTablesSQL = await requireSQL('createTables.sql');
    const connection = await mysql.createConnection(connectionConfig);
    await connection.query(createTablesSQL);
    console.log("Tabela criada com sucesso!!!")
    connection.destroy();
}

createTables();
