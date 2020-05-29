# Express route group

This package enables you to create route groups and assign middlewares to those groups.

## Install

```shell
npm install @jinoantony/express-route-group
```

## Usage

```js
const express = require('express')
require('@jinoantony/express-route-group')(express.Router)
const router = express.Router()

...

router.group({middleware: [isAuthenticated]}, function(router) {
    router.get('/', UserController.get)
})

```

You can also add prefix for your groups.

```js
router.group(
    {
        middleware: [isAuthenticated, csrf],
        prefix: '/users'
    }, 
    function(router) {
        router.get('/', UserController.get)
    }
)
```

Routes defined outside the groups are not affected by the `prefix` and `middleware` specified in the group.
