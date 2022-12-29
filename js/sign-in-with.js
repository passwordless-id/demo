import passwordless from 'https://unpkg.com/@passwordless-id/connect'

const scope = 'openid avatar email'

window.onClickSignIn = () => {
  passwordless.auth({ scope })
}

window.onClickSignOut = async () => {
  passwordless.logout()
}

async function init() {
  const user = await passwordless.id({ scope })
  if (user.signedIn && user.scopeGranted) {
    console.log(user)
    showUser(user)
  }
  else {
    showSignIn()
  }
}

init()

function showUser(user) {
  document.querySelector('#profile img').src = user.profile.picture
  document.querySelector('#profile h1').textContent = user.profile.nickname
  document.querySelector('#output code').textContent = JSON.stringify(user, null, ' ')

  document.getElementById('spinner').hidden = true
  document.getElementById('profile').hidden = false
  document.getElementById('output').hidden = false
  document.getElementById('sign-out').hidden = false

}

function showSignIn() {
  document.getElementById('spinner').hidden = true
  document.getElementById('sign-in').hidden = false
}