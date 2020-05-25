import requset from '@/utils/request'

/**
 * desc: 登录
 * author: 曾凡
 * date: 2020-3-1
 */
export function login(data) {
    return requset({
        url: `/api/user/login`,
        method: 'post',
        data
    })
}

/**
 * desc: 登出
 * author: 曾凡
 * date: 2020-3-1
 */
export function logout() {
    return requset({
        url: `/api/user/logout`,
        method: 'post'
    })
}