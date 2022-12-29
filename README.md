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
    showUser(user)
  else
    showSignIn()
}
init()
```

The retrieved `user` has the following structure.

```json
{
 "signedIn": true,
 "scopeGranted": true,
 "id_token": "eyJ0eXAiOiJK...",
 "profile": {
  "nickname": "Johny",
  "picture": "https://ui.passwordless.id/avatars/sam.svg",
  "preferred_username": "johndoe",
  "...": "...more attributes depending on requested scope"
 }
}
```

Once you obtain the user, you can also send the `token_id` to your server API as proof of the user's authenticity. This is a Json Web Token containing a signature that can be verified by common libraries.