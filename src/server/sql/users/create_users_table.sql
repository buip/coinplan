CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(254) NOT NULL,
  email VARCHAR(254) UNIQUE NOT NULL,
  password_hash CHAR(60) NOT NULL,
  virtual_account_balance INT DEFAULT 0 NOT NULL,
  auth_token CHAR(60),
  password_token CHAR(60),
  password_token_time TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
)
