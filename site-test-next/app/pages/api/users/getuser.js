import mysql from 'mysql2/promise';

export default async function handler(req,res){
    const dbconnection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'users',
    });
    try {
        const query = "SELECT username FROM user WHERE id = ?";
        //const [values] = ["" + req.body.id]
        const [values] = ["1"]
        const results = await dbconnection.query(query,values);
        await dbconnection.end();
        res.status(200).json({ result: results })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}