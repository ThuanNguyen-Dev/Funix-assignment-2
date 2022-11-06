"use strict";

function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

function getFromStorage(key) {
  return localStorage.getItem(key);
}

function checkNull(key) {
  if (getFromStorage(key) === null) {
    return true;
  }
  return false;
}
// set localStorage breed
if (checkNull("breed")) {
  localStorage.setItem(
    "breed",
    JSON.stringify([
      { breed: "Pug", type: "Dog" },
      { breed: "Poodle", type: "Dog" },
      { breed: "Chihuahua", type: "Dog" },
      { breed: "Bắc Kinh", type: "Dog" },
      { breed: "Dachshund", type: "Dog" },
      { breed: "Phú Quốc", type: "Dog" },
      { breed: "Alaska", type: "Dog" },
      { breed: "Husky", type: "Dog" },
      { breed: "Samoyed", type: "Dog" },
      { breed: "Pomeranian", type: "Dog" },
      { breed: "Beagle", type: "Dog" },
      { breed: "Shiba Inu", type: "Dog" },
      { breed: "Golden Retriever", type: "Dog" },
      { breed: "Corgi", type: "Dog" },
      { breed: "British Longhair", type: "Cat" },
      { breed: "British Shorthair", type: "Cat" },
      { breed: "Persian Longhair", type: "Cat" },
      { breed: "Munchkin", type: "Cat" },
      { breed: "Scottish Fold", type: "Cat" },
      { breed: "Xiêm", type: "Cat" },
      { breed: "Bengal", type: "Cat" },
      { breed: "Sphynx", type: "Cat" },
      { breed: "Ragdoll", type: "Cat" },
      { breed: "Maine Coon", type: "Cat" },
    ])
  );
}
// set Local Storage index
if (checkNull("pets")) {
  localStorage.setItem(
    "pets",
    JSON.stringify([
      {
        id: "P001",
        name: "coco",
        age: 1,
        type: "Cat",
        weigth: "5",
        length: "50",
        color: "#000000",
        breed: "British Longhair",
        vaccinated: true,
        dewormed: true,
        sterilized: true,
        BMI: "?",
        date: "10/28/2022",
      },
    ])
  );
}

// Toggle class active when click on navbar
const sidebarTitleEl = document.getElementById("sidebar-title");
const sidebarEl = document.getElementById("sidebar");
sidebarTitleEl.addEventListener("click", function () {
  sidebarEl.classList.toggle("active");
});
