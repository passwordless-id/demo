window.passwordless = {
  apiUrl: "https://api.passwordless.id",
  //apiUrl: "http://localhost:8787",
  init: async function() {
    const args = new URLSearchParams({
      scope: 'openid avatar',
    })
    // The API call to fetch the user
    const res = await fetch(`${this.apiUrl}/openid/id_token?${args}`, {
      mode: 'cors',
      credentials: 'include'
    })

    if (res.ok) {
      // Display it
      const json = await res.json()
      console.log(json)

      const userinfo = JSON.parse(atob(json.id_token.split('.')[1]))
      console.log(userinfo)
      
      showUser(userinfo)
    
    } else if (res.status === 401) {
      // User must first sign in (or create account)
      // It will be redirected back here once done
      document.getElementById('login').className = 'visible'
    } else if (res.status === 403) {
      // User did not grant enough permissions (scope) 
      document.getElementById('login').className = 'visible'
    }
    else {
      console.warn(res)
      alert(`Unexpected Error: ${res.status} ${await res.text()}`)
    }
  },
  auth: async function() {
    const args = new URLSearchParams({
      response_type: 'none id_token',
      client_id: window.location.origin,
      scope: 'openid avatar',
      redirect_uri: window.location.href,
    })
    window.location.assign(`${this.apiUrl}/openid/authorize?${args}`)
  },
  logout: function() {
    const args = new URLSearchParams({
      redirect_uri: window.location.href,
    })
    window.location.assign(`${this.apiUrl}/openid/logout?${args}`)
  }
}

function showUser(userinfo) {
  document.querySelector('#userinfo img').src = userinfo.picture
  document.querySelector('#userinfo h3').textContent = userinfo.nickname ?? 'Error: username missing?!'
  document.querySelector('#userinfo pre').textContent = JSON.stringify(userinfo, null, 2)
  document.getElementById('userinfo').className = 'visible'
}

window.passwordless.init()
