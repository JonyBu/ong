import { useState } from 'react'
import axios from 'axios'

const server = process.env.REACT_APP_SERVER_URL

export const useHttp = (initialFetchingState = false) => {
  const [isFetching, setIsFetching] = useState(initialFetchingState)

  const getTokenFromStorageAndSetHeaders = () => {
    const storedToken = window.localStorage.getItem('token')
    const config = storedToken !== null
      ? { headers: { Authorization: `Bearer ${storedToken}` } }
      : {}
    return config
  }

  const handleError = (err) => {
    setIsFetching(false)
    if (err.response) throw new Error(err.response.data.data.message)
    throw new Error('Hubo un error en la red.')
  }

  const requestWithTryCatch = async (callback, route, body) => {
    const axiosConfig = getTokenFromStorageAndSetHeaders()
    const url = `${server}${route}`
    const callbackArgs = body
      ? [url, body, axiosConfig]
      : [url, axiosConfig]

    setIsFetching(true)
    try {
      const response = await callback(...callbackArgs)
      setIsFetching(false)
      return response.data
    } catch (err) {
      handleError(err)
    }
  }

  const httpGet = (route) => {
    return requestWithTryCatch(axios.get, route, null)
  }

  const httpPost = (route, body) => {
    return requestWithTryCatch(axios.post, route, body)
  }

  const httpUpdate = (route, body, put = false) => {
    const verb = put ? 'put' : 'patch'
    return requestWithTryCatch(axios[verb], route, body)
  }

  const httpDelete = (route) => {
    return requestWithTryCatch(axios.delete, route, null)
  }

  return { isFetching, httpGet, httpPost, httpUpdate, httpDelete }
}