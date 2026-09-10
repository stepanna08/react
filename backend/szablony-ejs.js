import express from 'express';
// npm install ejs

const PORT = 3000;
const app = express();

app
	.set('views', './') // określenie miejsca z którego mają być brane szablony
	.set('view engine', 'ejs') // włączenie silnika EJS

/* najważniejsze elementy ejs
<%- - zinterpretuj HTML|EJS i wyświetl np:
	<%- include('head') %>
	<%- content %>

<%= - wyświetl bez interpretacji np:
	<h1><%= tytulStrony %></h1>

<% klasy.forEach(klasa => { %>
	<li><%= klasa.nazwa %></li>
}) %>

<% if (warunek) { %>
	// jakis kod
<% } else { %>
	// jakis kod
} %>
*/

generujLayout = (layout, resource, daneDlaLayoutu) => {
	console.log('	[generujLayout]	layout:', layout);
	resource.render(layout, daneDlaLayoutu, (error, content) => {
		if (error) {
			console.log('	[generujLayout]	błąd renderowania "' + layout + '":', error);
			throw error;
		}

		resource.write(content);
		resource.end();
	});
}

/* zadanie
1	utwórz trasę "app.get('/uzytkownik', ...)"
2	stwórz szablon (osobny plik z rozszerzeniem *.ejs), który wypisze dane użytkownika: 'imie', 'nazwisko', 'login', 'miasto'
3	wewnątrz tej trasy stwórz użytkownika z danymi 'imie', 'nazwisko', 'login', 'miasto' i wypisz na stronie za pomoca szablonu
*/
