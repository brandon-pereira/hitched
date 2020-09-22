# hitched

I wanted to build a reusable system for managing weddings. The idea is that this will take care of all the "behind the scenes" logic and allow you (the developer) to focus on building the appearance and functionality on the front-end.

## Installation

```js
npm i -S hitched
```

Hitched exposes a middleware that you can then use to access our routes.

```js
const express = require("express");
const app = express();
app.use(require("hitched")());
```
