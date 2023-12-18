const pokeApi = async () => {
	const pokemon = await getInfo();
	pintarPokemon(pokemon);
};

const getInfo = async () => {
	try {
		let results = [];
		for (let i = 1; i <= 151; i++) {
			let resultado = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
			let resultadoJson = await resultado.json();
			results.push(resultadoJson);
		}
		let pokemon = results.map((item)=> ({
			name: item.name,
			image: item.sprites['front_default'],
			type: item.types.map((type) => type.type.name),
			id: item.id}))
		return pokemon;
	} catch (error) {
		console.log(error);
	}
};




const pintarPokemon = (pokemon) => {
	const myOl = document.querySelector("#pokedex");
	console.log(pokemon);
	pokemon.forEach((item) => {
		let li$$ = document.createElement("li");
		li$$.classList.add("card");

		let h4$$ = document.createElement("h4");
		h4$$.textContent = item.name
		h4$$.classList.add("card-title")

		let sprite$$ = document.createElement("img");
		sprite$$.setAttribute("src", item.image);
		sprite$$.setAttribute("alt", item.name);
		sprite$$.classList.add("card-image")

		let p$$ = document.createElement("p");
		p$$.textContent = item.type
		p$$.classList.add("card-subtitle")

		myOl.appendChild(li$$);
		li$$.appendChild(h4$$);
		
		li$$.appendChild(sprite$$);
		li$$.appendChild(p$$);
	});
};

pokeApi();
