document.addEventListener('DOMContentLoaded', () => {
    let usersData = [];
    let currentSortColumn = 'id';
    let sortAscending = true;

    const tableBody = document.getElementById('table-body');
    const searchInput = document.getElementById('search-input');
    const totalUsersEl = document.getElementById('total-users');
    const activeUsersEl = document.getElementById('active-users');

    // Fetch JSON data
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            usersData = data;
            updateDashboard(usersData);
        })
        .catch(error => console.error('Error fetching data:', error));

    function updateDashboard(data) {
        renderTable(data);
        updateStats(data);
    }

    function renderTable(data) {
        tableBody.innerHTML = '';
        data.forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.role}</td>
                <td>
                    <span style="color: ${user.status === 'Active' ? '#4ade80' : '#f87171'}">
                        ${user.status}
                    </span>
                </td>
                <td>${user.lastLogin}</td>
            `;
            tableBody.appendChild(tr);
        });
    }

    function updateStats(data) {
        totalUsersEl.textContent = data.length;
        const activeCount = data.filter(u => u.status === 'Active').length;
        activeUsersEl.textContent = activeCount;
    }

    // Interactive Search Filtering
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filteredData = usersData.filter(user => 
            user.name.toLowerCase().includes(query) || 
            user.role.toLowerCase().includes(query)
        );
        renderTable(filteredData);
    });

    // Sorting functionality via Table Headers
    const sortButtons = document.querySelectorAll('th button');
    sortButtons.forEach(button => {
        button.addEventListener('click', () => {
            const sortKey = button.getAttribute('data-sort');
            
            if (currentSortColumn === sortKey) {
                sortAscending = !sortAscending;
            } else {
                currentSortColumn = sortKey;
                sortAscending = true;
            }

            const sortedData = [...usersData].sort((a, b) => {
                let valA = a[sortKey];
                let valB = b[sortKey];

                if (typeof valA === 'string') valA = valA.toLowerCase();
                if (typeof valB === 'string') valB = valB.toLowerCase();

                if (valA < valB) return sortAscending ? -1 : 1;
                if (valA > valB) return sortAscending ? 1 : -1;
                return 0;
            });

            searchInput.value = '';
            renderTable(sortedData);
        });
    });
});
