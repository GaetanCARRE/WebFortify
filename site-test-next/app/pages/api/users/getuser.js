import mysql from 'mysql2/promise';

export default async function handler(req,res){
    const dbconnection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'users',
    });
    try {
        var id = req.query["id"].toString();
        const query = "SELECT username FROM user WHERE id = "+id;
        const results = await dbconnection.query(query);
        await dbconnection.end();
        res.status(200).json({ result: results[0] })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}