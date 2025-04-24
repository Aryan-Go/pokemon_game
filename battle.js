const player1 = new Object();
const player2 = new Object();
let c1 = 0;
let c2 = 0;
let b1 = 0;
let b2 = 0;
let text1 = "Health" + player1.health;
let text2 = "Health" + player2.health;



let body = document.querySelector("body");

let textarea = document.querySelector("textarea");
textarea.scrollTop = textarea.scrollHeight;

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

function make_healthtext(health ,id) {
  let healthtext = document.createElement("div");
  healthtext.id = id;
  healthtext.style.backgroundColor = "green";
  //   console.log(data.stats[0].base_stat);
  player1.health = health;
  healthtext.style.width = player1.health;
  healthtext.innerHTML = "Health" + health;
  healthtext.style.marginTop = "50px";
  healthtext.style.fontSize = "30px";
}

const make_small_div = async (num) => {
  let smaller_div = document.createElement("div");
  smaller_div.id = num;
  let img = document.createElement("img");
  img.style.visibility = "hidden";
    img.style.scale = "3";
  smaller_div.appendChild(img);
  player1_div.appendChild(smaller_div);
  console.log(url + num + "/");
  let response = await fetch(url + num + "/");
  let data = await response.json();
  img.src = data.sprites.front_default;
    smaller_div.addEventListener("click", () => {
      if (c1 == 0) {
        if (img.style.visibility === "hidden") {
          let audio = document.createElement("audio");
          audio.src = "pokeball_out.mp3";
          // body.appendChild(audio);
          audio.play();
          c1++;
          img.src = data.sprites.other.showdown.front_shiny;
          img.style.marginBottom = "30px";
          smaller_div.style.backgroundImage =
            "url('8-82928_open-pokeball-png-transparent-png-removebg-preview.png')";
          img.style.visibility = "visible";
          p1.appendChild(img);

          player1.health = data.stats[0].base_stat;
          make_healthtext(player1.health, "htp1");
          // healthtext.style.borderRadius = "30%";
          let attackdiv = document.createElement("div");
          let buttonheavy = document.createElement("div");
          let buttonlight = document.createElement("div");
          buttonheavy.style.backgroundColor = "#EF0307";
          buttonheavy.innerHTML = data.moves[0].move.name;
          buttonlight.innerHTML = data.moves[1].move.name;
          buttonheavy.style.marginRight = "10px";
          attackdiv.style.width = "200%";
          attackdiv.style.height = "200%";
          buttonheavy.style.width = "100%";
          buttonheavy.style.height = "40px";
          buttonlight.style.backgroundColor = "	#00FFFF";
          buttonlight.style.width = "100%";
          buttonlight.style.fontSize = "20px";
          buttonheavy.style.fontSize = "20px";
          buttonlight.style.height = "40px";
          attackdiv.appendChild(buttonheavy);
          attackdiv.appendChild(buttonlight);
          attackdiv.style.display = "flex";
          attackdiv.style.flexDirection = "row";
          attackdiv.style.justifyContent = "space-around";
          attackdiv.style.marginTop = "10px";
          buttonheavy.addEventListener("click", async () => {
            let i = 0;
            let u;
            let response_u;
            let data_u;
            do {
              u = data.moves[i].move.url;
              console.log(u);
              response_u = await fetch(u);
              data_u = await response_u.json();
              i++;
            } while (!data_u.power)
            i--;
            if (b1 == b2) {
              b1++;
              if (player2.health >= data_u.power * 0.1) {
                healthtext.style.width = player1.health + "%";
                textarea.innerHTML +=
                  "Player 1 did " +
                  data.moves[0].move.name +
                  " on player 2 which caused a damage of " +
                  data_u.power * 0.1 +
                  "\n";
                let audio = document.createElement("audio");
                audio.src = "punch.mp3";
                // body.appendChild(audio);
                audio.play();
                player2.health -= data_u.power * 0.1;
              }
              else {
                // player1.health = 0;
                player2.health = 0;
                c2--;
                // alert(c1);
                alert("Player 1 wins");
                setTimeout(() => {
                  while (p2.firstChild) {
                    p2.removeChild(p2.firstChild);
                  }
                }, 3000);
              }
            }
            console.log(data_u);
            let ht2 = p2.querySelector("#htp2");
            ht2.innerHTML = "Health" + player2.health;
          });
          buttonlight.addEventListener("click", async () => {
            
            let i = 0;
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
            i--;
            if (b1 == b2) {
              b1++;
              if (player2.health >= data_u.power * 0.1) {
                healthtext.style.width = player1.health + "%";
                textarea.innerHTML +=
                  "Player 1 did " +
                  data.moves[1].move.name +
                  " on player 2 which caused a damage of " +
                  data_u.power * 0.1 +
                  "\n";
                let audio = document.createElement("audio");
                audio.src = "punch.mp3";
                // body.appendChild(audio);
                audio.play();
                player2.health -= data_u.power * 0.1;
              }
              else {
                player2.health = 0;
                c2--;
                // alert(c1);
                alert("Player 1 wins");
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
            ht2.innerHTML = "Health" + player2.health;
                
          });
          p1.appendChild(healthtext);
          p1.appendChild(attackdiv);
            
            
        } else {
          smaller_div.style.backgroundImage =
            "url('pngimg.com_-_pokeball_PNG7.png')";
          img.style.visibility = "hidden";
          //   console.log("else fi");
        }
      }
    });
    
};
for (let i = 0; i < choosen_pokemons_id.length; i++) {
  //   console.log(choosen_pokemons_id);
  make_small_div(choosen_pokemons_id[i]);
  // make_small_div.id = i;
}

const make_small_div_2 = async (num) => {
  let smaller_div = document.createElement("div");
  smaller_div.id = num;
  //   let name = document.createElement("p");
  let img = document.createElement("img");
  img.style.visibility = "hidden";
  img.style.scale = "3";
  smaller_div.appendChild(img);
  //   smaller_div.appendChild(name);
  player2_div.appendChild(smaller_div);
  console.log(url + num + "/");
  let response = await fetch(url + num + "/");
  let data = await response.json();
  //   name.innerHTML = data.forms[0].name;
  img.src = data.sprites.front_default;
  // smaller_div.click();
  smaller_div.addEventListener("click", () => {
    if (c2 == 0) {
      if (img.style.visibility === "hidden") {
        let audio = document.createElement("audio");
        audio.src = "pokeball_out.mp3";
        // body.appendChild(audio);
        audio.play();
        c2++;
        img.src = data.sprites.other.showdown.front_shiny;
        img.style.marginBottom = "30px";
        smaller_div.style.backgroundImage =
          "url('8-82928_open-pokeball-png-transparent-png-removebg-preview.png')";
        img.style.visibility = "visible";
        // img.style.marginLeft = "35rem";
        // img.style.marginTop = "10rem";
        p2.appendChild(img);
        let healthtext = document.createElement("div");
        healthtext.id = "htp2";
        healthtext.style.width = "200%";
        healthtext.style.backgroundColor = "green";
        //   console.log(data);
        //   console.log(data.stats[0]);
        player2.health = data.stats[0].base_stat;
        healthtext.innerHTML = "Health" + player2.health;
        healthtext.style.marginTop = "50px";
        healthtext.style.fontSize = "30px";
        
        let attackdiv = document.createElement("div");
        let buttonheavy = document.createElement("div");
        let buttonlight = document.createElement("div");
        buttonheavy.style.backgroundColor = "#EF0307";
        buttonheavy.innerHTML = data.moves[0].move.name;
        buttonlight.innerHTML = data.moves[1].move.name;
        buttonheavy.style.marginRight = "10px";
        attackdiv.style.width = "200%";
        attackdiv.style.height = "200%";
        buttonheavy.style.width = "100%";
        buttonheavy.style.height = "40px";
        buttonlight.style.backgroundColor = "	#00FFFF";
        buttonlight.style.width = "100%";
        buttonlight.style.fontSize = "20px";
        buttonheavy.style.fontSize = "20px";
        buttonlight.style.height = "40px";
        attackdiv.appendChild(buttonheavy);
        attackdiv.appendChild(buttonlight);
        attackdiv.style.display = "flex";
        attackdiv.style.flexDirection = "row";
        attackdiv.style.justifyContent = "space-around";
        attackdiv.style.marginTop = "10px";
        buttonheavy.addEventListener("click", async () => {
          
          let i = 0;
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
          i--;
          if (b2 < b1) {
            b2++;
            if (player1.health >= data_u.power * 0.1) {
              healthtext.style.width = player2.health + "%";
              textarea.innerHTML +=
                "Player 1 did " +
                data.moves[0].move.name +
                " on player 2 which caused a damage of " +
                data_u.power * 0.1+"\n";
              let audio = document.createElement("audio");
              audio.src = "punch.mp3";
              // body.appendChild(audio);
              audio.play();
              player1.health -= data_u.power * 0.1;
            }
            else {
              // alert("in");
              player1.health = 0;
              c1--;
              // alert(c1);
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
          ht1.innerHTML = "Health" + player1.health;
          // text1 = "Health" + player1.health;
        });
        buttonlight.addEventListener("click", async () => {
          
          let i = 0;
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
          i--;
          if (b2 < b1) {
            b2++;
            if (player1.health >= data_u.power * 0.1) {
              healthtext.style.width = player2.health + "%";
              textarea.innerHTML +=
                "Player 1 did " +
                data.moves[1].move.name +
                " on player 2 which caused a damage of " +
                data_u.power * 0.1+"\n";
              let audio = document.createElement("audio");
              audio.src = "punch.mp3";
              // body.appendChild(audio);
              audio.play();
              player1.health -= data_u.power * 0.1;
            }
            else {
              player1.health = 0;
              c1--;
              // alert(c1);
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
          ht1.innerHTML = "Health" + player1.health;
          //   text1 = "Health" + player1.health;
        });

        p2.appendChild(healthtext);
        p2.appendChild(attackdiv);
        
      } else {
        smaller_div.style.backgroundImage =
          "url('pngimg.com_-_pokeball_PNG7.png')";
        img.style.visibility = "hidden";
      }
    }
    });
};
const computer_ka_kaam = async () => {
  for (let i = 0; i < choosen_pokemons_id_2.length; i++) {
    await make_small_div_2(choosen_pokemons_id_2[i]);
    // make_small_div.id = i;
  }
};



computer_ka_kaam();
