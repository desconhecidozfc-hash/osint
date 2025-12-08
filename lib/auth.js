export function hashPassword(password) {
  // Simple hash function for demo purposes
  let hash = 0
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return hash.toString()
}

export function verifyPassword(password, hash) {
  return hashPassword(password) === hash
}