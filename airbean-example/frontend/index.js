const menuElem = document.querySelector('#menu');
const usernameElem = document.querySelector('#username');
const passwordElem = document.querySelector('#password');
const buttonElem = document.querySelector('button');
const orderElem = document.querySelector('#order');

function createMenuItem(menuItem) {
  const item = document.createElement('li');
  item.innerHTML = menuItem.title;

  return item;
}

function displayMenu(menuItems) {
  for(let i = 0; i < menuItems.length; i++) {
    const menuItem = createMenuItem(menuItems[i]);
    menuElem.append(menuItem);
  }
}

async function getMenu() {
  const response = await fetch('http://localhost:8000/api/coffee/menu');
  const data = await response.json();
  
  displayMenu(data.menu);
}

async function login(account) {
  const response = await fetch('http://localhost:8000/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(account),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  return data;
}

function saveToken(token) {
  return new Promise((resolve, reject) => {
    sessionStorage.setItem('auth', token);

    resolve('Done');
  })
}

function getToken() {
  return sessionStorage.getItem('auth');
}

async function postOrder() {
  const token = getToken();

  const order = {
    id: 1,
    title: "Bryggkaffe",
    desc: "Bryggd på månadens bönor.",
    price: 39
  }

  const response = await fetch('http://localhost:8000/api/coffee/order', {
    method: 'POST',
    body: JSON.stringify(order),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await response.json();
  return data;
}

orderElem.addEventListener('click', () => {
  postOrder();
})

buttonElem.addEventListener('click', async () => {
  const account = {
    username: usernameElem.value,
    password: passwordElem.value
  }

  const loginStatus = await login(account);

  if (loginStatus.success) {
    await saveToken(loginStatus.token);
  }
});

getMenu();