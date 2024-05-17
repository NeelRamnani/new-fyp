import React from 'react'

const neel = () => {
  return (
    <div>
      <form>
        <label htmlFor="username">Username:</label><br/>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} /><br/>
        <label htmlFor="password">Password:</label><br/>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br/>
        <input type="submit" value="Submit" />
        dsaaaaaaaaaaaaaaaaaaaaa
      </form>
    </div>
  )
}

export default neel