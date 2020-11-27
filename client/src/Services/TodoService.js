export default {
    getTodos: () => {
        return fetch('http://tip-clinic.ml/user/todos')
                .then(res => {
                    if(res.status !== 401){
                        return res.json().then(data => data);
                    }else {
                        return {message: {msgBody: "Unauthorized", msgError: true}}
                    }
                });
    },
    createTodo: todo => {
        return fetch('http://tip-clinic.ml/user/todo', {
            method: 'post',
            body: JSON.stringify(todo),
            headers: {
                'Content-Type' : 'application/json'
            }
        }).then(res => {
            if(res.status !== 401){
                return res.json().then(data => data)
            }else {
                return {message: {msgBody: "Unauthorized", msgError: true}}
            }
        })
    }
}