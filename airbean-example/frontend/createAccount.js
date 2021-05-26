const usernameElem = document.querySelector('#username');
const passwordElem = document.querySelector('#password');
const buttonElem = document.querySelector('button');

async function createAccount(account) {
  const response = await fetch('http://localhost:8000/api/auth/create', {
    method: 'POST',
    body: JSON.stringify(account),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  return data.success;
}

buttonElem.addEventListener('click', () => {
  const account = {
    username: usernameElem.value,
    password: passwordElem.value
  }

  const createdAccount = createAccount(account);

  if (createdAccount) {
    location.href = 'http://localhost:8000/';
  }
});