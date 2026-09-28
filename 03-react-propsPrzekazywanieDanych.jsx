import { useState } from 'react';

function PropsyDziecko1_1(propsy) { // obiekt
	return (<div>
		<p>argument1 ma wartość {propsy.argument1}</p>
		<p>argument2 ma wartość {propsy.argument2}</p>
	</div>)
}

function PropsyDziecko1_2({ argument1 = '', argument2 = '' }) { // obiekt
	return (<div>
		<p>argument1 ma wartość {argument1}</p>
		<p>argument2 ma wartość {argument2}</p>
	</div>)
}

function PropsyRodzic1() {
	const [argument1, setArgument1] = useState('rodzic_1');
	const argument2 = 'rodzic';

	return (<>
		<PropsyDziecko1_1 argument1={argument1 + '_1'} argument2={argument2 + '_1'} />
		<PropsyDziecko1_2 argument1={argument1 + '_2'} argument2={argument2 + '_2'} />
	</>)
}



function PropsyDziecko2({ jakasZmienna = '', setJakasZmienna }) { // obiekt
	function zmienZmienna() {
		setJakasZmienna('wartosc z dziecka')
	}
	return (<div>
		<p>obecna wartość: {jakasZmienna}</p>
		<button onClick={zmienZmienna}>zmien wartosc</button>
	</div>)
}

function PropsyRodzic2() {
	const [jakasZmienna, setJakasZmienna] = useState('wartosc zrodzica');

	return (<>
		<PropsyDziecko2 jakasZmienna={jakasZmienna + '_2'} setJakasZmienna={setJakasZmienna} />
	</>)
}



export default function Zadanie() {
	return (<div>
		<p>Zadanie 1</p>
		<PropsyRodzic1 />
		<br />
		<br />
		<p>Zadanie 2</p>
		<PropsyRodzic2 />
	</div>)
}
