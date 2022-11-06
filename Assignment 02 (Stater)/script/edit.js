"use strict";

// Declare variable
const petArr = JSON.parse(getFromStorage("pets"));
const breedArr = JSON.parse(getFromStorage("breed"));
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
const showEdit = document.getElementById("container-form");

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
          <td>${arr[i].date}</td>
          <td><button type="button" class="btn btn-warning" onclick="startEditPet('${
            arr[i].id
          }')">Edit</button></td>
          `;
    tbody.appendChild(row);
  }
};

// lấy dữ liệu pet theo ID để hiển thị lên form
const startEditPet = function (petId) {
  showEdit.classList.remove("hide");
  const pet = petArr.find((pet) => pet.id === petId);
  renderBreed(pet.type);
  idInput.value = pet.id;
  nameInput.value = pet.name;
  ageInput.value = pet.age;
  typeInput.value = pet.type;
  weigthInput.value = pet.weigth;
  lengthInput.value = pet.length;
  colorInput.value = pet.color;
  breedInput.value = pet.breed;
  vaccinatedInput.checked = pet.vaccinated;
  dewormedInput.checked = pet.dewormed;
  sterilizedInput.checked = pet.sterilized;
};

// sự kiện nhấn submit để lưu đối tượng đã được chỉnh sửa
submitBtn.addEventListener("click", function () {
  if (validate()) {
    const pet = petArr.find((pet) => pet.id === idInput.value);
    pet.name = nameInput.value.trim();
    pet.age = parseInt(ageInput.value.trim());
    pet.type = typeInput.value.trim();
    pet.weigth = weigthInput.value.trim();
    pet.length = lengthInput.value.trim();
    pet.color = colorInput.value.trim();
    pet.breed = breedInput.value.trim();
    pet.vaccinated = vaccinatedInput.checked;
    pet.dewormed = dewormedInput.checked;
    pet.sterilized = sterilizedInput.checked;
    pet.date = new Date().toLocaleDateString();
    saveToStorage("pets", JSON.stringify(petArr));
    renderTableData(petArr);
    clearInput();
    showEdit.classList.add("hide");
  }
});

// Kiểm tra input
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

// làm trống input
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

// Hiển thị Breed trong màn hình quản lý thú cưng
const renderBreed = function (type) {
  // tìm tất cả option của Breed Input
  const old_op = document.querySelectorAll("#input-breed>option");
  // duyệt qua mảng old_op để remove các phần tử trong mảng
  for (let i = 1; i < old_op.length; i++) {
    old_op[i].remove();
  }

  for (let i = 0; i < breedArr.length; i++) {
    if (breedArr[i].type === type) {
      const option = document.createElement("option");
      option.innerHTML =
        breedArr[i].breed.charAt(0).toUpperCase() + breedArr[i].breed.slice(1);
      breedInput.appendChild(option);
    }
  }
};

// start
function init() {
  typeInput.onchange = function () {
    renderBreed(typeInput.value);
  };
  renderTableData(petArr);
}

init();
