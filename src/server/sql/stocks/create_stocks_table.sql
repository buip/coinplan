CREATE TABLE IF NOT EXISTS stocks(
  id SERIAL PRIMARY KEY NOT NULL,
  stock_name VARCHAR(10) NOT NULL,
  stock_symbol VARCHAR(10) NOT NULL
)
