const userList = document.getElementById('user-list');
const loader = document.getElementById('loader');
const reloadBtn = document.getElementById('reloadBtn');

const fetchUsers = async () => {
  loader.classList.remove('hidden');
  userList.innerHTML = '';

  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const users = await res.json();

    users.forEach(user => {
      const card = document.createElement('div');
      card.className = 'user-card';
      card.innerHTML = `
        <h3>${user.name}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
      `;
      userList.appendChild(card);
    });

  } catch (err) {
    userList.innerHTML = `<p style="color:red;">⚠️ Failed to load users: ${err.message}</p>`;
  } finally {
    loader.classList.add('hidden');
  }
};

reloadBtn.addEventListener('click', fetchUsers);
window.addEventListener('load', fetchUsers);
