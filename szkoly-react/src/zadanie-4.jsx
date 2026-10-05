/*
export function MovieList({ movies }) {

    return (<div>
        {movies.map(movie => (<>
            <p>ID filmu: {movie.id}</p>
            <p>Tytuł: {movie.title}</p>
            <p>Rok: {movie.year}</p>
            <p>Ocena: {movie.rating}</p>
        </>))}
    </div>)


}
    */

import { useState } from "react"

export function Counter ({initialValue = 0, onIncrement, onDecretment}){
    value = 0;
    const [value, setValue] = useState([])
    
    function onIncrement(){
        return value++
    }    
    function onDecrement(){
        return value--
    }
    
    return (
        <div>
        <p>LICZNIK: {value}</p>
        </div>
    )
}