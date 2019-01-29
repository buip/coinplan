CREATE TABLE IF NOT EXISTS users_stocks(
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INT NOT NULL REFERENCES users (id),
  stock_id INT NOT NULL REFERENCES stocks (id)
)
