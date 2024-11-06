let selectedDepartments = [];
let totalCost = 0;
let unitsToProduce = 0;
let currentDepartmentIndex = 0;

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

    unitsToProduce = parseInt(document.getElementById('unitsToProduce').value) || 0;

    if (selectedDepartments.length === 0) {
        alert("Por favor, selecciona al menos un departamento.");
        return;
    }

    closeModal('departmentsModal');
    currentDepartmentIndex = 0; // Reiniciar índice
    openDepartmentDetailsModal(); // Llamada inicial al modal de detalles
}

function openDepartmentDetailsModal() {
    if (currentDepartmentIndex < selectedDepartments.length) {
        // Cambiar el título del modal con el nombre del departamento actual
        document.querySelector('#departmentDetailsModal .modal-content h2').innerText = 
            `Detalles del Departamento: ${selectedDepartments[currentDepartmentIndex]}`;
        
        clearDepartmentDetailsInputs(); // Limpiar los inputs cada vez que se abra el modal de detalles
        document.getElementById('departmentDetailsModal').classList.add('show');
    } else {
        // Cálculo final del costo unitario
        let unitCost = unitsToProduce > 0 ? (totalCost / unitsToProduce).toFixed(2) : 0;
        document.getElementById('total-cost').innerText = `$${totalCost}`;
        document.getElementById('units-to-produce').innerText = unitsToProduce;
        document.getElementById('unit-cost').innerText = `$${unitCost}`;
        alert("Todos los departamentos completados.");
    }
}

function saveDepartmentDetails() {
    // Captura el costo de fabricación ingresado para cada departamento
    let fabricationCost = parseFloat(document.getElementById('fabricationCost').value) || 0;
    totalCost += fabricationCost;

    // Cierra el modal actual y pasa al siguiente departamento
    closeModal('departmentDetailsModal');
    currentDepartmentIndex++;
    openDepartmentDetailsModal();
}

function clearDepartmentDetailsInputs() {
    // Limpiar los inputs de empleados y costo de fabricación
    document.getElementById('employees').value = '';
    document.getElementById('fabricationCost').value = '';
}

function clearDepartmentsModalInputs() {
    // Deseleccionar todos los checkboxes
    document.querySelectorAll('#departmentsModal input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });

    // Limpiar los campos de texto y numéricos en el modal de departamentos
    document.getElementById('indirectCost').value = '';
    document.getElementById('unitsToProduce').value = '';
}
