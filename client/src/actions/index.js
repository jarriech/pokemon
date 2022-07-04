import axios from 'axios';
import {CREATE_POKEMON,
    FILTER_BY_TYPE,
    GET_DETAIL_POKEMON,
    GET_NAME_POKEMON,
    GET_POKEMONS,
    GET_TYPES,
    ORDER_BY_NAME,
    CLEAR_DETAIL,
    CLEAR_POKEMONS,
    FILTER_CREATE} from "./types"

export function getPokemons(){
    return async function(dispatch){
        try{
            const respuesta= await axios.get("http://localhost:3001/pokemons")
            return dispatch({
                type: GET_POKEMONS,
                payload: respuesta.data
            })
        }catch(error){
            console.log(error)
        }
    }
}
export function createPokemon(pokemon){
    return async function(dispatch){
        try{
            const respuesta = await axios.get("http://localhost:3001/pokemons", pokemon)
            return dispatch({
                type: CREATE_POKEMON,
                payload: respuesta.data
            })
        }catch(error){
            alert("pokemon already exist")
        }
    }
}
export function getDetailPokemon(id){
    return async function(dispatch){
        try{
            const respuesta = await axios.get(`http://localhost:3001/pokemons/${id}`)
            return dispatch({
                type: GET_DETAIL_POKEMON,
                payload: respuesta.data
            })
        }catch (error){
            alert("pokemon not faund");
        }
    }
}
export function getNamePokemon(name){
    return async function(dispatch){
        try{
            const respuesta = await axios.get("http://localhost:3001/pokemons?name=" + name)
            return dispatch({
                type: GET_NAME_POKEMON,
                payload: respuesta.data
            })
        }catch (error){
            alert("pokemon not found with that name");
        }
    }
}
export function getTypePokemon(){
    return async function(dispatch){
        try{
            const respuesta = await axios.get("http://localhost:3001/types")
            return dispatch({
                type: GET_TYPES,
                payload: respuesta.data
            })
        } catch(error){
            console.log(error)
        }
    }
}
export function filterCreate(create){
    return{
        type: FILTER_CREATE,
        payload: create
    }
}
export function filterByType(types){
    return{
        type: FILTER_BY_TYPE,
        payload:types
    }
}
export function orderByName(order){
    return{
        type: ORDER_BY_NAME,
        payload: order
    }
}
export function clearDetail(){
    return{
        type: CLEAR_DETAIL
    }
}
export function clearPokemons(){
    return{
        type: CLEAR_POKEMONS
    }
}
