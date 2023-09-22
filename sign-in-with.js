import passwordless from 'https://unpkg.com/@passwordless-id/connect@1.2.1/dist/connect.min.js'

// the information requested from the profile
const scope = 'openid avatar email'

function signIn() {
  // performs a redirect to let the user authenticate and/or authorize this app
  passwordless.auth({ scope })
}

function signOut() {
  // performs a redirect to let the user sign out
  passwordless.logout()
}

async function init() {
  // retrieves the user profile and `id_token` if available
  const user = await passwordless.id({ scope })
  if (user.signedIn && user.scopeGranted) {
    console.log(user)
    showUser(user)
  }
  else {
    showSignIn()
  }
}


function showUser(user) {
  document.getElementById('picture').src = user.profile.picture
  document.getElementById('nickname').textContent = user.profile.nickname
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

// global export
window.app = {
  signIn,
  signOut,
  init
}
