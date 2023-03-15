const deleteForm = document.getElementById('deleteForm');
const delete_id = document.getElementById('delete_id');
const delete_firstname = document.getElementById('delete_firstName');
const delete_lastname = document.getElementById('delete_lastName');
const delete_age = document.getElementById('delete_age');
const delete_email = document.getElementById('delete_email');
const delete_password = document.getElementById('delete_password');

async function deleteModal(id) {
    const urlDelete = 'http://localhost:8080/api/v1/admin/' + id;
    let modalDelete = await fetch(urlDelete);
    if (modalDelete.ok) {
        let userData =
            await modalDelete.json().then(user => {
                delete_id.value = `${user.id}`;
                delete_firstname.value = `${user.firstName}`;
                delete_lastname.value = `${user.lastName}`;
                delete_age.value = `${user.age}`;
                delete_email.value = `${user.email}`;
            })
    } else {
        alert(`Error, ${modalDelete.status}`)
    }
}

async function deleteUser() {
    deleteForm.addEventListener('submit', deletingUser);

    function deletingUser(event) {
        event.preventDefault();
        let urlDeleting = '/api/v1/admin/' + delete_id.value;
        let method = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        }

        fetch(urlDeleting, method).then(() => {
            $('#deleteForm_closeButton').click();
            getAdmin();
        });
    }
}
