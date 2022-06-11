const router = require('express').Router();
const conexion = require('./config/server');

//get usuarios

//get all
router.get('/usuarios', (req, res) => {

    let sql = 'select * from usuario'
    conexion.query(sql, (err, rows, fields) => {
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
    conexion.query(sql, [id], (err, rows, fields) => {
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
    conexion.query(sqlfk, (err, rows, fields) => {
        if (err) throw err;
        else {

        }
    })
    let sql = `delete from usuario where id_usuario='${id}'`
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            let sqlfk = `SET FOREIGN_KEY_CHECKS=1;`
            conexion.query(sqlfk, (err, rows, fields) => {
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
    conexion.query(sqlfk, (err, rows, fields) => {
        if (err) throw err;
        else {

        }
    })
    let sql = `UPDATE usuario SET nombre ='${nombre}',email='${email}' WHERE id_usuario ='${id}'`
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            let sqlfk = `SET FOREIGN_KEY_CHECKS=1;`
            conexion.query(sqlfk, (err, rows, fields) => {
                if (err) throw err;
                else {
                    res.json({ status: 'usuario actualizado' })
                }
            })

        }
    })
})

router.get('/comunas',(req,res)=>{
    
    let sql = 'select * from comuna'
    conexion.query(sql,(err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
            console.log("res: ", res);
        }
    })
})

router.get('/regiones',(req,res)=>{
    
    let sql = 'select * from region'
    conexion.query(sql,(err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
            console.log("res: ", res);
        }
    })
})


module.exports = router;