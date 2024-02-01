import mysql from 'mysql2/promise';

export default async function getUserByUsername(username) {
    const db = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'users',
    });
    try{
        const query = 'SELECT * FROM users WHERE username = ?';
        const [results] = await db.execute(query, [username]);
        db.end()
        return results;
    }
    catch(e){
        console.log('Error connecting to MySQL');
        return null;
    }
}
