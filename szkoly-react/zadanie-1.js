/*	Utwórz komponent Article, który przyjmuje props:
	- title (string, wymagane)
	- author (string, wymagane)
	- content (string, opcjonalne)

	Komponent powininen wyświetlić artykuł w formacie:
	<h2>Tytuł</h2>
	<p>Autor: imię autora</p>
	<p>Zawartość artykułu</p>

	Dodaj PropTypes do walidacji danych.
	ZZZUżycie: <Article title="React 18" author="Jan" content="React jest super!" />

    */


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

