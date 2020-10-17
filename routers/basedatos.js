const { Pool } = require('pg');
const Router = require('express-promise-router');

const pool = new Pool({
  //Aqui se cambia la informacion con las credenciales que te da en este caso Heroku, solo es copiar y pegar
  //Heroku para hacer la conexion con tu base de datos necesita que sea tu conexion de formate SSL que es un protocolo
  //Para que no nos moleste este SSL, se utilizan las linas 13-16
  user: 'ofqrvarejipzxx',
  host: 'ec2-18-235-109-97.compute-1.amazonaws.com',
  database: 'd6q1dbin9tu06s',
  password: '75200e07a90bee1b2ca9bf9db02621e80e548ff0e8deb8d027f40aa436679474',
  port: 5432,
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;

router.get('/consultatotalpacientes', async (req, res) => {
  //const { id } = req.params
  const { rows } = await pool.query('SELECT * FROM pacientes');
  res.send(rows);
});

router.put('/insertarpacientes', async (req, res) => {
  const { nombre, apellido, numid } = req.body;
  await pool.query(
    `INSERT INTO pacientes(nombre, apellido, numid) VALUES('${nombre}','${apellido}','${numid}')`
  );
  res.send('INSERTADO');
});

router.delete('/eliminarpacientes', async (req, res) => {
  
  const {numid} = req.body;
  await pool.query(
    `DELETE FROM pacientes WHERE numid='${numid}'`
  );
  res.send('El dato ha sido eliminado');
});


router.post('/actualizarpacientes', async (req, res) => {
  const {numid, nombre, apellido} = req.body;

  await pool.query(
    `UPDATE pacientes
    SET nombre = '${nombre}',
        apellido =  '${apellido}'
    WHERE numid = '${numid}'`
  );

  res.send('Los datos han sido actualizados');
});