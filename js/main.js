let addStudentBtn = document.querySelector("#addStudent");
let updateStudentBtn = document.querySelector("#updateStudent");
let studentName = document.querySelector("#studentName");
let studentId = document.querySelector("#studentId");
let studentPhone = document.querySelector("#studentPhone");
let studentClass = document.querySelector("#studentClass");
let tableBody = document.querySelector("#tableBody");
let studentIndex = 0;

let allStudents = [];
if (localStorage.getItem("allStudents") != null) {
  allStudents = JSON.parse(localStorage.getItem("allStudents"));
  displayStudents();
}
// Empty Inputs Validation
function inputsValidation(element) {
  const elParent = element.parentElement;
  const msg = elParent.querySelector(".error");
  if (element.value == "") {
    msg.classList.remove("d-none");
    return false;
  }
  else{
    msg.classList.add("d-none");
    return true;
  }
}

// Add Students Function ()
function addStudent() {
  if(inputsValidation(studentName)&&inputsValidation(studentId)&&inputsValidation(studentPhone)&&inputsValidation(studentClass)){
    let student = {
      name: studentName.value,
      id: studentId.value,
      phone: studentPhone.value,
      class: studentClass.value,
    };
    allStudents.push(student);
    localStorage.setItem("allStudents", JSON.stringify(allStudents));
    clearInputs();
    displayStudents();
  } 
}

// Clear Inputs Function ()
function clearInputs() {
  studentName.value = "";
  studentId.value = "";
  studentPhone.value = "";
  studentClass.value = "";
}

// Display Studentss Function ()
function displayStudents() {
  let tBody = "";
  for (let i = 0; i < allStudents.length; i++) {
    tBody += `<tr>
              <td>${i + 1}</td>
              <td>${allStudents[i].name}</td>
              <td>${allStudents[i].id}</td>
              <td>${allStudents[i].phone}</td>
              <td>${allStudents[i].class}</td>
              <td class="position-relative"><i class=" fa-solid fa-trash text-danger fs-4"><button onclick="deleteStudent(${i})" class="deleteBtn btn bg-transparent position-absolute top-0 bottom-0 start-0 end-0  " ></button></i></td>
              <td class="position-relative"><i class="fa-solid fa-edit text-info fs-4">
              <button onclick="uploadData(${i})" class="btn bg-transparent position-absolute top-0 bottom-0 start-0 end-0  " ></button>
              </i></td>
            </tr>`;
  }
  tableBody.innerHTML = tBody;
}

// Delete Student Function ()
function deleteStudent(indx) {
  allStudents.splice(indx, 1);
  displayStudents();
  localStorage.setItem("allStudents", JSON.stringify(allStudents));
}

// Upload Data to Inputs Function()
function uploadData(idx) {
  studentIndex = idx;
  studentName.value = allStudents[idx].name;
  studentId.value = allStudents[idx].id;
  studentPhone.value = allStudents[idx].phone;
  studentClass.value = allStudents[idx].class;
  addStudentBtn.classList.add("d-none");
  updateStudentBtn.classList.replace("d-none", "d-inline-block");
}

// Update Student Function ()
function updateStudent() {
  if(inputsValidation(studentName)&&inputsValidation(studentId)&&inputsValidation(studentPhone)&&inputsValidation(studentClass)){
    let student = {
      name: studentName.value,
      id: studentId.value,
      phone: studentPhone.value,
      class: studentClass.value,
    };
    allStudents.splice(studentIndex, 1, student);
    localStorage.setItem("allStudents", JSON.stringify(allStudents));
    clearInputs();
    displayStudents();
    addStudentBtn.classList.remove("d-none");
    updateStudentBtn.classList.add("d-none");
  } 
}

// Seach Function ()
function search(term) {
  let filter = "";
  for (let i = 0; i < allStudents.length; i++) {
    if (
      allStudents[i].name.toLowerCase().includes(term.toLowerCase()) ||
      allStudents[i].id.toLowerCase().includes(term.toLowerCase())
    ) {
      filter += `<tr>
              <td>${i + 1}</td>
              <td>${allStudents[i].name}</td>
              <td>${allStudents[i].id}</td>
              <td>${allStudents[i].phone}</td>
              <td>${allStudents[i].class}</td>
              <td class="position-relative"><i class=" fa-solid fa-trash text-danger fs-4"><button onclick="deleteProduct(${i})" class="deleteBtn btn bg-transparent position-absolute top-0 bottom-0 start-0 end-0  " ></button></i></td>
              <td class="position-relative"><i class="fa-solid fa-edit text-primary fs-4">
              <button onclick="uploadData(${i})" class="btn bg-transparent position-absolute top-0 bottom-0 start-0 end-0  " ></button>
              </i></td>
            </tr>`;
    }
  }
  tableBody.innerHTML = filter;
}

// Filteration Function ()
function filteration(term) {
  if (term.toLowerCase() == "all") {
    displayStudents();
  } else {
    let filter = "";
    for (let i = 0; i < allStudents.length; i++) {
      if (allStudents[i].class.toLowerCase().includes(term.toLowerCase())) {
        filter += `<tr>
              <td>${i + 1}</td>
              <td>${allStudents[i].name}</td>
              <td>${allStudents[i].id}</td>
              <td>${allStudents[i].phone}</td>
              <td>${allStudents[i].class}</td>
              <td class="position-relative"><i class=" fa-solid fa-trash text-danger fs-4"><button onclick="deleteProduct(${i})" class="deleteBtn btn bg-transparent position-absolute top-0 bottom-0 start-0 end-0  " ></button></i></td>
              <td class="position-relative"><i class="fa-solid fa-edit text-primary fs-4">
              <button onclick="uploadData(${i})" class="btn bg-transparent position-absolute top-0 bottom-0 start-0 end-0  " ></button>
              </i></td>
            </tr>`;
      }
    }
    tableBody.innerHTML = filter;
  }
}
