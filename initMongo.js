db.createUser({
    user: 'dev',
    pwd: 'pass123',
    roles: [
      {
        role: 'readWrite',
        db: 'db'
      }
    ]
  })