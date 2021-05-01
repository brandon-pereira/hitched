# Hitched API Docs

Hitched provides one main export, and that is the `hitched` middleware which is to be used with `express`.

## `hitched` middleware

### Importing

```js
import hitched from "hitched";
```

### Usage

```js
const express = require("express");
// new or existing express instance
const app = express();
// see Options documentation below
const opts = { ... };
// hitched is a middleware
app.use(hitched(opts));
```

### Options

| Option Name | isRequired | Details                                                                       |
| ----------- | ---------- | ----------------------------------------------------------------------------- |
| database    | true       | An instantiated mongoose database connection object [more details](#database) |
| 1           | 2          | 3                                                                             |

```js
const options = {};
```

### Database

`hitched` leverages [Mongoose](https://mongoosejs.com/docs/index.html) for creating database schemas and models. It will manage the creation of schemas and models, however its up to the developer (you) to provide a connected instance to mongoose (calling the `connect` method on mongoose, then passing the default mongoose export to hitched)
