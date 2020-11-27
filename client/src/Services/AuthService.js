export default {
    login: user => {
        return fetch(`http://${window.location.hostname}/user/login`, {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if(res.status !== 401) 
                return res.json().then(data => data);
            else 
                return {isAuthenticated: false, user: {username: "", role: ""}}
        })

    },
    register: user => {
        return fetch(`http://${window.location.hostname}/user/register`, {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
          .then(data => data)
    },
    logout: () => {
        return fetch(`http://${window.location.hostname}/user/logout`)
                .then(res => res.json())
                .then(data => data)
    },
    isAuthenticated: () => {
        return fetch(`http://${window.location.hostname}/user/authenticated`)
                .then(res => {
                    if(res.status !== 401) 
                        return res.json().then(data => data);
                    else 
                        return {isAuthenticated: false, user: {username: "", role: ""}}
                })
    }
}