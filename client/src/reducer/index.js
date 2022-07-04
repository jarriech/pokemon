import {CREATE_POKEMON,
    FILTER_BY_TYPE,
    GET_DETAIL_POKEMON,
    GET_NAME_POKEMON,
    GET_POKEMONS,
    GET_TYPES,
    ORDER_BY_NAME,
    CLEAR_DETAIL,
    CLEAR_POKEMONS,
    FILTER_CREATE} from "../actions/types"

    const initialState = {
        filtered: [],
        pokemons: [],
        allPokemons: [],
        pokeDetail: [],
        pokeTypes: []
    }

    
    
    function reducer(state = initialState, {type, payload}){
        switch (type){
            case GET_POKEMONS:
                return{
                    ...state,
                    pokemons: payload,
                    allPokemons: payload,
                    filtered: payload
                }

            case GET_NAME_POKEMON:
                return {
                    ...state,
                    pokemons: payload
                }

            case GET_DETAIL_POKEMON:
                return {
                    ...state,
                    pokeDetail: payload
                }

            case GET_TYPES:
                return {
                    ...state,
                    pokeTypes: payload
                }

            case CREATE_POKEMON:
                return {
                    ...state,
                }

            case FILTER_BY_TYPE:
                const type = payload;
                const aPokemon = state.allPokemons;
                const filteredes = aPokemon.filter((pokemon) => pokemon.types.includes(type));
                const filteredTypes = type === "all" ? aPokemon : filteredes
                return {
                    ...state,
                    pokemons: filteredTypes[0] ? filteredTypes : ["There´s no pokemons type"],
                filtered: filteredTypes[0] ? filteredTypes : ["There´s no pokemons type"]
                }
            case FILTER_CREATE:
                const create = payload;
                const filtere = state.filtered;
                const Db = filtere.filter((pokemon) => pokemon.db);
                const sinDb = filtere.filter((pokemon) => !pokemon.db);
                let poarray =[];
                create === "db" ? poarray = Db :
                create === "api" ? poarray = sinDb :
                poarray = filtere;
                return {
                    ...state,
                    pokemons: poarray[0] ? poarray: ["There´s not pokemons"]
                };

            case ORDER_BY_NAME:
                const order = payload;
                const filtered = state.filtered;
                if (order === "asc") {
                    return {
                        ...state,
                        pokemons: filtered?.slice().sort((a, b) => {
                        if (a.name > b.name) return 1;
                        if (a.name < b.name) return -1;
                        return 0;
                        }),
                    };
                    }else if (order === "desc") {
                        return {
                        ...state,
                        pokemons: filtered?.slice().sort((a, b) => {
                        if (a.name > b.name) return -1;
                        if (a.name < b.name) return 1;
                        return 0;
                        }),
                    };
                    }else {
                        return { 
                            ...state, 
                            pokemons: filtered
                        };
                };
            case CLEAR_DETAIL:
                return {
                    ...state,
                    pokeDetail:[]
                }

            case CLEAR_POKEMONS:
                return {
                    ...state,
                    pokemons: [],
                    filtered:[],
                    allPokemons: []
                }

            default: return state;
        }
    }

    export default reducer;