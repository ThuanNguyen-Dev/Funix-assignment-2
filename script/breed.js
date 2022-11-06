"use strict";

// Declare variable
const breedArr = JSON.parse(getFromStorage("breed"));
const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const submitBtn = document.getElementById("submit-btn");

// check validate
const validate = function () {
  if (breedInput.value === "") {
    alert("Please enter a breed");
    return false;
  }
  if (typeInput.value === "") {
    alert("Please enter a type");
    return false;
  }

  for (let breed in breedArr) {
    if (
      (breedArr[breed].breed === breedInput.value) &
      (breedArr[breed].type === typeInput.value)
    ) {
      alert("Breed must unique!");
      return false;
    }
  }
  return true;
};

// xuất dữ liệu ra bảng
const renderBreedTable = function (arr) {
  const tableBodyEl = document.getElementById("tbody");
  tableBodyEl.innerHTML = "";
  // duyệt qua từng phần tử trong mảng để xuất ra màn hình
  for (let i = 0; i < arr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${i + 1}</td>
            <td>${arr[i].breed}</td>
            <td>${arr[i].type}</td>
            <td><button type="button" class="btn btn-danger" onclick="deleteBreed('${
              arr[i].breed
            }')">Delete</button></td>
        `;
    tbody.appendChild(row);
  }
};

// delete breed
const deleteBreed = function (breed) {
  if (confirm("Are you sure?")) {
    // remove item in array - link:https://stackoverflow.com/a/5767335
    for (let i = 0; i < breedArr.length; i++) {
      // nếu breed trong mảng bằng giá trị breed muốn xóa thì thực hiện xóa
      if (breedArr[i].breed === breed) {
        breedArr.splice(i, 1);
        saveToStorage("breed", JSON.stringify(breedArr));
      }
    }
    renderBreedTable(breedArr);
  }
};

// add breed
submitBtn.addEventListener("click", function () {
  if (validate()) {
    const breed = {
      breed: breedInput.value.trim(),
      type: typeInput.value.trim(),
    };
    breedArr.push(breed);
    saveToStorage("breed", JSON.stringify(breedArr)); // lưu vào local Storage
    renderBreedTable(breedArr);
  }
});

// Kiểm tra: nếu local Storage (breedArr) có số lượng phần tử > 0 thì xuất ra màn hình
if (breedArr.length > 0) {
  renderBreedTable(breedArr);
}
