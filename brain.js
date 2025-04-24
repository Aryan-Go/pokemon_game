const url = "https://pokeapi.co/api/v2/pokemon/1/";
let div = document.getElementById("print");
let img = document.getElementById("sprite");
const getFacts = async () => {
    let response = await fetch(url);
    console.log(response);
    let data = await response.json();
    console.log(data);
    div.innerHTML = data.forms[0].name;
    img.src = data.sprites.front_default;
}
getFacts();