function addEmployee(employee) {
    const dataContainer = document.querySelector('.data-container');
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('id', employee._id);
    card.innerHTML =
        `
        <img src="assests/close.svg" alt="close" class="icon-close">
        <h1>${employee.name}</h1>
        <div class="employee-information">
            <div class="row-container">
                <img src="assests/wallet.svg" alt="salary">
                <span>Salary: ${employee.salary}</span>
            </div>
            <div class="row-container">
                <img src="assests/laptop.svg" alt="language">
                <span>Programming Language: ${employee.language}</span>
            </div>
            <div class="row-container">
                <img src="assests/location.svg" alt="location">
                <span>City: ${employee.city}</span>
            </div>
            <div class="row-container">
                <img src="assests/profession.svg" alt="profession">
                <span>Designation: ${employee.isManager ? 'Manager' : 'Worker'}</span>
            </div>
        </div>
    `;

    // adding event listener to the card
    card.querySelector('.icon-close').addEventListener("click", function (e) {
        const cardElement = e.currentTarget.closest('.card');
        const cardId = cardElement.getAttribute('id');
        fetch(`http://localhost:8000/api/v1/employees/delete/${cardId}`, { method: "DELETE" })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                cardElement.remove();
            })
            .catch((err) => {
                console.error('Error deleting data:', err);
            })
    });

    dataContainer.appendChild(card);
}

// display previous data
fetch("http://localhost:8000/api/v1/employees/")
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const employees = data.data;
        const dataContainer = document.querySelector('.data-container');
        employees.forEach((employee) => {
            addEmployee(employee);
        })
    })
    .catch(err => {
        console.error('Error fetching data:', err);
    })

// add event listener to button
document.querySelector('.btn-add-data').addEventListener("click", () => {
    fetch("http://localhost:8000/api/v1/employees/add")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const employee = data.data;
            addEmployee(employee);
        })
        .catch(err => {
            console.error('Error fetching data:', err);
        })
})

document.querySelector('.btn-dlt-data').addEventListener("click", () => {
    fetch("http://localhost:8000/api/v1/employees/deleteAll", { method: "DELETE" })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const dataContainer = document.querySelector('.data-container');
            dataContainer.innerHTML = '';
        })
        .catch((err) => {
            console.error('Error deleting data:', err);
        })
})