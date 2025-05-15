let healthtext2 = document.createElement("div");
let attackdiv2 = document.createElement("div");
let buttonheavy2 = document.createElement("div");
let buttonlight2 = document.createElement("div");
let total_balls_player1 = 6;
let total_balls_player2 = 6;

const starting_function = async () => {
  const load = document.querySelector(".loading_gif");
  const main_body = document.getElementById("body");

  main_body.style.display = "none";
  load.style.display = "flex";

  await pokeball_insertion();
  await pokeball_formation_function();

  setTimeout(() => {
    main_body.style.display = "flex";
    load.style.display = "none";
  } , 1500)
};

class player {
  constructor(const_health, health, attack1, attack2, id) {
    this.const_health = const_health;
    this.health = health;
    this.attack1 = attack1;
    this.attack2 = attack2;
    this.id = id;
  }
}

let player1;
let player2;
let counter1 = 0;
let counter2 = 0;
let b1 = 0;
let b2 = 0;

let body = document.querySelector("body");

let textarea = document.querySelector(".textarea");
// textarea.scrollIntoView();

window.onload = () => {
  document.querySelector("audio").play();
};

let choosen_pokemons_id = JSON.parse(
  localStorage.getItem("choosen_pokemons_id")
);

let choosen_pokemons_id_2 = JSON.parse(
  localStorage.getItem("choosen_pokemons_id_2")
);
let battle_div = document.querySelector(".main_ground");
let p1 = document.querySelector(".p1");
let p2 = document.querySelector(".p2");
let player1_div = document.querySelector(".player1");
let player2_div = document.querySelector(".player2");

let url = "https://pokeapi.co/api/v2/pokemon/";

const pokeball_formation = async (num) => {
  let pokeball_div = document.createElement("div");
  pokeball_div.id = num;
  // pokeball_div.style.marginBottom = "-20rem";
  
  let img = document.createElement("img");
  let name = document.createElement("p");
  name.classList.add("name");
  
  // name.style.marginTop = "1rem";
  // name.style.margin = "auto";
  img.classList.add("img");
  img.style.visibility = "hidden";
  img.style.scale = "3";
  pokeball_div.appendChild(img);
  pokeball_div.appendChild(name);
  player1_div.appendChild(pokeball_div);
  let response = await fetch(url + num + "/");
  let data = await response.json();
  name.innerHTML = data.forms[0].name;
  img.src = data.sprites.front_default;
  pokeball_div.addEventListener("click", () => {
    if (counter1 == 0) {
      if (img.style.visibility === "hidden") {
        total_balls_player1--;
        let audio = document.createElement("audio");
        audio.src = "/audiofile/pokeball_out.mp3";
        audio.play();
        counter1++;
        img.src = data.sprites.other.showdown.front_shiny;
        img.style.marginBottom = "1.875rem";
        pokeball_div.remove();
        img.style.visibility = "visible";
        p1.appendChild(img);
        player1 = new player(
          data.stats[0].base_stat,
          data.stats[0].base_stat,
          data.moves[0].move.name,
          data.moves[1].move.name,
          "htp1"
        );
        
        let reddiv = document.createElement("div");
        let healthtext = document.createElement("div");
        let attackdiv = document.createElement("div");
        let buttonheavy = document.createElement("div");
        let buttonlight = document.createElement("div");
        let healthtextp = document.createElement("p");

        
        reddiv.classList.add("reddiv");
        
        healthtextp.classList.add("healthtextp");
        healthtextp.id = "health1";
          healthtextp.innerHTML = "Health" + player1.health;

        healthtext.id = player1.id;
        healthtext.classList.add("healthtext");
        
        healthtext.style.width = (player1.health / data.stats[0].base_stat)*10 + "rem";

        buttonheavy.classList.add("buttonheavy");
        
        buttonheavy.innerHTML = player1.attack1;
        buttonlight.innerHTML = player1.attack2;
        
        attackdiv.classList.add("attackdiv");
        
        buttonlight.classList.add("buttonlight");
        
        attackdiv.appendChild(buttonheavy);
        attackdiv.appendChild(buttonlight);
        
        let i = 0;
        buttonheavy.addEventListener("click", async () => {
          let u;
          let response_u;
          let data_u;
            u = data.moves[0].move.url;
            response_u = await fetch(u);
            data_u = await response_u.json();
          if (b1 == b2) {
            b1++;
            if (player2.health >= data_u.power * 0.1) {
              let text = document.createElement("p");
              text.classList.add("text");
              text.innerHTML =
                "Player 1 did " +player1.attack1
                 +
                " on player 2 which caused a damage of " +
                data_u.power * 0.1 +
                "\n";
              textarea.appendChild(text);
              textarea.scrollTop = textarea.scrollHeight;
              let audio = document.createElement("audio");
              audio.src = "/audiofile/punch.mp3";
              audio.play();
              player2.health -= data_u.power * 0.1;
              let ht2 = p2.querySelector("#htp2");
              ht2.style.width =
                (player2.health / player2.const_health) * 10 + "rem";
              let hp2 = p2.querySelector("#health2");
              hp2.innerHTML = "Health = " + player2.health;
            } else {
              alert(
                "Player 1 wins. Wait for 3 sec for the pokemon to be removed and then select your new pokemon"
              );
              if (total_balls_player1 == 0 || total_balls_player2 == 0) {
                alert(
                  "Wait for 3 seconds while you are being redirected to the home page"
                );
                setTimeout(() => {
                  window.location.href = "index.html";
                }, 3000);
              }
              player2.health = 0;
              counter2--;
              // alert(counter1);
              setTimeout(() => {
                while (p2.firstChild) {
                  p2.removeChild(p2.firstChild);
                }
              }, 3000);
            }
          }
          let ht2 = p2.querySelector("#htp2");
          ht2.style.width = (player2.health / player2.const_health) * 10 + "rem";
          let hp1 = p1.querySelector("#health1");
          hp1.innerHTML = "Health = " + player1.health;
        });
        buttonlight.addEventListener("click", async () => {
          let u;
          let response_u;
          let data_u;
            u = data.moves[1].move.url;
            response_u = await fetch(u);
            data_u = await response_u.json();
          if (b1 == b2) {
            b1++;
            if (player2.health >= data_u.power * 0.1) {
              let text = document.createElement("p");
              text.classList.add("text");
              text.innerHTML =
                "Player 1 did " +player1.attack2
                 +
                " on player 2 which caused a damage of " +
                data_u.power * 0.1 +
                "\n";
              textarea.appendChild(text);
              textarea.scrollTop = textarea.scrollHeight;

              let audio = document.createElement("audio");
              audio.src = "/audiofile/punch.mp3";
              audio.play();
              player2.health -= data_u.power * 0.1;
              let ht2 = p2.querySelector("#htp2");
              ht2.style.width =
                (player2.health / player2.const_health) * 10 + "rem";
              let hp2 = p2.querySelector("#health2");
              hp2.innerHTML = "Health = " + player2.health;
            } else {
              alert(
                "Player 1 wins. Wait for 3 sec for the pokemon to be removed and then select your new pokemon"
              );
              if (total_balls_player1 == 0 || total_balls_player2 == 0) {
                alert(
                  "Wait for 3 seconds while you are being redirected to the home page"
                );
                setTimeout(() => {
                  window.location.href = "index.html";
                }, 3000);
              }
              player2.health = 0;
              counter2--;
              setTimeout(() => {
                while (p2.firstChild) {
                  p2.removeChild(p2.firstChild);
                }
              }, 3000);
            }
          }
          let ht2 = p2.querySelector("#htp2");
          let hp2 = p2.querySelector("#health2");
          hp2.innerHTML = "Health = " + player2.health;
        });
        p1.appendChild(healthtext);
        p1.appendChild(reddiv);
        p1.appendChild(healthtextp);
        p1.appendChild(attackdiv);
      } else {
        pokeball_div.style.backgroundImage = "url('closed_pokeball.png')";
        img.style.visibility = "hidden";
      }
    }
  });
};

