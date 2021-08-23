let rowsNumber = 20;
let columnsNumber = 15;

const table = document.querySelector("#table");
table.innerHTML = "<thead></thead><tbody></tbody>";
const useParamsButton = document.querySelector(".button_use_params");
const searchForm = document.querySelector(".search_input");
const showAllBtn = document.querySelector(".button_show_all");

const drawTable = (rowsNumber, columnsNumber) => {
  const thead = table.querySelector("thead");
  const tbody = table.querySelector("tbody");

  thead.innerHTML = '<tr id="row_0" class="row"></tr>';

  let allRows = "";
  for (let i = 1; i <= rowsNumber; i++) {
    allRows += `<tr id="row_${i}" class="row"></tr>`;
  }
  tbody.innerHTML = allRows;

  const tr = document.querySelectorAll("tr");

  let allCellHeaders = "";
  for (let i = 0; i <= columnsNumber; i++) {
    allCellHeaders += `<th contenteditable id="header_${
      i + 1
    }" class="cell_header"></th>`;
  }
  tr[0].innerHTML = allCellHeaders;

  let allCells = "";
  for (let i = 0; i <= columnsNumber; i++) {
    allCells += `<td contenteditable id="cell_${i + 1}" class="cell"></td>`;
  }

  for (let i = 1; i < tr.length; i++) {
    tr[i].innerHTML = allCells;
  }

  const cell_1 = table.querySelectorAll("#cell_1");

  for (let i = 1; i < tr.length; i++) {
    cell_1[i - 1].innerText = i;
    cell_1[i - 1].setAttribute("contenteditable", "false");
  }
};

drawTable(rowsNumber, columnsNumber);

useParamsButton.addEventListener("click", () => {
  const userRowsNumber = document.querySelector(".controls_input_rows").value;
  const userColumnsNumber = document.querySelector(
    ".controls_input_columns"
  ).value;
  rowsNumber = +userRowsNumber;
  columnsNumber = +userColumnsNumber;
  drawTable(rowsNumber, columnsNumber);
});

searchForm.addEventListener("input", (e) => {
  const searchValue = e.target.value.toLowerCase();
  const tbody = document.querySelector("tbody");
  const thead = document.querySelector("thead");
  const th = thead.querySelectorAll("th");

  let obj = [];

  for (let i = 0; i < tbody.children.length; i++) {
    obj[i] = {};
    for (let j = 0; j < tbody.children[i].children.length; j++) {
      const fields = th[j].id;
      obj[i][fields] = tbody.children[i].children[j].innerText.toLowerCase();
    }
  }

  obj.forEach((x, i) => {
    for (let text in x) {
      if (x[text].includes(searchValue)) {
        tbody.children[i].classList.remove("hidden");
        return true;
      } else {
        tbody.children[i].classList.add("hidden");
      }
    }
  });
});

const cells = table.querySelectorAll(".cell");

showAllBtn.addEventListener("click", function () {
  for (let cell of cells) {
    let row = cell.closest(".row");
    row.classList.remove("hidden");
  }
  searchForm.value = "";
});

const thead = document.querySelector("thead");
let colIndex = -1;

const sortRows = (index, isSorted) => {
  const tbody = table.querySelector("tbody");
  console.log("внутри");
  const compare = (rowA, rowB) => {
    const rowDataA = rowA.cells[index].innerHTML.toLowerCase();
    const rowDataB = rowB.cells[index].innerHTML.toLowerCase();
    if (+rowDataA + +rowDataB || +rowDataA + +rowDataB === 0) {
      console.log("в условии");
      return +rowDataA - +rowDataB;
    } else {
      if (rowDataA < rowDataB) {
        return -1;
      } else if (rowDataA > rowDataB) {
        return 1;
      } else {
        return 0;
      }
    }
  };

  let rowsArray = [].slice.call(tbody.rows);

  rowsArray.sort(compare);

  if (isSorted) {
    rowsArray.reverse();
  }

  table.removeChild(tbody);

  for (let i = 0; i < rowsArray.length; i++) {
    tbody.appendChild(rowsArray[i]);
  }

  table.appendChild(tbody);
};

thead.addEventListener("dblclick", (e) => {
  if (e.target.tagName !== "TH") return;
  console.log("зашла");
  const index = e.target.cellIndex;

  sortRows(index, colIndex === index);

  if (colIndex === index) {
    colIndex = -1;
  } else {
    colIndex = index;
  }
});
