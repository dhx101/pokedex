const generations = [
	{ gen: 1, a: 1, b: 151 },
	{ gen: 2, a: 152, b: 251 },
	{ gen: 3, a: 252, b: 386 },
	{ gen: 4, a: 387, b: 493 },
	{ gen: 5, a: 494, b: 649 },
	{ gen: 6, a: 650, b: 721 },
	{ gen: 7, a: 722, b: 809 },
	{ gen: 8, a: 810, b: 905 },
	{ gen: 9, a: 906, b: 1017 },
];

const getInfo = async (a, b) => {
	try {
		let resultsArray = [];
		for (let i = 0 + a; i <= b; i++) {
			let resultado = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
			let resultadoFlavor = await fetch(
				`https://pokeapi.co/api/v2/pokemon-species/${i}`
			);
			let resultadoJson = await resultado.json();
			let flavorJson = await resultadoFlavor.json();
			let results = { ...resultadoJson, ...flavorJson };
			// console.log(results);
			resultsArray.push(results);
		}
		let pokemon = resultsArray.map((item) => ({
			name: item.name,
			image: item.sprites["front_default"],
			type: item.types.map((type) => type.type.name),
			id: item.id,
			flavorText: item.flavor_text_entries[0].flavor_text,
		}));
		// console.log(pokemon);
		return pokemon;
	} catch (error) {
		console.log(error);
	}
};

const myOl = document.querySelector("#pokedex");
const pintarPokemon = (pintar) => {
	console.log(pintar);
	pintar.forEach((item) => {
		let li$$ = document.createElement("li");
		let h4$$ = document.createElement("h4");
		let sprite$$ = document.createElement("img");
		let p1$$ = document.createElement("p");
		let p2$$ = document.createElement("p");
		let span$$ = document.createElement("span");

		li$$.classList.add("card");
		h4$$.textContent = item.name;
		h4$$.classList.add("card-title");
		sprite$$.setAttribute("src", item.image);
		sprite$$.setAttribute("alt", item.name);
		sprite$$.classList.add("card-image");

		p1$$.textContent = item.type[0];
		p2$$.textContent = item.type[1];
		p1$$.classList.add("card-subtitle");
		p2$$.classList.add("card-subtitle");

		p1$$.classList.add(item.type[0]);
		p2$$.classList.add(item.type[1]);

		myOl.appendChild(li$$);
		li$$.appendChild(h4$$);
		li$$.appendChild(sprite$$);
		li$$.appendChild(span$$);
		span$$.appendChild(p1$$);
		if (item.type[1] != undefined) {
			span$$.appendChild(p2$$);
		}
	});
};

const pokeApi = async (a, b) => {
	console.log("Fetching...");
	const pokemon = await getInfo(a, b);
	console.log("Painting...");
	pintarPokemon(pokemon);
	console.log("finished");
};

const deletePokedex = () => {
	while (myOl.firstChild) {
		myOl.removeChild(myOl.lastChild);
	  }
}

const generateSelector= () => {
	let myUl = document.querySelector(".header-list")
	for (i = 0; i < 9; i++) {
		let myLi$$ = document.createElement('li')
		myLi$$.classList.add('header-list-drop__item')
		myLi$$.textContent = `Generation ${i+1}`
		myUl.appendChild(myLi$$)
		let a = generations[i].a
		let b = generations[i].b
		console.log(a,b);
		myLi$$.addEventListener("click", ()=> {
			deletePokedex()
			pokeApi(a, b)
		})
	}
}

pokeApi(1, 151);
generateSelector()

