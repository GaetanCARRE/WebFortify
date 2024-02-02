import mysql from 'mysql2/promise';

const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'user',
});

export default async function excuteQuery({ query, values }) {
    try {
        const results = await db.query(query, values);
        await db.end();
        return results;
    } catch (error) {
        return { error };
    }
}