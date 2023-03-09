const adminUrl = 'http://localhost:8080/api/v1/admin'
const editForm = document.getElementById('editForm');
const edit_id = document.getElementById('edit_id');
const edit_username = document.getElementById('edit_username');
const edit_age = document.getElementById('edit_age');
const edit_roles = document.getElementById('edit_roles')
const edit_email = document.getElementById('edit_email');
const edit_password = document.getElementById('edit_password');

const form_addUser = document.getElementById('addUser');
const role_new = document.querySelector('#select_roles').selectedOptions;

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
    const tbody = document.getElementById('myTable');

    let tr = '';
    for (let user of listUsers) {
        let roles = [];
        for (let role of user.roles) {
            roles.push(' ' + role.role.toString().replaceAll('ROLE_', ''));
        }
        tr += `<tr>
        <td>${user.id}</td>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.age}</td>
        <td>${user.email}</td>
        <td>${roles}</td>
        <td>
            <button class="btn btn-info" style="color:white" data-bs-toggle="modal" 
            data-bs-target="#modal_edit"
            onclick="editModal(${user.id})">Edit</button>
        </td>
        <td>
            <button class="btn btn-danger" style="color:white" data-bs-toggle="modal" 
            data-bs-target="#modal_delete"
            onclick="deleteModal(${user.id})">Delete</button>
        </td>
    </tr>`
    }
    tbody.innerHTML = tr;
}

getAdmin();

async function createNewUser(event) {
    event.preventDefault();
    let roles = [];
    for (let i = 0; i < role_new.length; i++) {
        roles.push("ROLE_" + role_new[i].value);
    }
    let method = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: form_addUser.username.value,
            age: form_addUser.age.value,
            email: form_addUser.email.value,
            password: form_addUser.password.value,
            roles: roles
        })
    }
    await fetch(urlNewUser, method).then(() => {
        form_addUser.reset();
        getAdmin();
        $("#nav-home-tab").click();
    });
}


