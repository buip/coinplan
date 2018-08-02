CREATE TABLE IF NOT EXISTS transactions(
  id SERIAL PRIMARY KEY NOT NULL,
  amount DECIMAL NOT NULL,
  fee DECIMAL NOT NULL,
  price VARCHAR(10) NOT NULL
  coin_type VARCHAR(10) NOT NULL,
  currency_type VARCHAR(10) NOT NULL,
	transaction_type transaction_types NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
	user_id INT NOT NULL REFERENCES users (id),
)
