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

function MovieListParent(){

    array.forEach(obiekt => {
        return (<MovieList>
            <p>ID filmu: {obiekt.id}</p>
            <p>Tytuł: {obiekt.title}</p>
            <p>Rok: {obiekt.year}</p>
            <p>Ocena: {obiekt.rating}</p>
            </div>)
    });

}
{identity,DataTransferItemList,year,rating}
