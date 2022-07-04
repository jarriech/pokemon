const { Router } = require('express');
const { Pokemon, Type } = require("../db");
const {idPokemonInfo,namePokemonInfo,pokemonGet} = require("../controllers/PokemonControllers");
//const axios = require("axios");
const router = Router();

//ruta de todos los pokemos (api, DB) y filtro by name
router.get("/", async (req, res)=>{
    const {name} = req.query;
    const pokemons = await pokemonGet();
    const byName = await namePokemonInfo(name);

    try {
        if(name){ //si me pasan el nombre
            const pokeName = pokemons.filter((poke)=> poke.name.toLowerCase().includes(name.toLowerCase())); // filtro desde los 40 de la api y la bd

            if(pokeName.length){ // si esta el nombre en los 40 o en la bd
                res.status(200).send(pokeName);
            }else if(byName){ // sino lo busco en la api
                res.status(200).send(byName);
            }
            else{
                return res.status(404).send({error: "Pokemon not found"});
            }
        }else{
            res.status(200).send(pokemons); //si no recibo nombre entonces retorno todos los pokemons
        }
    } catch (error) {
        res.status(404).send({error: error.message});
    }

});

router.get("/:id", async (req, res)=> {  // desde params recojo el id del pokemon y lo retorno
    const {id} = req.params
    const pokemonsId = await pokemonGet(); 
    const byId = await idPokemonInfo(id);
    
    if(id){
        const pokeId = pokemonsId.filter((e)=> e.id == id); // filtro desde los 40 de la api y la bd

        if(pokeId.length){ // si esta el id en los 40 o en la bd
            res.status(200).send(pokeId)
        }else if(byId){ // sino lo busco en la api
            res.status(200).send(byId)
        }else{
            res.status(404).send({ error: 'Pokemon not found'});
        }
    }

});

router.post("/", async (req, res)=>{
    const {name, hp, attack, defense, speed, height, weight, img, types}= req.body; //atributos desde el models
    
    try{
        var createPokemon = await Pokemon.create({
            name,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            img,
            created: true,
        });

        types.map(async (element)=>{
            let[p, created]= await Type.findOrCreate({ where: {name: element.name}});
            createPokemon.addType(p);  // agrego el pokemon al type
        });

        res.status(200).send(createPokemon)
    } catch (error) {
        res.status(404).send({error: error.message}, alert("Pokemon not created"));
    }

});

router.delete("/delete/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const pokemon = await Pokemon.findByPk(id);
      if (pokemon !== null) {
        await pokemon.destroy();
        res.json("Pokemon deleted correctly");
      }
    } catch (error) {
      return res.status(404).json("Error ---> " + error);
    }
  });

module.exports = router;