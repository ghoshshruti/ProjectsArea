// API Fetching functionality
document.addEventListener('DOMContentLoaded', function() {
    const fetchUsersBtn = document.getElementById('fetchUsersBtn');
    const reloadUsersBtn = document.getElementById('reloadUsersBtn');
    const usersContainer = document.getElementById('usersContainer');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const errorMessage = document.getElementById('errorMessage');
    
    // Fetch users from API
    function fetchUsers() {
        // Show loading indicator
        loadingIndicator.style.display = 'flex';
        usersContainer.innerHTML = '';
        errorMessage.style.display = 'none';
        
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(users => {
                displayUsers(users);
            })
            .catch(error => {
                showError(error.message);
            })
            .finally(() => {
                loadingIndicator.style.display = 'none';
            });
    }
    
    // Display users in the DOM
    function displayUsers(users) {
        usersContainer.innerHTML = '';
        
        if (users.length === 0) {
            showError('No users found');
            return;
        }
        
        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'user-card';
            
            userCard.innerHTML = `
                <h3>${user.name}</h3>
                <p><span class="label">Email:</span> ${user.email}</p>
                <p><span class="label">Phone:</span> ${user.phone}</p>
                <p><span class="label">Company:</span> ${user.company.name}</p>
                <p><span class="label">Address:</span> 
                    ${user.address.street}, ${user.address.suite}<br>
                    ${user.address.city}, ${user.address.zipcode}
                </p>
                <p><span class="label">Website:</span> 
                    <a href="http://${user.website}" target="_blank">${user.website}</a>
                </p>
            `;
            
            usersContainer.appendChild(userCard);
        });
    }
    
    // Show error message
    function showError(message) {
        errorMessage.textContent = `Error: ${message}. Please try again later.`;
        errorMessage.style.display = 'block';
    }
    
    // Event listeners
    fetchUsersBtn.addEventListener('click', fetchUsers);
    reloadUsersBtn.addEventListener('click', fetchUsers);
    
    // Optional: Fetch users automatically when page loads
    // fetchUsers();
});