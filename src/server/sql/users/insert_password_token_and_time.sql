UPDATE users
SET password_token    = ${password_token},
  password_token_time = ${password_token_time}
WHERE email = ${email};