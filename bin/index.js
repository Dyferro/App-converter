//Importar el paquete Express
const express = require('express');

//inicializar el servidor 
const app = express();

//inicializar el puerto
const port=3000;

//End point
app.get('/',(req,res)=>{ //parametro req para requerir informacion al servidor, parametro res para responder

    res.send('Hola Mundo');
});

app.get('/converter',(req,res)=>{ //parametro req para requerir informacion al servidor, parametro res para responder

    let {convertFrom,convertTo,value} = req.query; //Destructuracion y obtencion de los valores de entrada
    
    //Validacion de los datos de entrada
    if(
        convertFrom === undefined 
        || convertFrom === ""
        || convertTo === undefined 
        || convertTo === ""
        || value === undefined 
        || value === ""
        ){
        return res.json({status:false, value:'Datos no validos'});
    }

    switch(convertFrom){
        case 'binary':{
            value = '0b' + value;
            break;
        }
        case 'octal':{
            value = '0o' + value;
            break;
        }
        case 'hexadecimal':{
            value = '0x' + value;
            break;
        }
        case 'decimal':{
            value = value;
            break;
        }
        default:{
            res.status(400).json({status:false,value:'Dato no valido'});
        }
    }

    console.log(value);

    if(isNaN(value)){
        res.status(400).json({status:false,value:'Dato no valido'});
    }

    switch(convertTo){
        case 'binary':{
            res.status(200).json({
                status:true,
                value:Number(value).toString(2)
            });
            break;
        }
        case 'octal':{
            res.status(200).json({
                status:true,
                value:Number(value).toString(8)
            });
            break;
        }
        case 'hexadecimal':{
            res.status(200).json({
                status:true,
                value:Number(value).toString(16)
            });
            break;
        }
        case 'decimal':{
            res.status(200).json({
                status:true,
                value:Number(value).toString(10)
            });
            break;
        }
        default:{
            res.status(400).json({status:false,value:'Dato no valido'});
        }
    }



    
   
});

//Escuchar las peticiones al servidor, configurando el puerto
app.listen(port,()=>{
    console.log(`Servidor corriendo en http://localhost:${port}`);
});