import React from 'react';
import { Link} from 'react-router-dom';
import SearchBar from "./SearchBar";
import styles from "./Nav.module.css";

export default function NavBar({pokeTypes, orderByName, filterByType, filterCreate, setCurrentPage}){
    return (

        <div>
            <div>
                <Link to="/"><button>Back</button></Link>
                <select onChange={orderByName}>
                    <option selected disabled >Order From</option>
                    <option value="default">All</option>
                    <option value="asc">A to Z</option>
                    <option value="desc">Z to A</option>     
                </select>
                <select onChange={filterByType}>
                <option selected disabled>Select Types</option>
                <option value="all">All</option>
                {pokeTypes?.map((type)=> {
                    return(
                        <option key={type.name} value={type.name}>{type.name}</option>
                    )
                })}
                </select>
                <select onChange={filterCreate}>
                <option selected disabled>Select Source</option>
                <option value="all">All</option>
                <option value="db">Db</option> 
                <option value="api">Api</option> 
                </select>
                <SearchBar setCurrentPage={setCurrentPage} />
                <Link to="/create"><button className={styles.btn}>Create Pokemon</button></Link>
            </div>
        </div>
    )
}