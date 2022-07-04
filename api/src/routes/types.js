const { Router } = require('express');
const {Type} = require("../db")
const axios = require("axios");

const router = Router();

router.get("/", async (req, res)=>{
    try{ // pedido a la api para almacenar en la BD
        const api= await axios.get('https://pokeapi.co/api/v2/type');
        const types= api.data.results.map((p) => p.name);
        // recorrer cada elemento y guardarlo en la BD
        types.forEach(element => {
            Type.findOrCreate({where: {name: element}}) // lo busco o lo creo en (modelo) de type
            
        });
       const all = await Type.findAll();
        res.send(all); // devuelve la info BD
    } catch(error){
       res.status(404).send({error: error.message})
   }

});


module.exports = router;