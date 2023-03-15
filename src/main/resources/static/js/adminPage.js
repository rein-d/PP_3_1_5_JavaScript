const adminUrl = 'http://localhost:8080/api/v1/admin'

async function getAdmin() {
    let response = await fetch(adminUrl);

    if (response.ok) {
        let listUsers = await response.json();
        getAllUsers(listUsers);
    } else {


        alert("Error: " + response.status);
    }
}

function getAllUsers(listUsers) {
    const tbody = document.getElementById('adminTable');

    let tr = '';
    for (let user of listUsers) {
        let roles = [];
        for (let role of user.roles) {
            roles.push(' ' + role.name.toString().replaceAll('ROLE_', ''));
        }
        tr += `<tr>
        <td>${user.id}</td>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.age}</td>
        <td>${user.email}</td>
        <td>${roles}</td>
        <td>
            <button class="btn btn-secondary" data-bs-toggle="modal" 
            data-bs-target="#modal_edit"
            onclick="editModal(${user.id})">Edit</button>
        </td>
        <td>
            <button class="btn btn-danger" data-bs-toggle="modal" 
            data-bs-target="#modal_delete"
            onclick="deleteModal(${user.id})">Delete</button>
        </td>
    </tr>`
    }
    tbody.innerHTML = tr;
}

getAdmin();