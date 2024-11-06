let selectedDepartments = [];
let totalCost = 0;
let indirectCost = 0;
let unitsToProduce = 0;
let currentDepartmentIndex = 0;
let nombreProyecto = ''; 

async function getEmpleados(codigoDepartamento) {
    let response = await fetch(`/obtenerempleados/${codigoDepartamento}`);
    let data = await response.json();
    return data;
}

function openDepartmentsModal() {
    clearDepartmentsModalInputs(); // Limpiar los inputs cada vez que se abra el modal de departamentos
    document.getElementById('departmentsModal').classList.add('show');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
    clearDepartmentDetailsInputs(); // Limpiar los inputs al cerrar cualquier modal de detalles
    if (modalId === 'departmentsModal') {
        clearDepartmentsModalInputs(); // Limpiar el modal de selección de departamentos al cerrarlo
    }
}

function nextModal() {
    // Obtener departamentos seleccionados y unidades a producir
    selectedDepartments = Array.from(document.querySelectorAll('#departmentsModal input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.value);

    nombreProyecto = document.getElementById('proyectName').value;
    indirectCost = parseFloat(document.getElementById('indirectCost').value) || 0;
    unitsToProduce = parseInt(document.getElementById('unitsToProduce').value) || 0;

    if (selectedDepartments.length === 0) {
        alert("Por favor, selecciona al menos un departamento.");
        return;
    }

    closeModal('departmentsModal');
    currentDepartmentIndex = 0; // Reiniciar índice
    openDepartmentDetailsModal(); // Llamada inicial al modal de detalles
}

async function openDepartmentDetailsModal() {
    if (currentDepartmentIndex < selectedDepartments.length) {
        // Cambiar el título del modal con el nombre del departamento actual
        document.querySelector('#departmentDetailsModal .modal-content h2').innerText =
            `Detalles del Departamento: ${selectedDepartments[currentDepartmentIndex]}`;
        const empleados = await getEmpleados(selectedDepartments[currentDepartmentIndex]);
        const empleadoInput = document.getElementById('empleado');
        empleadoInput.innerHTML = '';
        empleados.forEach(element => {
            empleadoInput.innerHTML += `
                <label> 
                <input type="checkbox" name="${element.nombreEmpleado}" value="${element.costo_real * 4}"> 
                ${element.nombreEmpleado} - Sueldo: ${element.costo_real * 4} - ${element.puestoEmpleado}
                </label>
            `;
        });
        document.getElementById('departmentDetailsModal').classList.add('show');
    } else {
        // Cálculo final del costo unitario
        let unitCost = unitsToProduce > 0 ? (totalCost / unitsToProduce).toFixed(2) : 0;
        const tbody = document.querySelector('tbody');
        tbody.innerHTML += `
            <tr>
                <td>${nombreProyecto}</td>
                <td>$${totalCost}</td>
                <td>${unitsToProduce}</td>
                <td>$${unitCost}</td>
            </tr>
        `;
        alert("Todos los departamentos completados.");
    }
}

function saveDepartmentDetails() {
    // Captura el costo de fabricación ingresado para cada departamento
    const empleadoInput = document.getElementById('empleado');
    const checkboxes = empleadoInput.querySelectorAll('input[type="checkbox"]:checked');

    // Creamos un array para almacenar los valores de los checkboxes seleccionados
    let valoresSeleccionados = [];

    // Recorremos los checkboxes y guardamos sus valores en el array
    checkboxes.forEach(checkbox => {
        valoresSeleccionados.push(checkbox.value);
        totalCost += parseFloat(checkbox.value)
    });

    let fabricationCost = parseFloat(document.getElementById('fabricationCost').value) || 0;
    totalCost += indirectCost*(fabricationCost/100);

    // Cierra el modal actual y pasa al siguiente departamento
    closeModal('departmentDetailsModal');
    currentDepartmentIndex++;
    openDepartmentDetailsModal();
}

function clearDepartmentDetailsInputs() {
    // Limpiar los inputs de empleados y costo de fabricación
    document.querySelectorAll('#departmentDetailsModal input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    document.getElementById('fabricationCost').value = '';
}

function clearDepartmentsModalInputs() {
    // Deseleccionar todos los checkboxes
    document.querySelectorAll('#departmentsModal input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    // Limpiar los campos de texto y numéricos en el modal de departamentos
    document.getElementById('indirectCost').value = '';
    document.getElementById('proyectName').value = '';
    document.getElementById('unitsToProduce').value = '';
}
