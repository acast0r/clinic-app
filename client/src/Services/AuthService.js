export default {
    login: user => {
        return fetch('http://tip-clinic.ml/user/login', {
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
        return fetch('http://tip-clinic.ml/user/register', {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
          .then(data => data)
    },
    logout: () => {
        return fetch('http://tip-clinic.ml/user/logout')
                .then(res => res.json())
                .then(data => data)
    },
    isAuthenticated: () => {
        return fetch('http://tip-clinic.ml/user/authenticated')
                .then(res => {
                    if(res.status !== 401) 
                        return res.json().then(data => data);
                    else 
                        return {isAuthenticated: false, user: {username: "", role: ""}}
                })
    }
}