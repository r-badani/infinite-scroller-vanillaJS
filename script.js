let loading;
let filterBox;
let usersContainer;
let pageSize = 10;
let page = 1;
const api = `https://jsonplaceholder.typicode.com/users`;

async function fetchUser(currentPage, limit) {
  const response = await fetch(
    `${api}?_limit=${limit}&_pages=${currentPage}`
  );
  return await response.json();
}

async function showUsers(currentPage = page, limit = pageSize) {
  const users = await fetchUser(currentPage, limit);
  users.forEach(user => {
    const userEl = document.createElement('div');
    userEl.classList.add('user-container');
    userEl.innerHTML = `
      <div class="user-bio">
        <span class="user-name">
          ${user.name}
        </span>
        <span class="user-site">
          <a a href="http://${user.website}" target="_blank"> ${user.website}</a>
        </span>
      </div>
      <div class="user-address">
        <span class="user-company">
          ${user.company.name}
        </span>
        <span class="user-location">
          ${user.address.suite}
          <span class="spacer-dot"></span>
          ${user.address.city}
          <span class="spacer-dot"></span>
          ${user.address.zipcode}
        </span>
      </div>
    `;
    usersContainer.appendChild(userEl);
  })
}

function toggleLoader() {
  loading.classList.toggle('show')
}

function filterUsers(event) {
  const searchText = event.target.value.toUpperCase();
  const allUsers = document.querySelectorAll('.user-container')
  allUsers.forEach(eachUser => {
    const name = eachUser.querySelector('.user-name').innerHTML.toUpperCase();
    if (name.includes(searchText)) {
      eachUser.style.display = 'flex';
    } else {
      eachUser.style.display = 'none';
    }
  })
}
document.addEventListener('scroll', () => {
  const {
    scrollTop,
    scrollHeight,
    clientHeight
  } = document.documentElement;

  if (scrollTop + clientHeight > scrollHeight - 5) {
    toggleLoader();
    setTimeout(() => {
      toggleLoader();
      showUsers(page++);
    }, 1000);
  }
})
document.addEventListener('DOMContentLoaded', () => {
  loading = document.querySelector('.loader');
  usersContainer = document.querySelector('.users-container');
  filterBox = document.querySelector('input[type=text]');
  filterBox.addEventListener('input', filterUsers);
  showUsers();
});