export const getAuthetication = async (data) => {
  const response = await fetch('http://localhost:8080/api/authentication', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  const result = await response.json()
  if (result.status === 'OK') return result
  throw result
}

export const getPost = async (id, token) => {
  const response = await fetch(`http://localhost:8080/api/user/${id}/posts`, {
    method:'GET',
    headers: {
      token
    }
  }).then(res => {
    return res.json()
  })
  return response.result  
}

export const getProfile = async (id, token) => {
  const response = await fetch(`http://localhost:8080/api/user/${id}`, {
    method: 'GET',
    headers: {
      token
    }
  }).then(res => {
    return res.json()
  })
  return response.result
}