UPDATE users
SET password_token    = ${password_token},
  password_token_time = NOW()
WHERE email = ${email};