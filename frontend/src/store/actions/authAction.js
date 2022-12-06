import axios from 'axios'
import { REGISTER_FAIL, REGISTER_SUCCESS, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL } from '../types/authType'


export const userRegister = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      // !!! 注意这里前面不要加/，比如/api/ichat 这样会代理报错
      const response = await axios.post('/api/ichat/user-register', data, config)
      // console.log(response.data)
      localStorage.setItem('authToken', response.data.token)

      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          successMessage: response.data.successMessage,
          token: response.data.token
        }
      })

    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: {
          error: error.response.data.error.errorMessage
        }
      })
    }

  }
}


export const userLogin = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      // !!! 注意这里前面不要加/，比如/api/ichat 这样会代理报错
      const response = await axios.post('/api/ichat/user-login', data, config)
      // console.log(response.data)
      localStorage.setItem('authToken', response.data.token)

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: {
          successMessage: response.data.successMessage,
          token: response.data.token
        }
      })

    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: {
          error: error.response.data.error.errorMessage
        }
      })
    }

  }
}