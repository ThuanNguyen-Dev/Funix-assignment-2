"use strict";

// Declare variable
const petArr = JSON.parse(getFromStorage("pets"));
const breedArr = JSON.parse(getFromStorage("breed"));
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const findBtn = document.getElementById("find-btn");

// functions
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

const findPet = function () {
  const str = "";
  const id = idInput.value;
  const name = nameInput.value;
  const vaccinated = vaccinatedInput.checked ? "true" : ""; // khi checked thì trả về true, ngược lại trả về ""
  const dewormed = dewormedInput.checked ? "true" : "";
  const sterilized = sterilizedInput.checked ? "true" : "";
  const type = typeInput.value === "Select Type" ? str : typeInput.value;
  const breed = breedInput.value === "Select Breed" ? str : breedInput.value;

  return petArr.filter(
    (arr) =>
      arr.id.match(`${id}`) &&
      arr.name.match(`${name}`) &&
      arr.type.match(`${type}`) &&
      arr.breed.match(`${breed}`) &&
      // ép dạng boolean sang string để so sánh Regex
      String(arr.vaccinated).match(`${vaccinated}`) &&
      String(arr.dewormed).match(`${dewormed}`) &&
      String(arr.sterilized).match(`${sterilized}`)
  );
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
          <td>${arr[i].date}</td>
          `;
    tbody.appendChild(row);
  }
};

// Event
findBtn.addEventListener("click", function () {
  findPet().length > 0 ? renderTableData(findPet()) : alert("No result found");
});

function init() {
  renderBreed("Select Type");
  renderTableData(petArr);
  // khi có sự kiện (event) lựa chọn ở Input_type thì sẽ thay đổi dữ liệu ở Input breed
  typeInput.onchange = function () {
    renderBreed(typeInput.value);
  };
}

init();
