const router = require('express').Router();
const db = require('./config/server');


//get usuarios
//get all
router.get('/usuarios', (req, res) => {

    let sql = 'select * from usuario'
    db.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {

            res.json(rows)
        }
    })
})

//por id

router.get('/usuario/:id', (req, res) => {
    const { id } = req.params
    let sql = 'select * from usuario where id_usuario= ?'
    db.query(sql, [id], (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows)
        }
    })
})

//eliminar

router.delete('/usuario/:id', (req, res) => {
    const { id } = req.params
    let sqlfk = `SET FOREIGN_KEY_CHECKS=0;`
    db.query(sqlfk, (err, rows, fields) => {
        if (err) throw err;
        else {

        }
    })
    let sql = `delete from usuario where id_usuario='${id}'`
    db.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            let sqlfk = `SET FOREIGN_KEY_CHECKS=1;`
            db.query(sqlfk, (err, rows, fields) => {
                if (err) throw err;
                else {
                    res.json({ status: 'usuario eliminado' })
                }
            })

        }
    })

})


//modificar

router.put('/usuario/:id', (req, res) => {
    const { id } = req.params
    const { nombre, email } = req.body
    let sqlfk = `SET FOREIGN_KEY_CHECKS=0;`
    db.query(sqlfk, (err, rows, fields) => {
        if (err) throw err;
        else {

        }
    })
    let sql = `UPDATE usuario SET nombre ='${nombre}',email='${email}' WHERE id_usuario ='${id}'`
    db.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            let sqlfk = `SET FOREIGN_KEY_CHECKS=1;`
            db.query(sqlfk, (err, rows, fields) => {
                if (err) throw err;
                else {
                    res.json({ status: 'usuario actualizado' })
                }
            })

        }
    })
})

router.get('/comunas', (req, res) => {

    let sql = 'select * from comuna'
    db.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows)
            console.log("res: ", res);
        }
    })
})

router.get('/regiones', (req, res) => {

    let sql = 'select * from region'
    db.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows)
            console.log("res: ", res);
        }
    })
})

router.get('/usuariosadmins', (req, res) => {

    let sql = 'select * from usuario where id_rol=2'
    db.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows)
            console.log("res: ", res);
        }
    })
})

router.get('/usuariosadmins', (req, res) => {

    let sql = 'select * from usuario where id_rol=2'
    db.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows)
            console.log("res: ", res);
        }
    })
})

router.get('/metricas-fecha-creacion', (req, res) => {
    const { creacionMes, creacionAnio, hastaMes, hastaAnio } = req.body;
    console.log(typeof creacionMes, creacionAnio, typeof hastaMes, hastaAnio);
    let sql = `SELECT * FROM usuario 
    WHERE fec_creacion BETWEEN '${creacionAnio}-${creacionMes}-1 00:00:00' AND '${hastaAnio}-${hastaMes}-1 23:59:59'`
    db.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows);

        }
    })
})


router.get('/publicaciones_usuario', (req, res) => {
    const { idUsuario } = req.body;
    var todayDate = new Date();
    todayDate.setDate(todayDate.getDate());
    let todayString = todayDate.toISOString();
    let fechaHoyBDD = todayString.slice(0, 10);
    console.log(fechaHoyBDD);
    let sql = `SELECT COUNT(id_publicacion) FROM publicacion inner join usuario on usuario.id_usuario='${idUsuario}' WHERE usuario.id_usuario=publicacion.id_usuario AND DATE(fecha_creacion) = DATE(NOW())`
    db.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows);

        }
    })
})


router.get('/metricas-transacciones-fecha', (req, res) => {
    const { creacionMes, creacionAnio, creacionDia, hastaMes, hastaAnio, hastaDia } = req.body;
    //preguntar a raul si me puede mandar la fecha entera.... (6 variables...)
    let sql = `SELECT *
    FROM registro_transaccion
    WHERE f_desde >= CAST('${creacionAnio}-${creacionMes}-${creacionDia}' AS DATE)
    AND f_hasta <= CAST('${hastaAnio}-${hastaMes}-${hastaDia}' AS DATE);`
    db.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows);
            console.log('paso query transacciones fecha');
        }
    })
})
//usuarios con membresia
router.get('/metricas-usuarios-membresia', (req, res) => {


    let sql = `SELECT COUNT (usuario.id_usuario) FROM usuario inner join subscripcion on usuario.id_subscripcion =subscripcion.id_subscripcion`
    db.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.Object.values(JSON.parse(JSON.stringify(rows)));
        }
    })
})
//usuarios sin membresia
router.get('/metricas-usuarios-sin-membresia', (req, res) => {

    let sql = `SELECT COUNT(usuario.id_usuario) FROM usuario WHERE id_subscripcion IS NULL`
    db.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {


            res.Object.values(JSON.parse(JSON.stringify(rows)));
        }
    })
})
//monto total transacciones
router.get('/monto-total-transacciones', (req, res) => {


    let sql = `SELECT SUM(monto) AS Total FROM registro_transaccion`
    db.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.Object.values(JSON.parse(JSON.stringify(rows)));

        }
    })
})

//numero de transacciones 
router.get('/total-transacciones', (req, res) => {


    let sql = `SELECT COUNT(registro_transaccion.id_transaccion) FROM registro_transaccion `
    db.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.Object.values(JSON.parse(JSON.stringify(rows)));
        }
    })
})
module.exports = router