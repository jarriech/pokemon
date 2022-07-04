const axios = require("axios");
const { Pokemon, Type } = require("../db");


const pokemonInfo = async () =>{
    const info = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=41") //pedido desde la api 
    .then((data) => {return data.data.results});  

    try{
        const catched = info.map(e => axios.get(e.url)); // hago un get a cada url de los pokemons
        let pokemonPromise = Promise.all(catched) //info de cada url esperando que se cumpla cada promesa y las retorna
            .then(e => {
                let pokemon = e.map(p => p.data); // info de cada pokemon desde su url 
                let array = []; // Almaceno en un array contenedor de cada pokemon 
                pokemon.map(p => {// mapeo la info y me traigo solo lo que me interesa de la api 
                    array.push({
                        id: p.id,
                        name: p.name,
                        life: p.stats[0].base_stat,
                        attack: p.stats[1].base_stat,
                        defense: p.stats[2].base_stat,
                        speed: p.stats[5].base_stat,
                        height: p.height,
                        weight: p.weight,
                        image: p.sprites.other.home.front_default,
                        types: p.types.map((t) => t.type.name),
                        abilities: p.abilities.map((a) => a.ability.name)
                    })
                });
                return array;
            })
            return pokemonPromise; 
    } catch (error) {
    console.log(error);
    
    }
};

const dbPokemonInfo = async () => { 
    const getTypes = (pokemon) => pokemon.types.map((e) => e.dataValues.name); // funcion para obtener los tipos de cada pokemon
    try {
        let arrayPokeDb = [];
        arrayPokeDb = await Pokemon.findAll({ // primero busco todos los pokemons en la base de datos
            include:{
                model: Type, // y luego los tipos de cada pokemon
                attributes: ["name"], // y solo me traigo el nombre de cada tipo
                through: { attributes: [] } //a travez de la tabla intermedia
            }
        });
        arrayPokeDb = arrayPokeDb.map((e) => { // mapeo los pokemons de la base de datos
            return { ...e.dataValues, types: getTypes(e.dataValues) }; // y los concateno con los tipos de cada pokemon
        });
        return arrayPokeDb;
    } catch (error) {
        console.log(error);
    }
};

const namePokemonInfo = async (name) =>{
    try {
    const infoByName= await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`); // pedido a la api del pokemon pasado por nombre 
    const data = await infoByName.data;                
    const pokemonName = [{ // retorno el pokemon encontrado con solo las props que quiero
        id: data.id,
        name: data.name,
        image: data.sprites.other.home.front_default,
        life: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[5].base_stat,
        height: data.height,
        weight: data.weight,
        types: data.types.map((t) => t.type.name),
        abilities: data.abilities.map((a) => a.ability.name)
    }];
    return pokemonName;
    } catch (error) {
        console.log({msg:"name by data base or no name"});
    }
};

const idPokemonInfo = async (id) =>{
    try {
    const infoByID= await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`); // pedido a la api del pokemon pasado por id 
    const data = await infoByID.data;                
    const pokemonName = [{ // retorno el pokemon encontrado con solo las props que quiero
        id: data.id,
        name: data.name,
        image: data.sprites.other.home.front_default,
        life: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[5].base_stat,
        height: data.height,
        weight: data.weight,
        types: data.types.map((t) => t.type.name),
        abilities: data.abilities.map((a) => a.ability.name)
    }];
    return pokemonName;
    } catch (error) {
        console.log({msg: "id by data base"});
    }
};




const pokemonGet = async () =>{ //concatenos las dos funciones para hacer pedido en general 
    const pokeApi = await pokemonInfo();
    const pokeDb = await dbPokemonInfo();
    const pokeTotal = pokeApi.concat(pokeDb);
    return pokeTotal;
}


module.exports = {pokemonGet, namePokemonInfo, idPokemonInfo};