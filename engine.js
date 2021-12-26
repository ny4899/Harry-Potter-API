"use strict";
const card_container = document.querySelector(".card_container");
const inputBar = document.getElementById("inputBar");

const cardHTML = function (name, actor, house, ancestry, img) {
  if (name === "") name = "not available";
  if (actor === "") actor = "not available";
  if (house === "") house = "not available";
  if (ancestry === "") ancestry = "not available";
  const html = `
    <div class="card">
        <img src="${img}" alt="Image not available" />
        <p>Name : <span>${name}</span></p>
        <p>Actor : <span>${actor}</span></p>
        <p>House : <span>${house}</span></p>
        <p>Ancestry : <span>${ancestry}</span></p>
      </div>
    `;
  card_container.insertAdjacentHTML("beforeend", html);
};
//======================================
const renderError = function (msgHead = "", msgBody = "") {
  card_container.innerHTML = "";
  const html = `
    <div class="card">
       
        <p><span>${msgHead}</span></p>
        <p>${msgBody}</p>
      </div>
    `;
  card_container.insertAdjacentHTML("beforeend", html);
};
//======================================
const creatingAllCharactersArr = function (data) {
  for (let i = 0; i < data.length; i++) {
    cardHTML(
      data[i].name,
      data[i].actor,
      data[i].house,
      data[i].ancestry,
      data[i].image
    );
  }
};

const filteringDataAndPrinting = function (data) {
  let filterDataArr = [];
  const inputvalue = inputBar.value;

  for (let i = 0; i < data.length; i++) {
    if (
      inputvalue.toUpperCase() ===
      data[i].name.slice(0, inputvalue.length).toUpperCase()
    ) {
      filterDataArr.push(data[i]);
    }
  }
  card_container.innerHTML = "";
  filterDataArr.length > 0
    ? creatingAllCharactersArr(filterDataArr)
    : renderError("No Character with this name");
};
const apiDetails = function () {
  fetch(`https://hp-api.herokuapp.com/api/characters`)
    .then((res) => {
      if (res.ok === false) {
        throw new Error(`Unable to connect with Internet`);
      }
      return res.json();
    })
    .then((data) => {
      creatingAllCharactersArr(data);
      inputBar.addEventListener("input", function () {
        filteringDataAndPrinting(data);
      });
    })
    .catch((err) => {
      renderError(`Somthing went wrong`, `${err.message}`);
    });
};

apiDetails();
