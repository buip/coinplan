/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(254) NOT NULL,
  email VARCHAR(254) UNIQUE NOT NULL,
  password_hash CHAR(60) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  auth_token CHAR(60),
  password_token CHAR(60),
  password_token_time TIMESTAMP DEFAULT NOW()
)
