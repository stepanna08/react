/*Utwórz komponent MovieList, który przyjmuje:
    - movies (tablica obiektów z polami: id, title, year, rating)

    Komponent powinien:
    - Iterować przez tablicę filmów
    - Wyświetlić każdy film na liście
    - Walidować że movies to tablica obiektów z wymaganymi polami

    Przykład użycia:
    <MovieList movies={[
      { id: 1, title: "Inception", year: 2010, rating: 8.8 },
      { id: 2, title: "Avatar", year: 2009, rating: 8.5 }
    ]} />
     
function ArticleParent(){
    return ( <Article title = {title} author = {author} content = {content} />)
}

function Article(props) {
    return (<div>
        <h2>Tytuł: {props.title}</h2>
        <p>Autor: {props.author}</p>
        <p>{props.content}</p>
    </div>)
}
}
    
    */

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

