let employees = [
    { id: "EMP001", name: "Arjun Raman", dept: "Marketing", email: "arjun@company.com" },
    { id: "EMP002", name: "Meera Iyer", dept: "Finance", email: "meera@company.com" },
    { id: "EMP003", name: "Karthik Subramani", dept: "Operations", email: "karthik@company.com" },
    { id: "EMP004", name: "Sneha Menon", dept: "Human Resources", email: "sneha@company.com" },
    { id: "EMP005", name: "Rohit Verma", dept: "Sales", email: "rohit@company.com" },
    { id: "EMP006", name: "Ananya Das", dept: "Strategy", email: "ananya@company.com" }
];

let editIndex = -1;
let viewIndex = -1;

function openAdd() {
    editIndex = -1;
    modalTitle.innerText = "Add Employee";
    clearFields();
    modal.style.display = "flex";
}

function closeModal() {
    modal.style.display = "none";
}

function closeView() {
    viewModal.style.display = "none";
}

function clearFields() {
    empId.value = "";
    empName.value = "";
    empDept.value = "";
    empEmail.value = "";
}

function saveEmployee() {
    const emp = {
        id: empId.value.trim(),
        name: empName.value.trim(),
        dept: empDept.value.trim(),
        email: empEmail.value.trim()
    };

    if (!emp.id || !emp.name || !emp.dept || !emp.email) {
        alert("Please fill all fields");
        return;
    }

    if (editIndex === -1) {
        employees.push(emp);
    } else {
        employees[editIndex] = emp;
    }

    renderUI();
    closeModal();
}

function renderUI() {
    const tbody = document.querySelector("#employeeTable tbody");
    const grid = document.getElementById("employeeGrid");

    tbody.innerHTML = "";
    grid.innerHTML = "";

    employees.forEach((emp, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${emp.id}</td>
                <td>${emp.name}</td>
                <td>${emp.dept}</td>
                <td>${emp.email}</td>
                <td>
                    <button class="btn edit" onclick="editEmployee(${index})">Edit</button>
                    <button class="btn delete" onclick="deleteEmployee(${index})">Delete</button>
                </td>
            </tr>
        `;

        grid.innerHTML += `
            <div class="card" onclick="viewEmployee(${index})">
                <h3>${emp.name}</h3>
                <p>${emp.dept}</p>
            </div>
        `;
    });
}

function viewEmployee(index) {
    viewIndex = index;
    const emp = employees[index];

    vId.innerText = emp.id;
    vName.innerText = emp.name;
    vDept.innerText = emp.dept;
    vEmail.innerText = emp.email;

    viewModal.style.display = "flex";
}

function editFromView() {
    closeView();
    editEmployee(viewIndex);
}

function deleteFromView() {
    closeView();
    deleteEmployee(viewIndex);
}

function editEmployee(index) {
    editIndex = index;
    const emp = employees[index];

    empId.value = emp.id;
    empName.value = emp.name;
    empDept.value = emp.dept;
    empEmail.value = emp.email;

    modalTitle.innerText = "Edit Employee";
    modal.style.display = "flex";
}

function deleteEmployee(index) {
    if (confirm("Are you sure you want to delete this employee?")) {
        employees.splice(index, 1);
        renderUI();
    }
}

renderUI();
