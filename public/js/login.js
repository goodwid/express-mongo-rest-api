var form = document.getElementById('credentials').elements;
var error = document.getElementById('error');

function getCreds() {
  return {
    username: form.username.value,
    password: form.password.value
  };
}

function login(type) {
  error.textContent = '';

  const cred = getCreds();
  superagent.post(`/${type}`)
    .send(cred)
    .end((err, res) => {
      if(!err && res.body && res.body.token) {
        localStorage.token = res.body.token;
        window.location = '/';
      } else {
        error.textContent = res.body ? res.body.reason : err;
      }
    });
}
