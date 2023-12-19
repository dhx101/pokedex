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
const types = [
	"normal",
	"fire",
	"water",
	"electric",
	"grass",
	"ice",
	"fighting",
	"poison",
	"ground",
	"flying",
	"psychic",
	"bug",
	"rock",
	"ghost",
	"dragon",
	"dark",
	"steel",
	"fairy",
];
const getInfo = async (a, b) => {
	try {
		const resultsArray = [];
		for (let i = 0 + a; i <= b; i++) {
			const resultado = await fetch(
				`https://pokeapi.co/api/v2/pokemon/${i}`
			);
			const resultadoFlavor = await fetch(
				`https://pokeapi.co/api/v2/pokemon-species/${i}`
			);
			const resultadoJson = await resultado.json();
			const flavorJson = await resultadoFlavor.json();
			const results = { ...resultadoJson, ...flavorJson };
			// console.log(results);
			resultsArray.push(results);
		}
		const pokemon = resultsArray.map((item) => ({
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

const pintarPokemon = (pokemonPintar) => {
	// console.log(pokemonPintar);
	pokemonPintar.forEach((item) => {
		const li$$ = document.createElement("li");
		const h4$$ = document.createElement("h4");
		const sprite$$ = document.createElement("img");
		const div$$ = document.createElement("div");
		const span1$$ = document.createElement("span");
		const i1$$ = document.createElement("img");
		const p1$$ = document.createElement("p");
		const span2$$ = document.createElement("span");
		const i2$$ = document.createElement("img");
		const p2$$ = document.createElement("p");

		li$$.classList.add("card");
		h4$$.textContent = item.name;
		h4$$.classList.add("card-title");
		sprite$$.setAttribute("src", item.image);
		sprite$$.setAttribute("alt", item.name);
		sprite$$.classList.add("card-image");

		div$$.classList.add("type");

		i1$$.setAttribute("src", `../svg/${item.type[0]}.svg`);
		i1$$.setAttribute("alt", item.type[0]);
		p1$$.textContent = item.type[0];
		p1$$.classList.add("card-subtitle");

		i2$$.setAttribute("src", `../svg/${item.type[1]}.svg`);
		i2$$.setAttribute("alt", item.type[1]);
		p2$$.textContent = item.type[1];
		p2$$.classList.add("card-subtitle");

		span1$$.classList.add(item.type[0]);
		span2$$.classList.add(item.type[1]);

		myOl.appendChild(li$$);
		li$$.appendChild(h4$$);
		li$$.appendChild(sprite$$);
		li$$.appendChild(div$$);
		div$$.appendChild(span1$$);

		span1$$.appendChild(i1$$);
		span1$$.appendChild(p1$$);
		if (item.type[1] != undefined) {
			div$$.appendChild(span2$$);
			span2$$.appendChild(i2$$);
			span2$$.appendChild(p2$$);
		}
	});
};

const deletePokedex = () => {
	while (myOl.firstChild) {
		myOl.removeChild(myOl.lastChild);
	}
};

const generateGenSelector = () => {
	const myUl = document.querySelector(".header-gen-list");
	while (myUl.firstChild) {
		myUl.removeChild(myUl.lastChild);
	}
	for (let i = 0; i < 8; i++) {
		const myLi$$ = document.createElement("li");
		myLi$$.classList.add("header-gen-list__item");
		myLi$$.textContent = `Gen ${i + 1}`;
		myUl.appendChild(myLi$$);
		const a = generations[i].a;
		const b = generations[i].b;
		// console.log(a, b);
		myLi$$.addEventListener("click", () => {
			deletePokedex();
			pokeApi(a, b);
		});
	}
};
const generateTypeSelector = (pokemonArray) => {
	const myUl = document.querySelector(".header-type-list");
	while (myUl.firstChild) {
		myUl.removeChild(myUl.lastChild);
	}
	for (let i = 0; i < types.length; i++) {
		const myLi$$ = document.createElement("li");
		const myImg$$ = document.createElement("img");
		const myP$$ = document.createElement("p");

		myImg$$.setAttribute("src", `../svg/${types[i]}.svg`);
		myLi$$.classList.add(types[i]);
		myLi$$.classList.add("header-type-list__item");
		myP$$.textContent = types[i];
		
		myUl.appendChild(myLi$$);
		myLi$$.appendChild(myImg$$);
		myLi$$.appendChild(myP$$);
		myLi$$.addEventListener("click", () => {
			console.log(myLi$$.classList[0] == types[i]);
			const filteredPokemon = pokemonArray.filter((item) =>
				item.type[0].toLowerCase().includes(myLi$$.classList[0])
			);
			deletePokedex();
			pintarPokemon(filteredPokemon);
		});
	}
};

const generateInput = (pokemon) => {
	const myDiv$$ = document.querySelector(".header-search");
	while (myDiv$$.firstChild) {
		myDiv$$.removeChild(myDiv$$.lastChild);
	}
	const input$$ = document.createElement("input");
	input$$.setAttribute("type", "text");
	myDiv$$.appendChild(input$$);
	input$$.addEventListener("input", () => {
		const filteredPokemon = pokemon.filter((item) =>
			item.name.toLowerCase().includes(input$$.value.toLowerCase())
		);
		deletePokedex();
		pintarPokemon(filteredPokemon);
	});
};
const loadingAnimation = () => {
	const pokeball = document.querySelector(".pokeball");
	pokeball.classList.toggle("visible");
};

const pokeApi = async (a, b) => {
	console.log("fetching...");
	const pokemon = await getInfo(a, b);
	console.log("Painting...");
	pintarPokemon(pokemon);

	generateGenSelector(pokemon);
	generateTypeSelector(pokemon);
	generateInput(pokemon);
};

pokeApi(1, 151);
