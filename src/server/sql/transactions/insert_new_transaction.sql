/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

INSERT INTO transactions(amount, fee, price, coin_type, currency_type, transaction_type, user_id)
VALUES (${amount}, ${fee}, ${price}, ${coinType}, ${currencyType}, ${transactionType}, ${userID});
