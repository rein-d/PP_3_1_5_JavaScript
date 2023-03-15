const editForm = document.getElementById('editForm');
const edit_id = document.getElementById('edit_id');
const edit_firstname = document.getElementById('edit_firstName');
const edit_lastname = document.getElementById('edit_lastName');
const edit_age = document.getElementById('edit_age');
const edit_roles = document.getElementById('edit_roles')
const edit_email = document.getElementById('edit_email');
const edit_password = document.getElementById('edit_password');
const edit_role_new = document.querySelector('#edit_roles').selectedOptions;

async function editModal(id) {
    const urlDataEdit = 'http://localhost:8080/api/v1/admin/' + id;
    let modalEdit = await fetch(urlDataEdit);
    if (modalEdit.ok) {
        let userData =
            await modalEdit.json().then(async user => {
                edit_id.value = `${user.id}`;
                edit_firstname.value = `${user.firstName}`;
                edit_lastname.value = `${user.lastName}`;
                edit_age.value = `${user.age}`;
                edit_email.value = `${user.email}`;
                edit_password.value = `${user.password}`;
                edit_roles.value = `${user.roles}`;
            })
    } else {
        alert(`Error, ${modalEdit.status}`)
    }
}

async function editUser() {
    let urlEdit = 'http://localhost:8080/api/v1/admin/' + edit_id.value;
    let roles = [];
    if (edit_role_new.length) {
        for (let i = 0; i < role_new.length; i++) {
            roles.push("ROLE_" + edit_role_new[i].value);
        }
    } else {
        roles.push("ROLE_USER");
    }

    let method = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            firstName: editForm.firstName.value,
            lastName: editForm.lastName.value,
            age: editForm.age.value,
            email: editForm.email.value,
            password: editForm.password.value,
            roles: roles
        })
    }

    await fetch(urlEdit, method).then(() => {
        $('#editFrom_closeButton').click();
        getAdmin();
    })
}