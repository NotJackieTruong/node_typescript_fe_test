import fetch from 'auth/FetchInterceptor'

const ApiService = {}

ApiService.updateUser = (data, id)=>{
  return fetch({
    url: `/users/${id}`,
    method: 'put',
    headers: {},
    data: data
  })
}

export default ApiService
