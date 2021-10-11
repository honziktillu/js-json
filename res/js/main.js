const cats = document.getElementById("cats");
const joke = document.getElementById("joke");
const button = document.getElementById("button");

let catNames;
let catValues;

const readFile = async () => {
  try {
    const file = await fetch("/res/json/data.json");
    return await file.json();
  } catch (e) {
    console.log(e);
  }
};

const generateJokes = (jokes) => {
  catNames = Object.keys(jokes);
  catValues = Object.values(jokes);
  catNames.forEach((name, index) => {
    let button = document.createElement("button");
    button.classList.add("button");
    button.classList.add("is-light");
    button.dataset.cat = index;
    button.textContent = name;
    setOnClick(button);
    cats.appendChild(button);
  });
};

const setOnClick = (button) => {
  button.onclick = () => {
    let buttons = document.getElementsByClassName("active");
    [...buttons].forEach((button) => {
      button.classList.remove("active");
      button.classList.remove("is-success");
    });
    button.classList.add("active");
    button.classList.add("is-success");
  };
};

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const newJoke = () => {
  let buttons = document.getElementsByClassName("active");
  [...buttons].forEach((button) => {
    if (button.classList.contains("active")) {
      let dN = button.dataset.cat;
      let rN = randomNumber(0, catValues[dN].length - 1);
      joke.textContent = catValues[dN][rN];
    }
  });
};

window.onload = async () => {
  const jokes = await readFile();
  generateJokes(jokes);
  button.onclick = newJoke;
};