// <tr th:each="user: ${users}">
//     <td th:text="${user.getId()}"/>
//     <td th:text="${user.getFirstName()}"/>
//     <td th:text="${user.getLastName()}"/>
//     <td th:text="${user.getAge()}"/>
//     <td th:text="${user.getEmail()}"/>
//     <td th:text="${user.getRolesToString()}"/>
//     <td>
//         <button type="button" className="btn btn-secondary"
//                 data-bs-toggle="modal" th:data-bs-target="'#edit' + ${user.getId()}">
//             Edit
//         </button>
//
//         <div className="modal fade" th:id="'edit' + ${user.getId()}" tabIndex="-1"
//              aria-labelledby="exampleModalLabel" aria-hidden="true">
//             <div className="modal-dialog">
//                 <div className="modal-content">
//                     <div className="modal-header">
//                         <h1 className="modal-title fs-5">Edit user</h1>
//                         <button type="button" className="btn-close" data-bs-dismiss="modal"
//                                 aria-label="Close"></button>
//                     </div>
//                     <div className="modal-body">
//                         <div className="row bg-white justify-content-center">
//                             <div className="col-6 p-2">
//                                 <form className="text-center"
//                                       th:action="@{/admin/edit/{id} (id=${user.getId()})}"
//                                       th:object="${user}" method="POST">
//                                     <div className="mb-3">
//                                         <label className="form-label"><strong>
//                                             ID </strong></label>
//                                         <input
//                                             type="text"
//                                             name="id"
//                                             className="form-control"
//                                             th:value="*{id}"
//                                             disabled
//                                         />
//                                     </div>
//
//                                     <div className="mb-3">
//                                         <label className="form-label"><strong>
//                                             First Name </strong></label>
//                                         <input
//                                             type="text"
//                                             name="firstName"
//                                             className="form-control"
//                                             th:value="*{firstName}"
//                                             placeholder="Enter First Name"
//                                         />
//                                     </div>
//
//                                     <div className="mb-3">
//                                         <label className="form-label"><strong>
//                                             Last Name </strong></label>
//                                         <input
//                                             type="text"
//                                             name="lastName"
//                                             className="form-control"
//                                             th:value="*{lastName}"
//                                             placeholder="Enter Last Name"
//                                         />
//                                     </div>
//
//                                     <div className="mb-3">
//                                         <label className="form-label"><strong>
//                                             Age </strong></label>
//                                         <input
//                                             type="number"
//                                             name="age"
//                                             className="form-control"
//                                             th:value="*{age}"
//                                             placeholder="Enter Age"
//                                         />
//                                     </div>
//
//                                     <div className="mb-3">
//                                         <label className="form-label"><strong>
//                                             Email </strong></label>
//                                         <input
//                                             type="email"
//                                             name="email"
//                                             className="form-control"
//                                             th:value="*{email}"
//                                             placeholder="Enter Email"
//                                         />
//                                     </div>
//
//                                     <div className="mb-3">
//                                         <label className="form-label"><strong>
//                                             Password </strong></label>
//                                         <input
//                                             type="password"
//                                             name="password"
//                                             className="form-control"
//                                             th:value="*{password}"
//                                             placeholder="Enter Password"
//                                         />
//                                     </div>
//
//                                     <div className="mb-3">
//                                         <label htmlFor="roles" className="form-label"><strong>
//                                             Roles:</strong>
//                                             <select multiple className="form-control"
//                                                     name="roles"
//                                                     th:size="${allRoles.size()}"
//                                                     required>
//                                                 <option th:each="role:${allRoles}"
//                                                         th:value="${role.getName()}">
//                                                     <th:block
//                                                         th:text="${role.getName()}">
//                                                     </th:block>
//                                                 </option>
//                                             </select>
//                                         </label>
//                                     </div>
//                                     <div className="modal-footer">
//                                         <button type="button" className="btn btn-secondary"
//                                                 data-bs-dismiss="modal">Close
//                                         </button>
//                                         <button type="submit" className="btn btn-primary">
//                                             Edit
//                                         </button>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </td>
//     <td>
//         <button type="button" className="btn btn-danger" data-bs-toggle="modal"
//                 th:data-bs-target="'#delete' + ${user.getId()}">
//             Delete
//         </button>
//
//         <div className="modal fade" th:id="'delete' + ${user.getId()}" tabIndex="-1"
//              aria-labelledby="exampleModalLabel" aria-hidden="true">
//             <div className="modal-dialog">
//                 <div className="modal-content">
//                     <div className="modal-header">
//                         <h1 className="modal-title fs-5">Edit user</h1>
//                         <button type="button" className="btn-close" data-bs-dismiss="modal"
//                                 aria-label="Close"></button>
//                     </div>
//                     <div className="modal-body">
//                         <div className="row bg-white justify-content-center">
//                             <div className="col-6 p-2">
//                                 <form className="text-center"
//                                       th:action="@{/admin/delete/{id} (id=${user.getId()})}"
//                                       th:object="${user}" method="GET">
//                                     <div className="mb-3">
//                                         <label className="form-label"><strong>
//                                             ID </strong></label>
//                                         <input
//                                             type="text"
//                                             name="id"
//                                             className="form-control"
//                                             th:value="*{id}"
//                                             disabled
//                                         />
//                                     </div>
//
//                                     <div className="mb-3">
//                                         <label className="form-label"><strong>
//                                             First Name </strong></label>
//                                         <input
//                                             type="text"
//                                             name="firstName"
//                                             className="form-control"
//                                             th:value="*{firstName}"
//                                             placeholder="Enter First Name"
//                                             disabled
//                                         />
//                                     </div>
//
//                                     <div className="mb-3">
//                                         <label className="form-label"><strong>
//                                             Last Name </strong></label>
//                                         <input
//                                             type="text"
//                                             name="lastName"
//                                             className="form-control"
//                                             th:value="*{lastName}"
//                                             placeholder="Enter Last Name"
//                                             disabled
//                                         />
//                                     </div>
//
//                                     <div className="mb-3">
//                                         <label className="form-label"><strong>
//                                             Age </strong></label>
//                                         <input
//                                             type="number"
//                                             name="age"
//                                             className="form-control"
//                                             th:value="*{age}"
//                                             placeholder="Enter Age"
//                                             disabled
//                                         />
//                                     </div>
//
//                                     <div className="mb-3">
//                                         <label className="form-label"><strong>
//                                             Email </strong></label>
//                                         <input
//                                             type="email"
//                                             name="email"
//                                             className="form-control"
//                                             th:value="*{email}"
//                                             placeholder="Enter Email"
//                                             disabled
//                                         />
//                                     </div>
//
//                                     <div className="mb-3">
//                                         <label htmlFor="roles" className="form-label"><strong>
//                                             Roles:</strong>
//                                             <select multiple className="form-control"
//                                                     name="roles"
//                                                     th:size="${allRoles.size()}"
//                                                     disabled>
//                                                 <option th:each="role:${allRoles}"
//                                                         th:value="${role.getName()}">
//                                                     <th:block
//                                                         th:text="${role.getName()}">
//                                                     </th:block>
//                                                 </option>
//                                             </select>
//                                         </label>
//                                     </div>
//                                     <div className="modal-footer">
//                                         <button type="button" className="btn btn-"
//                                                 data-bs-dismiss="modal">Close
//                                         </button>
//                                         <button type="submit" className="btn btn-danger">
//                                             Delete
//                                         </button>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </td>
// </tr>