export const getAuthetication = async (data) => {
  try {
    const response = await fetch('http://localhost:8080/api/authentication', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(res => {
      if (res.status === 200) return res.json()
      throw new Error('ssibal')
    })
    return response.result
  } catch (err) {
    alert('fail to fetch user: ', err)
  }
  
}

export const getPost = async (id, token) => {
  try {
    const response = await fetch(`http://localhost:8080/api/user/${id}/posts`, {
      method:'GET',
      headers: {
        token
      }
    }).then(res => {
      if (res.status === 200) return res.json()
      throw new Error('ssibal')
    })
    return response.result
  } catch(err) {
    alert('fail to load post')
  }
  
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