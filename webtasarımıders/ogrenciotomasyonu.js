class Student {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.id = Date.now();
  }
}

let students = [];

const addBtn = document.getElementById("addBtn");
const fetchBtn = document.getElementById("fetchBtn");
const toggleBtn = document.getElementById("toggleBtn");
const tableBody = document.getElementById("tableBody");

addBtn.addEventListener("click", () => {
  const nameInput = document.getElementById("inputName");
  const ageInput = document.getElementById("inputAge");

  if (nameInput.value.trim() && ageInput.value) {
    const newStudent = new Student(
      nameInput.value,
      parseInt(ageInput.value)
    );

    students.push(newStudent);
    clearForm();
    updateDisplay();
  }
});

const updateDisplay = () => {
  tableBody.innerHTML = "";

  students.forEach((student) => {

    const { name, age, id } = student;

    const status = age >= 18 ? "Yetişkin" : "Öğrenci";

    const row = `
      <tr>
        <td>${name.toUpperCase()}</td>
        <td>${status}</td>
        <td>
          <button onclick="removeStudent(${id})" style="color:#ef4444; background:none; padding:0;">Sil</button>
        </td>
      </tr>
    `;

    tableBody.innerHTML += row;
  });

  syncJSON();
};

window.removeStudent = (id) => {
  students = students.filter(s => s.id !== id);
  updateDisplay();
};

const fetchData = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const data = await response.json();

    const apiStudent = new Student(data.name, 22);
    students.push(apiStudent);
    updateDisplay();

  } catch (error) {
    console.error("Fetch error:", error);
  }
};

fetchBtn.addEventListener("click", fetchData);

const syncJSON = () => {
  document.getElementById("dataPreview").textContent =
    JSON.stringify(students, null, 2);
};

toggleBtn.addEventListener("click", () => {
  const panel = document.getElementById("dataPreview");

  panel.style.display =
    panel.style.display === "block" ? "none" : "block";
});

const clearForm = () => {
  document.getElementById("inputName").value = "";
  document.getElementById("inputAge").value = "";
};

console.log("System initialized. Version ES2026.");