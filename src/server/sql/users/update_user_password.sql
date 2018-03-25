UPDATE users
SET password_hash = ${password_hash}
WHERE email = ${email};