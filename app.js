const searchInput = document.querySelector('.recherche-poke input' );
let allPokemon = [];
let tabFin = [];



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
        console.log(pokeData);
    })

}



// animation Input

searchInput.addEventListener('input', function(e){
    if(e.target.value !== ""){
        e.target.parentNode.classList.add('active-input')
;    }else if(e.target.value === ""){
        e.target.parentNode.classList.remove('active-input')
    }
})