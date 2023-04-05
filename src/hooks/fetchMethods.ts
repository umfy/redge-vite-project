export async function fetchGet(url: string) {
    try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        
        if (!response.ok) {
          throw new Error(`Network response was not ok (${response.status})`);
        }
        
        const data = await response.json()
        
        return data
      } catch (error) {
        console.error(`Error fetching data from ${url}: ${error}`)
      }
}
  
export async function fetchPost(url: string, body: unknown) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      
      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.status})`);
      }
      
      const data = await response.json()
      
      return data
    } catch (error) {
      console.error(`Error fetching data from ${url}: ${error}`)
    }
  }
  
  export async function fetchDelete(url: string) {
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.status})`);
      }
      
      const data = await response.json()
      
      return data
    } catch (error) {
      console.error(`Error fetching data from ${url}: ${error}`)
    }
  }

  export async function fetchPut(url: string, body: unknown) {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      
      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.status})`);
      }
      
      const data = await response.json()
      
      return data
    } catch (error) {
      console.error(`Error fetching data from ${url}: ${error}`)
    }
  }
  