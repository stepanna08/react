import { createContext, useContext, useState } from 'react';

export default function Przyklady() {
	return (<div>
		<NameContextContainer />
		<LicznikContextContainer />
		<TradycyjnyContainer />
	</div>)
}

const NameContext = createContext(null);
function NameContextContainer() {
	const [name] = useState('Ziutek');

	return (<p>
		<h2>NameContextContainer</h2>
		Tworzę name: {name}
		<NameContext.Provider value={name}>
			<NameContextDziadek />
		</NameContext.Provider>
		<br /><br />
	</p>)
}
function NameContextDziadek() {
	return (<p>
		<h3>Dziadek</h3>
		Nic nie przekazuję
		<NameContextRodzic />
	</p>)
}
function NameContextRodzic() {
	return (<p>
		<h3>Rodzic</h3>
		Nic nie przekazuję
		<NameContextDziecko />
	</p>)
}
function NameContextDziecko() {
	const name = useContext(NameContext);

	return (<p>
		<h3>Dziecko</h3>
		Odczytuję name z contextu: {name}
	</p>)
}

const LicznikContext = createContext(null);
function LicznikContextContainer() {
	const [licznik, setLicznik] = useState(0);

	return (<p>
		<h2>LicznikContextContainer</h2>
		Tworzę licznik: {licznik}
		<LicznikContext.Provider value={{licznik, setLicznik}}>
			<LicznikContextDziadek />
		</LicznikContext.Provider>
		<br /><br />
	</p>)
}
function LicznikContextDziadek() {
	return (<p>
		<h3>Dziadek</h3>
		Nic nie przekazuję
		<LicznikContextRodzic />
	</p>)
}
function LicznikContextRodzic() {
	return (<p>
		<h3>Rodzic</h3>
		Nic nie przekazuję
		<LicznikContextDziecko />
	</p>)
}
function LicznikContextDziecko() {
	const { licznik, setLicznik } = useContext(LicznikContext);

	return (<p>
		<h3>Dziecko</h3>
		<button onClick={() => { setLicznik(licznik + 1)}}>Odczytuję licznik z contextu: {licznik}</button>
	</p>)
}

function TradycyjnyContainer() {
	const [name] = useState('Test');

	return (<p>
		<h2>TradycyjnyContainer</h2>
		Tworzę i przekazuję name: {name}
		<TradycyjnyDziadek name={name} />
		<br /><br />
	</p>)
}
function TradycyjnyDziadek({ name }) {
	return (<p>
		<h3>Dziadek</h3>
		Przekazuję name: {name}
		<TradycyjnyRodzic name={name} />
	</p>)
}
function TradycyjnyRodzic({ name }) {
	return (<p>
		<h3>Rodzic</h3>
		Przekazuję name: {name}
		<TradycyjnyDziecko name={name} />
	</p>)
}
function TradycyjnyDziecko({ name }) {
	return (<p>
		<h3>Dziecko</h3>
		Imię użytkownika: {name}
	</p>)
}
