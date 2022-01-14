import axios from "axios"

const URL = 'https://blog-stan-rails.herokuapp.com'
//Devise AUTH Token
export const sign_in = (email, password) => {
    var data = {
        email: email,
        password: password
    }
    return axios.post(`${URL}/api/v1/auth/sign_in`, data)
}

export const sign_up = (email, password, password_confirmation) => {
    var data = {
        email: email,
        password: password,
        password_confirmation: password_confirmation

    }
    return axios.post(`${URL}/api/v1/auth`, data)
}

export const sign_out = (headers) => {
    return axios.delete(`${URL}/api/v1/auth/sign_out`, { headers: headers })
}


//Categories
export const categories_index = (headers) => {
    return axios.get(`${URL}/api/v1/categories`, { headers: headers })
}
export const categories_show = (headers, category_id) => {
    return axios.get(`${URL}/api/v1/users/${category_id}`, { headers: headers })
}

export const categories_create = (headers, data) => {
    return axios.post(`${URL}/api/v1/categories`, data, { headers: headers })
}

export const categories_update = (headers, category_id, data) => {
    return axios.patch(`${URL}/api/v1/categories/${category_id}`, data, { headers: headers })
}

export const categories_delete = (headers, category_id) => {
    return axios.delete(`${URL}/api/v1/categories/${category_id}`, { headers: headers })
}

//Tasks

export const tasks_index = (headers, category_id) => {
    return axios.get(`${URL}/api/v1/categories/${category_id}/tasks`, { headers: headers })
}

export const tasks_show = (headers, category_id, task_id) => {
    return axios.get(`${URL}/api/v1/categories/${category_id}/tasks/${task_id}`, { headers: headers })
}

export const tasks_create = (headers, category_id, data) => {
    return axios.post(`${URL}/api/v1/categories/${category_id}/tasks`, data, { headers: headers })
}

export const tasks_update = (headers, category_id, task_id, data) => {
    return axios.patch(`${URL}/api/v1/categories/${category_id}/tasks/${task_id}`, data, { headers: headers })
}

export const tasks_delete = (headers, category_id, task_id) => {
    return axios.delete(`${URL}/api/v1/categories/${category_id}/tasks/${task_id}`, { headers: headers })
}

export const tasks_today = (headers, category_id) => {
    return axios.get(`${URL}/api/v1/categories/${category_id}/tasks/today`, { headers: headers })
}