const pokeball_formation_function = async () => {
  for (let i = 0; i < choosen_pokemons_id.length; i++) {
    await pokeball_formation(choosen_pokemons_id[i]);
  }
}



const pokeball_formation_2 = async (num) => {
  let pokeball_div = document.createElement("div");
  pokeball_div.id = num;
  let img = document.createElement("img");
  let name = document.createElement("p");
  name.classList.add("name");
  img.style.visibility = "hidden";
  img.style.scale = "3";
  pokeball_div.appendChild(img);
  pokeball_div.appendChild(name);
  player2_div.appendChild(pokeball_div);
  let response = await fetch(url + num + "/");
  let data = await response.json();
  name.innerHTML = data.forms[0].name;
  img.src = data.sprites.front_default;
  let i = 0;
  pokeball_div.addEventListener("click", () => {
    if (counter2 == 0) {
      if (img.style.visibility === "hidden") {
        total_balls_player2--;
        let audio = document.createElement("audio");
        audio.src = "/audiofile/pokeball_out.mp3";
        audio.play();
        counter2++;
        img.src = data.sprites.other.showdown.front_shiny;
        img.style.marginBottom = "1.875rem";
        pokeball_div.remove();
        img.style.visibility = "visible";
        
        p2.appendChild(img);
        player2 = new player(
          data.stats[0].base_stat,
          data.stats[0].base_stat,
          data.moves[0].move.name,
          data.moves[1].move.name,
          "htp2"
        );
        let reddiv = document.createElement("div");
        let healthtext = document.createElement("div");
        let attackdiv = document.createElement("div");
        let buttonheavy = document.createElement("div");
        let buttonlight = document.createElement("div");
        let healthtextp = document.createElement("p");

        reddiv.classList.add("reddiv");
        
        healthtextp.innerHTML = "Health" + player2.health;
        healthtextp.id = "health2";
        healthtextp.classList.add("healthtextp");

        healthtext.id = player2.id;
        healthtext.classList.add("healthtext");
        healthtext.style.width =
          (player2.health / data.stats[0].base_stat) * 10 + "rem";
        
        buttonheavy.classList.add("buttonheavy");
        buttonheavy.innerHTML = player2.attack1;
        buttonlight.innerHTML = player2.attack2;
        
        buttonlight.classList.add("buttonlight");
        
        attackdiv.classList.add("attackdiv");
        
        attackdiv.appendChild(buttonheavy);
        attackdiv.appendChild(buttonlight);
        
        let i = 0;
        buttonheavy.addEventListener("click", async () => {
          let u;
          let response_u;
          let data_u;
            u = data.moves[0].move.url;
            response_u = await fetch(u);
            data_u = await response_u.json();
          if (b2 < b1) {
            b2++;
            if (player1.health >= data_u.power * 0.1) {
              let text = document.createElement("p");
              text.classList.add("text");
              text.innerHTML =
                "Player 2 did " +player2.attack1
                 +
                " on player 1 which caused a damage of " +
                data_u.power * 0.1 +
                "\n";
              textarea.appendChild(text);
              textarea.scrollTop = textarea.scrollHeight;
              let audio = document.createElement("audio");
              audio.src = "/audiofile/punch.mp3";
              audio.play();
              player1.health -= data_u.power * 0.1;
              let ht1 = p1.querySelector("#htp1");
              ht1.style.width =
                (player1.health / player1.const_health) * 10 + "rem";
              let hp1 = p1.querySelector("#health1");
              hp1.innerHTML = "Health = " + player1.health;
            } else {
              player1.health = 0;
              counter1--;
              alert("Player 2 wins. Wait for 3 sec for the pokemon to be removed and then select your new pokemon");
              if (total_balls_player1 == 0 || total_balls_player2 == 0) {
                alert(
                  "Wait for 3 seconds while you are being redirected to the home page"
                );
                setTimeout(() => {
                  window.location.href = "index.html";
                }, 3000);
              }
              setTimeout(() => {
                while (p1.firstChild) {
                  p1.removeChild(p1.firstChild);
                }
              }, 3000);
              player1.health = 0;
            }
          }

          let ht1 = p1.querySelector("#htp1");
          ht1.style.width =
            (player1.health / player1.const_health) * 10 + "rem";
        });
        buttonlight.addEventListener("click", async () => {
          let u;
          let response_u;
          let data_u;
            u = data.moves[1].move.url;
            response_u = await fetch(u);
            data_u = await response_u.json();
          if (b2 < b1) {
            b2++;
            if (player1.health >= data_u.power * 0.1) {
              let text = document.createElement("p");
              text.classList.add("text");
              text.innerHTML =
                "Player 2 did " +player2.attack2
                 +
                " on player 1 which caused a damage of " +
                data_u.power * 0.1 +
                "\n";
              textarea.appendChild(text);
              textarea.scrollTop = textarea.scrollHeight;

              let audio = document.createElement("audio");
              audio.src = "/audiofile/punch.mp3";
              audio.play();
              player1.health -= data_u.power * 0.1;
              let ht1 = p1.querySelector("#htp1");
              ht1.style.width =
                (player1.health / player1.const_health) * 10 + "rem";
              let hp1 = p1.querySelector("#health1");
              hp1.innerHTML = "Health = " + player1.health;
            } else {
              
              player1.health = 0;
              counter1--;
              alert(
                "Player 2 wins. Wait for 3 sec for the pokemon to be removed and then select your new pokemon"
              );
              if (total_balls_player1 == 0 || total_balls_player2 == 0) {
                alert("Wait for 3 seconds while you are being redirected to the home page");
                setTimeout(() => {
                  window.location.href = "index.html";
                }, 3000);
              }
              setTimeout(() => {
                while (p1.firstChild) {
                  p1.removeChild(p1.firstChild);
                }
              }, 3000);
              player1.health = 0;
            }
          }
          let ht1 = p1.querySelector("#htp1");
          ht1.style.width =
            (player1.health / player1.const_health) * 10 + "rem";
          ht1.style.width =
            (player1.health / player1.const_health) * 10 + "rem";
          let hp1 = p1.querySelector("#health1");
          hp1.innerHTML = "Health = " + player1.health;
        });
        p2.appendChild(healthtext);
        p2.appendChild(reddiv);
        p2.appendChild(healthtextp);
        p2.appendChild(attackdiv);
      } else {
        pokeball_div.style.backgroundImage = "url('closed_pokeball.png')";
        img.style.visibility = "hidden";
      }
    }
  });
};
const pokeball_insertion = async () => {
  for (let i = 0; i < choosen_pokemons_id_2.length; i++) {
    await pokeball_formation_2(choosen_pokemons_id_2[i]);
  }
};


starting_function().then();