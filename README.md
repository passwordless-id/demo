Passwordless.ID Demo
--------------------

Try the simple demo of a "Sign in with Passwordless.ID" here:

> https://passwordless-id.github.io/demo/


It uses the OAuth2 / OpenID flow using the [@passwordless-id/connect](https://github.com/passwordless-id/connect) library.


The code for that looks as follows.

```js
import passwordless from 'https://unpkg.com/@passwordless-id/connect'

// the information requested from the profile
const scope = 'openid avatar email'

function onClickSignIn() => {
  // performs a redirect to let the user authenticate and/or authorize this app
  passwordless.auth({ scope })
}

function onClickSignOut = async () => {
  // performs a redirect to let the user sign out
  passwordless.logout()
}

async function init() {
  // retrieves the user profile and `id_token` if available
  const user = await passwordless.id({ scope })
  if (user.signedIn && user.scopeGranted)
    showUser(user.profile)
  else
    showSignIn()
}
init()
```