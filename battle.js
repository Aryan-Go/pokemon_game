let healthtext2 = document.createElement("div");
let attackdiv2 = document.createElement("div");
let buttonheavy2 = document.createElement("div");
let buttonlight2 = document.createElement("div");

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
let i = 0;
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
  pokeball_div.style.marginBottom = "-20rem";
  pokeball_div.style.display = "flex";
  pokeball_div.style.flexDirection = "column";
  pokeball_div.style.justifyContent = "center";
  pokeball_div.style.scale = "0.6";
  pokeball_div.style.margin = 0;
  pokeball_div.style.padding = 0;
  let img = document.createElement("img");
  let name = document.createElement("p");
  name.style.fontWeight = "bolder";
  name.style.fontSize = "3rem";
  name.style.color = "red";
  name.style.marginTop = "1rem";
  img.style.visibility = "hidden";
  img.style.scale = "3";
  pokeball_div.appendChild(img);
  pokeball_div.appendChild(name);
  player1_div.appendChild(pokeball_div);
  console.log(url + num + "/");
  let response = await fetch(url + num + "/");
  let data = await response.json();
  name.innerHTML = data.forms[0].name;
  img.src = data.sprites.front_default;
  pokeball_div.addEventListener("click", () => {
    if (counter1 == 0) {
      if (img.style.visibility === "hidden") {
        let audio = document.createElement("audio");
        audio.src = "/audiofile/pokeball_out.mp3";
        audio.play();
        counter1++;
        img.src = data.sprites.other.showdown.front_shiny;
        img.style.marginBottom = "1.875rem";
        pokeball_div.style.backgroundImage = "none";
        name.style.visibility = "hidden"
        img.style.visibility = "visible";
        p1.appendChild(img);
        player1 = new player(
          data.stats[0].base_stat,
          data.stats[0].base_stat,
          data.moves[0].move.name,
          data.moves[1].move.name,
          "htp1"
        );
        p1.style.marginTop = "24rem";
        let reddiv = document.createElement("div");
        let healthtext = document.createElement("div");
        let attackdiv = document.createElement("div");
        let buttonheavy = document.createElement("div");
        let buttonlight = document.createElement("div");
        let healthtextp = document.createElement("p");

        reddiv.style.width = "10rem";
        reddiv.style.marginTop = "-2.2rem"
        reddiv.style.zIndex = -1;
        reddiv.style.height = "2rem";
        reddiv.style.backgroundColor = "red";
        reddiv.style.border = "white 0.2rem solid";
        reddiv.style.borderRadius = "1rem";
        
        healthtextp.innerHTML = "Health" + player1.health;
        healthtextp.id = "health1";
        healthtextp.style.backgroundColor = "#86a93c";
        healthtextp.style.border = "white 0.2rem solid";
        healthtextp.style.borderRadius = "1rem";
        healthtextp.style.padding = "1rem";

        healthtext.id = player1.id;
        healthtext.style.marginTop = "5rem";
        healthtext.style.backgroundColor = "green";
        healthtext.style.height = "2rem";
        healthtext.style.width = (player1.health / data.stats[0].base_stat)*10 + "rem";
        healthtext.style.borderRadius = "1rem";
        
        // healthtext.innerHTML = "Health" + player1.health;

        healthtext.style.fontSize = "1.875rem";
        buttonheavy.style.backgroundColor = "#d35f56";
        buttonheavy.innerHTML = player1.attack1;
        buttonlight.innerHTML = player1.attack2;
        buttonheavy.style.marginRight = "0.625rem";
        attackdiv.style.width = "20rem";
        attackdiv.style.height = "15rem";
        buttonheavy.style.width = "10rem";
        buttonheavy.style.height = "2.5rem";
        buttonheavy.style.border = "white 0.2rem solid";
        buttonheavy.style.borderRadius = "1rem";
        buttonlight.style.border = "white 0.2rem solid";
        buttonlight.style.borderRadius = "1rem";
        buttonlight.style.backgroundColor = "#e2e1d9";
        buttonlight.style.width = "10rem";
        buttonlight.style.fontSize = "1.25rem";
        buttonheavy.style.fontSize = "1.25rem";
        buttonlight.style.height = "2.5rem";
        attackdiv.appendChild(buttonheavy);
        attackdiv.appendChild(buttonlight);
        attackdiv.style.display = "flex";
        attackdiv.style.flexDirection = "row";
        attackdiv.style.justifyContent = "space-around";
        attackdiv.style.marginTop = "0.625rem";
        buttonheavy.addEventListener("click", async () => {
          let u;
          let response_u;
          let data_u;
          do {
            u = data.moves[i].move.url;
            console.log(u);
            response_u = await fetch(u);
            data_u = await response_u.json();
            i++;
          } while (!data_u.power);
          // i--;
          if (b1 == b2) {
            b1++;
            if (player2.health >= data_u.power * 0.1) {
              let text = document.createElement("p");
              text.innerHTML =
                "Player 1 did " +
                data.moves[0].move.name +
                " on player 2 which caused a damage of " +
                data_u.power * 0.1 +
                "\n";
              text.style.fontSize = "1.875rem";
              // text.style.color = "blue";
              textarea.appendChild(text);
              textarea.scrollTop = textarea.scrollHeight;
              let audio = document.createElement("audio");
              audio.src = "/audiofile/punch.mp3";
              // body.appendChild(audio);
              audio.play();
              player2.health -= data_u.power * 0.1;
              let ht2 = p2.querySelector("#htp2");
              ht2.style.width =
                (player2.health / player2.const_health) * 10 + "rem";
              let hp2 = p2.querySelector("#health2");
              hp2.innerHTML = "Health = " + player2.health;
            } else {
              // player1.health = 0;
              alert("Player 1 wins");
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
          console.log(data_u);
          let ht2 = p2.querySelector("#htp2");
          ht2.style.width = (player2.health / player2.const_health) * 10 + "rem";
          let hp1 = p1.querySelector("#health1");
          hp1.innerHTML = "Health = " + player1.health;
        });
        buttonlight.addEventListener("click", async () => {
          let u;
          let response_u;
          let data_u;
          do {
            player1.url = data.moves[i].move.url;
            console.log(player1.url);
            response_u = await fetch(player1.url);
            data_u = await response_u.json();
            i++;
          } while (!data_u.power);
          // i--;
          if (b1 == b2) {
            b1++;
            if (player2.health >= data_u.power * 0.1) {
              let text = document.createElement("p");
              text.innerHTML =
                "Player 1 did " +
                data.moves[1].move.name +
                " on player 2 which caused a damage of " +
                data_u.power * 0.1 +
                "\n";
              text.style.fontSize = "1.875rem";
              // text.style.color = "blue";
              textarea.appendChild(text);
              textarea.scrollTop = textarea.scrollHeight;

              let audio = document.createElement("audio");
              audio.src = "/audiofile/punch.mp3";
              // body.appendChild(audio);
              audio.play();
              player2.health -= data_u.power * 0.1;
              let ht2 = p2.querySelector("#htp2");
              ht2 = player2.health + "%";
              let hp2 = p2.querySelector("#health2");
              hp2.innerHTML = "Health = " + player2.health;
            } else {
              alert("Player 1 wins");
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
          // text2 = "Health" + player2.health;
          console.log(data_u);
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
        //   console.log("else fi");
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
  pokeball_div.style.display = "flex";
  pokeball_div.style.flexDirection = "column";
  pokeball_div.style.justifyContent = "center";
  pokeball_div.style.scale = "0.6";
  pokeball_div.style.margin = 0;
  pokeball_div.style.padding = 0;
  //   let name = document.createElement("p");
  let img = document.createElement("img");
  let name = document.createElement("p");
  name.style.fontWeight = "bolder";
  name.style.color = "red";
  name.style.fontSize = "3rem";
  // name.style.padding = "10rem";
  img.style.visibility = "hidden";
  img.style.scale = "3";
  pokeball_div.appendChild(img);
  pokeball_div.appendChild(name);
  //   pokeball_div.appendChild(name);
  player2_div.appendChild(pokeball_div);
  console.log(url + num + "/");
  let response = await fetch(url + num + "/");
  let data = await response.json();
  name.innerHTML = data.forms[0].name;
  //   name.innerHTML = data.forms[0].name;
  img.src = data.sprites.front_default;
  // pokeball_div.click();
  let i = 0;
  pokeball_div.addEventListener("click", () => {
    if (counter2 == 0) {
      if (img.style.visibility === "hidden") {
        let audio = document.createElement("audio");
        audio.src = "/audiofile/pokeball_out.mp3";
        // body.appendChild(audio);
        audio.play();
        counter2++;
        img.src = data.sprites.other.showdown.front_shiny;
        img.style.marginBottom = "1.875rem";
        pokeball_div.style.backgroundImage = "none";
        name.style.visibility = "hidden";
        img.style.visibility = "visible";
        // img.style.marginLeft = "35rem";
        // img.style.marginTop = "10rem";
        p2.style.marginTop = "24rem";
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

        reddiv.style.width = "10rem";
        reddiv.style.marginTop = "-2.2rem";
        reddiv.style.zIndex = -1;
        reddiv.style.height = "2rem";
        reddiv.style.backgroundColor = "red";
        reddiv.style.border = "white 0.2rem solid"
        reddiv.style.borderRadius = "1rem"
        
        healthtextp.innerHTML = "Health" + player2.health;
        healthtextp.id = "health2";
        healthtextp.style.backgroundColor = "#86a93c";
        healthtextp.style.border = "white 0.2rem solid";
        healthtextp.style.borderRadius = "1rem";
        healthtextp.style.padding = "1rem";
        healthtext.id = player2.id;
        healthtext.style.marginTop = "5rem";
        healthtext.style.backgroundColor = "green";
        healthtext.style.height = "2rem";
        healthtext.style.width =
          (player2.health / data.stats[0].base_stat) * 10 + "rem";
        healthtext.style.borderRadius = "1rem"
        // healthtext.style.marginTop = "-100%";
        healthtext.style.fontSize = "1.875rem";
        buttonheavy.style.backgroundColor = "#d35f56";
        buttonheavy.innerHTML = player2.attack1;
        buttonlight.innerHTML = player2.attack2;
        buttonheavy.style.marginRight = "0.625rem";
        buttonheavy.style.border = "white 0.2rem solid";
        buttonheavy.style.borderRadius = "1rem";
        buttonlight.style.border = "white 0.2rem solid";
        buttonlight.style.borderRadius = "1rem";
        attackdiv.style.width = "20rem";
        attackdiv.style.height = "15rem";
        buttonheavy.style.width = "10rem";
        buttonheavy.style.height = "2.5rem";
        buttonlight.style.backgroundColor = "	#e2e1d9";
        buttonlight.style.width = "10rem";
        buttonlight.style.fontSize = "1.25rem";
        buttonheavy.style.fontSize = "1.25rem";
        buttonlight.style.height = "2.5rem";
        attackdiv.appendChild(buttonheavy);
        attackdiv.appendChild(buttonlight);
        attackdiv.style.display = "flex";
        attackdiv.style.flexDirection = "row";
        attackdiv.style.justifyContent = "space-around";
        attackdiv.style.marginTop = "0.625rem";
        buttonheavy.addEventListener("click", async () => {
          let u;
          let response_u;
          let data_u;
          do {
            u = data.moves[i].move.url;
            console.log(u);
            response_u = await fetch(u);
            data_u = await response_u.json();
            i++;
          } while (!data_u.power);
          if (b2 < b1) {
            b2++;
            if (player1.health >= data_u.power * 0.1) {
              let text = document.createElement("p");
              text.innerHTML =
                "Player 2 did " +
                data.moves[0].move.name +
                " on player 1 which caused a damage of " +
                data_u.power * 0.1 +
                "\n";
              text.style.fontSize = "1.875rem";
              // text.style.color = "red";
              textarea.appendChild(text);
              textarea.scrollTop = textarea.scrollHeight;
              let audio = document.createElement("audio");
              audio.src = "/audiofile/punch.mp3";
              // body.appendChild(audio);
              audio.play();
              player1.health -= data_u.power * 0.1;
              let ht1 = p1.querySelector("#htp1");
              ht1.style.width =
                (player1.health / player1.const_health) * 10 + "rem";
              let hp1 = p1.querySelector("#health1");
              hp1.innerHTML = "Health = " + player1.health;
            } else {
              // alert("in");
              player1.health = 0;
              counter1--;
              // alert(counter1);
              alert("Player 2 wins");
              setTimeout(() => {
                while (p1.firstChild) {
                  p1.removeChild(p1.firstChild);
                }
              }, 3000);
              player1.health = 0;
            }
          }

          let ht1 = p1.querySelector("#htp1");
          // text1 = "Health" + player1.health;
        });
        buttonlight.addEventListener("click", async () => {
          let u;
          let response_u;
          let data_u;
          do {
            u = data.moves[i].move.url;
            console.log(u);
            response_u = await fetch(u);
            data_u = await response_u.json();
            i++;
          } while (!data_u.power);
          if (b2 < b1) {
            b2++;
            if (player1.health >= data_u.power * 0.1) {
              let text = document.createElement("p");
              // p.id = "heyyyy"
              // text.style.color = "red";
              text.innerHTML =
                "Player 1 did " +
                data.moves[1].move.name +
                " on player 2 which caused a damage of " +
                data_u.power * 0.1 +
                "\n";
              text.style.fontSize = "1.875rem";
              textarea.appendChild(text);
              textarea.scrollTop = textarea.scrollHeight;

              let audio = document.createElement("audio");
              audio.src = "/audiofile/punch.mp3";
              // body.appendChild(audio);
              audio.play();
              player1.health -= data_u.power * 0.1;
              let ht1 = p1.querySelector("#htp1");
              ht1.style.width =
                (player1.health / player1.const_health) * 10 + "rem";
              let hp1 = p1.querySelector("health1");
              hp1.innerHTML = "Health = " + player1.health;
            } else {
              player1.health = 0;
              counter1--;
              // alert(counter1);
              alert("Player 2 wins");
              setTimeout(() => {
                while (p1.firstChild) {
                  p1.removeChild(p1.firstChild);
                }
              }, 3000);
              player1.health = 0;
            }
          }
          let ht1 = p1.querySelector("#htp1");
          //   text1 = "Health" + player1.health;
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
    // pokeball_formation.id = i;
  }
};


starting_function().then();