import axios from 'axios'
import { toast } from 'react-toastify'
import log from './log'
axios.interceptors.response.use(null, (err) => {
    const expectedErr =
        err.response && err.response.status >= 400 && err.response.status < 500
    if (!expectedErr) {
        log(err)
        toast.error('服务器也不知道发生啥错误了或者服务器挂了')
    }
    return Promise.reject(err)
})

export default {
    get: axios,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
}
