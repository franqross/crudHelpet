const router = require('express').Router();
const conexion = require('./config/server');

//get usuarios

//tomar todos los usuarios
router.get('/',(req,res)=>{
    
    let sql = 'select * from usuario'
    conexion.query(sql,(err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})

//por id

router.get('/:id',(req,res)=>{
    const{id}=req.params
    let sql = 'select * from usuario where id_usuario= ?'
    conexion.query(sql,[id],(err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})

//eliminar

router.delete('/:id',(req,res)=>{
    const{id}= req.params
    let sqlfk =`SET FOREIGN_KEY_CHECKS=0;`
    conexion.query(sqlfk,(err,rows,fields)=>{
        if(err) throw err;
        else{
            
        }
    })
    let sql =`delete from usuario where id_usuario='${id}'`
    conexion.query(sql,(err,rows,fields)=>{
        if(err) throw err;
        else{
            let sqlfk =`SET FOREIGN_KEY_CHECKS=1;`
            conexion.query(sqlfk,(err,rows,fields)=>{
                if(err) throw err;
                else{
                    res.json({status:'usuario eliminado'})
                }
            })           
            
        }
    })

})


//modificar

 router.put('/:id',(req,res)=>{
    const{id}=req.params
    const{nombre,email}=req.body
    let sqlfk =`SET FOREIGN_KEY_CHECKS=0;`
    conexion.query(sqlfk,(err,rows,fields)=>{
        if(err) throw err;
        else{
            
        }
    })
    let sql = `UPDATE usuario SET nombre ='${nombre}',email='${email}' WHERE id_usuario ='${id}'`
    conexion.query(sql,(err,rows,fields)=>{
        if(err) throw err;
        else{
            let sqlfk =`SET FOREIGN_KEY_CHECKS=1;`
            conexion.query(sqlfk,(err,rows,fields)=>{
                if(err) throw err;
                else{
                    res.json({status:'usuario actualizado'})
                }
            })
            
        }
    })
})
 

module.exports = router;