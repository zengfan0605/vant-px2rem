const getters = {
  mobile: state => state.user.mobile,
  token: state => state.user.token,
  userName: state => state.user.userName,
  nickName: state => state.user.nickName,
  avatar: state => state.user.avatar
}
export default getters
