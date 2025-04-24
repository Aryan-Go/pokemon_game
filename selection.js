let main_div_1 = document.getElementById("main1");
let main_div_2 = document.getElementById("main2");
let battle_button = document.getElementById("battle");
let choosen_pokemons_id = [];
let choosen_pokemons_id_2 = [];
let counter = 0;
let counter_2 = 0;
let c1 = 0;
let c2 = 0;

// let body = document.getElementById("body");
let url = "https://pokeapi.co/api/v2/pokemon/";
const make_small_div = async (num) => {
  let smaller_div = document.createElement("div");
  smaller_div.id = num;
  let name = document.createElement("p");
  name.style.fontWeight = "bolder";
  name.style.fontSize = "1.35rem";
  let img = document.createElement("img");
  img.style.visibility = "hidden";
  img.style.scale = "1.2";
  img.style.height = "100px";
  img.style.width = "100px";
  smaller_div.appendChild(img);
  smaller_div.appendChild(name);
  main_div_1.appendChild(smaller_div);
  console.log(url + num + "/");
  let response = await fetch(url + num + "/");
  let data = await response.json();
  name.innerHTML = data.forms[0].name;
  img.src = data.sprites.other.dream_world.front_default;
  smaller_div.addEventListener("click", () => {
    if (img.style.visibility === "hidden") {
      let audio = document.createElement("audio");
      audio.src = "pokeball_out.mp3";
      // body.appendChild(audio);
      audio.play();
      document.querySelector("audio").play();
      smaller_div.style.backgroundImage =
        "url('8-82928_open-pokeball-png-transparent-png-removebg-preview.png')";
      img.style.visibility = "visible";
      // console.log(num);
      choosen_pokemons_id.push(num);
      counter++;
      // console.log("if");
      if (counter == 6 && counter_2 == 6) {
        alert("now you can click battle");
        localStorage.setItem(
          "choosen_pokemons_id",
          JSON.stringify(choosen_pokemons_id)
        );
        localStorage.setItem(
          "random_computer_pokemons",
          JSON.stringify(random_computer_pokemons)
        );
      } else if (counter == 6 && counter_2 < 6) {
        if (c1 == 0) {
          alert("Complete pokemons for player 1 now work on player 2");
          c1++;
        }
      } else if (counter_2 == 6 && counter < 6) {
        if (c2 == 0) {
          alert("Complete pokemons for player 2 now work for player 1");
          c2++;
        }
      }
    } else {
      choosen_pokemons_id.pop();
      random_computer_pokemons.pop();
      counter--;
      smaller_div.style.backgroundImage =
        "url('pngimg.com_-_pokeball_PNG7.png')";
      img.style.visibility = "hidden";
      console.log("else fi");
    }
  });
};
if (battle_button) {
  battle_button.addEventListener("click", () => {
    if (counter < 6 || counter_2 < 6) {
      alert("Please choose " + (6 - counter) + " more pokemons for player 1");
      alert("Please choose " + (6 - counter_2) + " more pokemons for player 2");
    } 
    else {
      window.location.href = "battle.html";
    }
    
  });
}

for (let i = 1; i < 50; i++) {
  make_small_div(Math.floor(Math.random()*50));
  // make_small_div.id = i;
}

const make_small_div2 = async (num) => {
  let smaller_div = document.createElement("div");
  smaller_div.id = num;
  let name = document.createElement("p");
  let img = document.createElement("img");
  img.style.visibility = "hidden";
  // img.style.scale = "1.2";
  img.style.height = "100px";
  img.style.width = "100px";
  smaller_div.appendChild(img);
  smaller_div.appendChild(name);
  main_div_2.appendChild(smaller_div);
  console.log(url + num + "/");
  let response = await fetch(url + num + "/");
  let data = await response.json();
  name.innerHTML = data.forms[0].name;
  name.style.fontWeight = "bolder";
  name.style.fontSize = "1.35rem";
  img.src = data.sprites.other.dream_world.front_default;
  smaller_div.addEventListener("click", () => {
    if (img.style.visibility === "hidden") {
      let audio = document.createElement("audio");
      audio.src = "pokeball_out.mp3";
      // body.appendChild(audio);
      audio.play();
      smaller_div.style.backgroundImage =
        "url('8-82928_open-pokeball-png-transparent-png-removebg-preview.png')";
      img.style.visibility = "visible";
      // console.log(num);
      choosen_pokemons_id_2.push(num);
      counter_2++;
      // alert(counter_2);
      // console.log("if");
      if (counter_2 == 6 && counter == 6) {
        alert("now you can click battle");
        localStorage.setItem(
          "choosen_pokemons_id",
          JSON.stringify(choosen_pokemons_id)
        );
        localStorage.setItem(
          "choosen_pokemons_id_2",
          JSON.stringify(choosen_pokemons_id_2)
        );
      } else if (counter == 6 && counter_2 < 6) {
        if (c1 == 0) {
          alert("Complete pokemons for player 1 now work on player 2");
          c1++;
        }
      } else if (counter_2 == 6 && counter < 6) {
        if (c2 == 0) {
          alert("Complete pokemons for player 2 now work for player 1");
          c2++;
        }
      }
    }
    else {
      choosen_pokemons_id_2.pop();
      // random_computer_pokemons.pop();
      counter_2--;
      smaller_div.style.backgroundImage =
        "url('pngimg.com_-_pokeball_PNG7.png')";
      img.style.visibility = "hidden";
      console.log("else fi");
    }
  });
};

for (let i = 1; i < 50; i++) {
  make_small_div2(Math.floor(Math.random() * 50));
}

// alert("This is workimng")
