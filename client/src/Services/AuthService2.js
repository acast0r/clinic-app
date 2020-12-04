

export default {
    // setToken: () => {
    //     return fetch('/user/auth/me')
    //             .then(res => {
    //         if(res.status !== 401){
    //             return res.json().then(data => {
    //                 localStorage.setItem('access_token', data.token)
    //             });
    //         }
    //         else 
    //             return {isAuthenticated: false, user: {username: "", role: ""}}
    //     })

    // },
    logout: () => {
        return fetch(`/user/auth/logout`)
                .then(res => res.json())
                .then(data => data)
    },
    isAuthenticated: () => {
        return fetch(`/user/auth/me`)
                .then(res => {
                    if(res.status !== 401) 
                        return res.json().then(data => data);
                    else 
                        return {isAuthenticated: false, user: {username: "", role: "", name: ""}}
                })
    }

}