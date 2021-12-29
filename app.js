const searchInput = document.querySelector('.recherche-poke input' );
let allPokemon = [];
let tabFin = [];
const listePoke = document.querySelector('.liste-poke')

const types = {
    grass: '#78c850',
	ground: '#E2BF65',
	dragon: '#6F35FC',
	fire: '#F58271',
	electric: '#F7D02C',
	fairy: '#D685AD',
	poison: '#966DA3',
	bug: '#B3F594',
	water: '#6390F0',
	normal: '#D9D5D8',
	psychic: '#F95587',
	flying: '#A98FF3',
	fighting: '#C25956',
    rock: '#B6A136',
    ghost: '#735797',
    ice: '#96D9D6'
};

function fetchPokemonBase () {

    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        .then(reponse => reponse.json())
        .then(allPoke => {
            // console.log(allPoke);


            allPoke.results.forEach((pokemon) => {
                fetchPokemonComplet(pokemon);
            })
        })

}

fetchPokemonBase();

function fetchPokemonComplet(pokemon) {
    let objPokemonComplet = {};
    let url = pokemon.url;
    let nameP = pokemon.name;

    fetch(url)
    .then(reponse => reponse.json())
    .then((pokeData) => {
        // console.log(pokeData);

        objPokemonComplet.pic = pokeData.sprites.front_default;
        objPokemonComplet.type = pokeData.types[0].type.name;
        objPokemonComplet.id = pokeData.id;

fetch(`https://pokeapi.co/api/v2/pokemon-species/${nameP}`)
.then(reponse => reponse.json())
.then((pokeData) => {
    // console.log(pokeData);

    objPokemonComplet.name = pokeData.names[4].name;
    allPokemon.push(objPokemonComplet);

    if( allPokemon.length === 151){
        // console.log(allPokemon);

        tabFin = allPokemon.sort( (a,b) =>{
            return a.id - b.id
            
        }).slice(0,21)
        // console.log(tabFin);
        createCard(tabFin)
    }
    
})

    })

}


// création des cartes

function createCard(arr) {

    for(let i = 0 ; i<arr.length ; i++){

        const carte = document.createElement('li');

        let couleur = types[arr[i].type];
        carte.style.background = couleur;
        
        const txtCarte = document.createElement('h5');
        txtCarte.innerText = arr[i].name;
        const idCarte = document.createElement;
        idCarte.innerText = `ID# ${arr[i].id}`;
        const imgCarte = document.createElement('img');
        imgCarte.src = arr[i].pic;
        
        carte.appendChild(imgCarte);
        carte.appendChild(txtCarte);
        // carte.appendChild(idCarte);

        listePoke.appendChild(carte);

    }

}

//Scroll infini

window.addEventListener('scroll',()=>{
    const {scrollTop, scrollHeight, clientHeight} =  document.documentElement;
    // scrolTop = scroll depuis le top
    // scrollHeight = scroll total
    // clientHeight = hauteur de la fenetre, partir visible.
    console.log(scrollTop, scrollHeight, clientHeight);

})

// animation Input

searchInput.addEventListener('input', function(e){
    if(e.target.value !== ""){
        e.target.parentNode.classList.add('active-input')
;    }else if(e.target.value === ""){
        e.target.parentNode.classList.remove('active-input')
    }
})