# Legible Cashbill

Unofficial **Node.js** wrapper for [CashBill][cashbill] [REST API][cashbill-docs] written in **TypeScript**.

## Installing:

```sh
yarn add @blocklist/legible-cashbill
# or
npm i @blocklist/legible-cashbill -S
```

## Sample usage:

```js
import { LegibleCashbill } from '@blocklist/legible-cashbill'

async function start() {
  // Initialize API Wrapper instance with test API url:
  const cashbill = new LegibleCashbill({
    // By default `apiUrl` is set to production api url. (https://pay.cashbill.pl/ws/rest)
    apiUrl: 'https://pay.cashbill.pl/testws/rest'
    secret: 'your-secret',
    shopId: 'your-shop-id',
  })

  // Create payment
  const { id } = cashbill.payments.create({ /* your data */})

  // Retrieve payment info
  const info = cashbill.payments.retrieve(id);

  // Get notification
  const notification = cashbill.notifications.get(/* request data */)
}
```

[cashbill]: "https://cashbill.pl/"
[cashbill-docs]: "https://www.cashbill.pl/download/dokumentacje/Płatności/Płatności%20CashBill%232.4.pdf"
