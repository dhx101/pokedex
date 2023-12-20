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
	"all",
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

			resultsArray.push(results);
		}
		console.log(resultsArray);
		const pokemon = resultsArray.map((item) => ({
			name: item.name,
			image: item.sprites["front_default"],
			shiny: item.sprites["front_shiny"],
			type: item.types.map((type) => type.type.name),
			id: item.id,
			stats: item.stats,
			peso: item.weight,
			altura: item.height,
			flavorText: item.flavor_text_entries[0].flavor_text,
		}));
		console.log(pokemon);
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
		li$$.addEventListener("click", () => {
			const myModal$$ =document.querySelector('.modal')
			const popUpContainer = document.querySelector(".popUpContainer");

			deleteAllChilds(popUpContainer);
			myModal$$.classList.add("popup-visible");

			const pokedexNameIdContainer = document.createElement("div");
			const pokedexH2 = document.createElement("h2");
			const pokedexId = document.createElement("p");
			const pokedexH4 = document.createElement("h4");
			const pokedexSprite = document.createElement("img");
			const pokedexAltura = document.createElement("p");
			const pokedexPeso = document.createElement("p");
			const pokedexFlavor = document.createElement("p");
			const closeIcon = document.createElement("button");

			pokedexH2.textContent = "Pokedex";
			closeIcon.textContent = "×";
			closeIcon.classList.add('popUpContainer__close')
			pokedexNameIdContainer.classList.add("popUpContainer-nameId");
			pokedexId.textContent = `Nº ${item.id}`;
			pokedexH4.textContent = item.name;
			pokedexSprite.setAttribute("src", item.image);
			pokedexSprite.setAttribute("alt", item.name);
			pokedexSprite.classList.add("popUpContainer__sprite");
			let alturaEnMetros = Math.round(item.altura).toFixed(1);
			pokedexAltura.textContent = `Altura: ${alturaEnMetros} m.`;
			pokedexAltura.classList.add("popUpContainer__height");
			let pesoEnKg = (item.peso / 10).toFixed(1);
			pokedexPeso.textContent = `Peso: ${pesoEnKg} Kg.`;
			pokedexPeso.classList.add("popUpContainer__weight");
			let changedFlavorText  = item.flavorText.replace('', " ")
			pokedexFlavor.textContent = changedFlavorText
			pokedexFlavor.classList.add("popUpContainer__flavor");

			popUpContainer.appendChild(pokedexH2);
			popUpContainer.appendChild(closeIcon)
			popUpContainer.appendChild(pokedexNameIdContainer);
			pokedexNameIdContainer.appendChild(pokedexId);
			pokedexNameIdContainer.appendChild(pokedexH4);
			popUpContainer.appendChild(pokedexAltura);
			popUpContainer.appendChild(pokedexPeso);
			popUpContainer.appendChild(pokedexSprite);
			popUpContainer.appendChild(pokedexFlavor);

			closeIcon.addEventListener("click", () => {
				myModal$$.classList.remove("popup-visible")

			});
		});
	});
};

const deletePokedex = () => {
	while (myOl.firstChild) {
		myOl.removeChild(myOl.lastChild);
	}
};
const generateGenSelector = () => {
	const myDiv$$ = document.querySelector(".header-gen");
	deleteAllChilds(myDiv$$);
	const myP$$ = document.createElement("p");
	myP$$.classList.add("header-gen__dropdown");
	myP$$.textContent = "Sort by Generation";
	const myList$$ = document.createElement("ul");
	myList$$.classList.add("header-gen-list");
	myDiv$$.appendChild(myP$$);
	myDiv$$.appendChild(myList$$);
	for (let i = 0; i < 8; i++) {
		const myLi$$ = document.createElement("li");
		myLi$$.classList.add("header-gen-list__item");
		myLi$$.textContent = `Gen ${i + 1}`;
		myList$$.appendChild(myLi$$);
		const a = generations[i].a;
		const b = generations[i].b;
		// console.log(a, b);
		myLi$$.addEventListener("click", () => {
			deletePokedex();
			pokeApi(a, b);
		});
	}
	myP$$.addEventListener("click", () => {
		myList$$.classList.toggle("list-visible-gen");
	});
};
const generateTypeSelector = (pokemonArray) => {
	const myDiv$$ = document.querySelector(".header-type");
	deleteAllChilds(myDiv$$);
	const myP$$ = document.createElement("p");
	myP$$.classList.add("header-type__dropdown");
	myP$$.textContent = "Sort by Type";
	const myList$$ = document.createElement("ul");
	myList$$.classList.add("header-type-list");
	myDiv$$.appendChild(myP$$);
	myDiv$$.appendChild(myList$$);
	for (let i = 0; i < types.length; i++) {
		const myLi$$ = document.createElement("li");
		const myImg$$ = document.createElement("img");
		const myP$$ = document.createElement("p");

		myImg$$.setAttribute("src", `../svg/${types[i]}.svg`);
		myLi$$.classList.add(types[i]);
		myLi$$.classList.add("header-type-list__item");
		myP$$.textContent = types[i];

		myList$$.appendChild(myLi$$);
		myLi$$.appendChild(myImg$$);
		myLi$$.appendChild(myP$$);
		myLi$$.addEventListener("click", () => {
			if (types[i] != "all") {
				console.log(myLi$$.classList[0] == types[i]);
				const filteredPokemon = pokemonArray.filter((item) =>
					item.type[0].toLowerCase().includes(myLi$$.classList[0])
				);
				deletePokedex();
				pintarPokemon(filteredPokemon);
			} else {
				deletePokedex();
				pintarPokemon(pokemonArray);
			}
		});
	}
	myP$$.addEventListener("click", () => {
		myList$$.classList.toggle("list-visible-type");
	});
};
const generateInput = (pokemon) => {
	const myDiv$$ = document.querySelector(".header-search");
	deleteAllChilds(myDiv$$);
	const input$$ = document.createElement("input");
	const label$$ = document.createElement("label");
	input$$.setAttribute("type", "text");
	input$$.setAttribute("id", "search-bar");
	label$$.textContent = "Search by Name";
	label$$.setAttribute("for", "search-bar");
	myDiv$$.appendChild(label$$);
	myDiv$$.appendChild(input$$);

	input$$.addEventListener("input", () => {
		const filteredPokemon = pokemon.filter((item) =>
			item.name.toLowerCase().includes(input$$.value.toLowerCase())
		);
		deletePokedex();
		pintarPokemon(filteredPokemon);
	});
};
const loadingAnimationAdd = () => {
	const pokeball = document.querySelector(".pokeball");
	pokeball.classList.add("visible");
	pokeball.classList.add("loading");
};
const loadingAnimationRemove = () => {
	const pokeball = document.querySelector(".pokeball");
	pokeball.classList.remove("visible");
	pokeball.classList.remove("loading");
};
const deleteAllChilds = (node) => {
	while (node.firstChild) {
		node.removeChild(node.lastChild);
	}
};
const pokeApi = async (a, b) => {
	loadingAnimationAdd();
	const pokemon = await getInfo(a, b);
	loadingAnimationRemove();
	pintarPokemon(pokemon);
	generateGenSelector(pokemon);
	generateTypeSelector(pokemon);
	generateInput(pokemon);
};

pokeApi(1, 151);
