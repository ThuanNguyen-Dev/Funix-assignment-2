"use strict";

// Declare variable
const petArr = JSON.parse(getFromStorage("pets"));
const form = document.querySelector("form");
const file = document.getElementById("input-file");
const importBtn = document.getElementById("import-btn");
const exportBtn = document.getElementById("export-btn");

importBtn.addEventListener("click", function (e) {
  // nếu tìm thấy file thì length lớn hơn 0 và ngược lại
  if (file.files.length > 0) {
    e.preventDefault(); // ref: https://gomakethings.com/how-to-upload-and-process-a-json-file-with-vanilla-js/
    let fileReader = new FileReader();
    fileReader.onload = function (event) {
      let data = JSON.parse(fileReader.result);
      localStorage.setItem("pets", JSON.stringify(data));
      window.location.reload();
    };
    fileReader.readAsText(file.files[0]);
  } else {
    alert("Please select a file");
  }
});

exportBtn.addEventListener("click", function (e) {
  let dataStr = JSON.stringify(petArr);
  var blob = new Blob([dataStr], {
    type: "text/plain;charset=utf-8",
  });
  saveAs(blob, "data-pets.json");
});

// * ref: https://stackoverflow.com/a/30800715
// exportBtn.addEventListener("click", function (e) {
//   e.preventDefault();
//   var dataStr =
//     "data:text/json;charset=utf-8," +
//     encodeURIComponent(JSON.stringify(petArr));
//   console.log(dataStr);
//   var downloadAnchorNode = document.createElement("a");
//   downloadAnchorNode.setAttribute("href", dataStr);
//   downloadAnchorNode.setAttribute("download", "data-pets.json");
//   exportBtn.appendChild(downloadAnchorNode); // required for firefox
//   downloadAnchorNode.click();
// });
