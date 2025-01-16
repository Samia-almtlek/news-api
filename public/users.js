const userContainer = document.getElementById('user-container');

// Fetch and display all users
function fetchAllUsers() {
    fetch('/api/users')
        .then(response => response.json())
        .then(data => {
            userContainer.innerHTML = '';
            data.forEach(user => {
                const userDiv = document.createElement('div');
                userDiv.classList.add('user');
                userDiv.innerHTML = `
                    <h3>${user.name}</h3>
                    <p>Email: ${user.email}</p>
                    <div class="actions">
                        <button onclick="deleteUser('${user._id}')">Delete</button>
                        <button onclick="showEditForm('${user._id}', '${user.name}', '${user.email}')">Edit</button>
                    </div>
                    <form class="edit-form" id="edit-form-${user._id}" onsubmit="submitEditForm(event, '${user._id}')">
                        <input type="text" id="edit-name-${user._id}" value="${user.name}" required>
                        <input type="email" id="edit-email-${user._id}" value="${user.email}" required>
                        <button type="submit">Save Changes</button>
                        <button type="button" onclick="hideEditForm('${user._id}')">Cancel</button>
                    </form>
                `;
                userContainer.appendChild(userDiv);
            });
        })
        .catch(err => console.error(err));
}

// Show edit form
function showEditForm(id, name, email) {
    const form = document.getElementById(`edit-form-${id}`);
    form.style.display = 'block';
}

// Hide edit form
function hideEditForm(id) {
    const form = document.getElementById(`edit-form-${id}`);
    form.style.display = 'none';
}

// Submit edit form
function submitEditForm(event, id) {
    event.preventDefault();
    const name = document.getElementById(`edit-name-${id}`).value;
    const email = document.getElementById(`edit-email-${id}`).value;

    fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(error => {
                throw new Error(error.error);
            });
        }
        return response.json();
    })
        .then(data => {
            alert('User updated successfully!');
            fetchAllUsers();
        })
        .catch(err =>{
        console.error(err);
        alert(`Error: ${err.message}`);
        });
        }

// Add new user
document.getElementById('user-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(error => {
                throw new Error(error.error);
            });
        }
        return response.json();
    })
    .then(data => {
        alert('User added successfully!');
        fetchAllUsers(); 
    })
    .catch(err => {
        alert(`Error: ${err.message}`);
    });
});

// Delete user
function deleteUser(id) {
    fetch(`/api/users/${id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            fetchAllUsers();
        })
        .catch(err => console.error(err));
}

// Load all users on page load
fetchAllUsers();
