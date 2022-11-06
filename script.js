"use strict";

// Declare variable
const petArr = JSON.parse(getFromStorage("pets"));
const breedArr = JSON.parse(getFromStorage("breed"));
let healthyCheck = false;
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weigthInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const healthyBtn = document.getElementById("healthy-btn");
const calculateBMI = document.getElementById("calculateBMI-btn");

const validate = function () {
  if (idInput.value === "") {
    alert("Please enter an ID");
    return false;
  }
  if (nameInput.value === "") {
    alert("Please enter a name");
    return false;
  }
  if (ageInput.value === "") {
    alert("Please enter an age");
    return false;
  }
  if (weigthInput.value === "") {
    alert("Please enter a weigth");
    return false;
  }
  if (lengthInput.value === "") {
    alert("Please enter a length");
    return false;
  }
  if (colorInput.value === "") {
    alert("Please enter a color");
    return false;
  }

  for (let pet in petArr) {
    if (petArr[pet].id === idInput.value) {
      alert("ID must unique!");
      return false;
    }
  }

  if (isNaN(ageInput.value) || ageInput.value < 1 || ageInput.value > 15) {
    alert("Please enter an age between 1 and 15");
    return false;
  }
  if (
    isNaN(weigthInput.value) ||
    weigthInput.value < 1 ||
    weigthInput.value > 15
  ) {
    alert("Please enter a weigth between 1 and 15");
    return false;
  }
  if (
    isNaN(lengthInput.value) ||
    lengthInput.value < 1 ||
    lengthInput.value > 100
  ) {
    alert("Please enter a length between 1 and 100");
    return false;
  }

  if (typeInput.value === "Select Type") {
    alert("Please select Type!");
    return false;
  }
  if (breedInput.value === "Select Breed") {
    alert("Please select Breed!");
    return false;
  }
  return true;
};

const getData_fr_input = function () {
  return {
    id: idInput.value.trim(),
    name: nameInput.value.trim(),
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weigth: weigthInput.value,
    length: lengthInput.value,
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    BMI: "?",
    date: new Date().toLocaleDateString("en-US"),
  };
};

const clearInput = function () {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weigthInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

const renderTableData = function (arr) {
  const tableBodyEl = document.getElementById("tbody");
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${arr[i].id}</td>
        <td>${arr[i].name}</td>
        <td>${arr[i].age}</td>
        <td>${arr[i].type}</td>
        <td>${arr[i].weigth} kg</td>
        <td>${arr[i].length} cm</td>
        <td>${arr[i].breed}</td>
        <td><i class="bi bi-square-fill" style="color: ${
          arr[i].color
        }"></i></td>
        <td>${
          arr[i].vaccinated
            ? '<i class="bi bi-check-circle-fill"></i>'
            : '<i class="bi bi-x-circle-fill"></i>'
        }</td>
        <td>${
          arr[i].dewormed
            ? '<i class="bi bi-check-circle-fill"></i>'
            : '<i class="bi bi-x-circle-fill"></i>'
        }</td>
        <td>${
          arr[i].sterilized
            ? '<i class="bi bi-check-circle-fill"></i>'
            : '<i class="bi bi-x-circle-fill"></i>'
        }</td>
        <td>${arr[i].BMI}</td>
        <td>${arr[i].date}</td>
        <td><button type="button" class="btn btn-danger" onclick="deletePet('${
          arr[i].id
        }')">Delete</button></td>
        `;
    tbody.appendChild(row);
  }
};

const deletePet = function (id) {
  if (confirm("Are you sure?")) {
    // remove item in array - link:https://stackoverflow.com/a/5767335
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].id === id) {
        petArr.splice(i, 1);
        saveToStorage("pets", JSON.stringify(petArr));
      }
    }
    renderTableData(petArr);
  }
};

// Add event listener to button
submitBtn.addEventListener("click", function () {
  // check validate
  if (validate()) {
    const data = getData_fr_input();
    petArr.push(data);
    saveToStorage("pets", JSON.stringify(petArr));
    clearInput();
    renderTableData(petArr);
  }
});

healthyBtn.addEventListener("click", function () {
  if (healthyBtn.textContent == "Show Healthy Pet") {
    healthyBtn.textContent = "Show All Pet";
    healthyCheck = true;
  } else if (healthyBtn.textContent == "Show All Pet") {
    healthyBtn.textContent = "Show Healthy Pet";
    healthyCheck = false;
  }

  if (healthyCheck) {
    // healthyCheck = true
    const healthyPetArr = petArr.filter((pet) => {
      return pet.vaccinated && pet.dewormed && pet.sterilized;
    });
    renderTableData(healthyPetArr);
  } else {
    // healthyCheck = false
    renderTableData(petArr);
  }
});

calculateBMI.addEventListener("click", function () {
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].type == "Dog") {
      // Dog: BMI = (weight * 703) / length ** 2
      petArr[i].BMI = (
        (petArr[i].weigth * 703) /
        petArr[i].length ** 2
      ).toFixed(2);
    } else if (petArr[i].type == "Cat") {
      // Cat: BMI = (weight * 886) / length ** 2
      petArr[i].BMI = (
        (petArr[i].weigth * 886) /
        petArr[i].length ** 2
      ).toFixed(2);
    }
  }
  renderTableData(petArr);
});

// Hiển thị Breed trong màn hình quản lý thú cưng
const renderBreed = function (type) {
  // tìm tất cả option của Breed Input
  const old_op = document.querySelectorAll("#input-breed>option");
  // duyệt qua mảng old_op để remove các phần tử trong mảng
  for (let i = 1; i < old_op.length; i++) {
    old_op[i].remove();
  }
  // nếu type === "Select Type" thì xuất ra tất cả type
  if (type === "Select Type") {
    for (let i = 0; i < breedArr.length; i++) {
      const option = document.createElement("option");
      option.innerHTML =
        breedArr[i].breed.charAt(0).toUpperCase() + breedArr[i].breed.slice(1);
      breedInput.appendChild(option);
    }
  }
  // ngược lại: thì xuất type theo type [Dog, Cat]
  else {
    for (let i = 0; i < breedArr.length; i++) {
      if (breedArr[i].type === type) {
        const option = document.createElement("option");
        option.innerHTML =
          breedArr[i].breed.charAt(0).toUpperCase() +
          breedArr[i].breed.slice(1);
        breedInput.appendChild(option);
      }
    }
  }
};
const init = function () {
  renderBreed("Select Type");
  // Check if there is data in local storage
  if (petArr.length > 0) {
    renderTableData(petArr);
  }
  // Hiển thị Breed trong màn hình quản lý thú cưng
  typeInput.onchange = function () {
    renderBreed(typeInput.value);
  };
};

// start
init();
