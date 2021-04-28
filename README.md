# hitched

Hitched is a reusable system for managing wedding invites, RSVPs, and thank you notes. The idea is that this will take care of all the "behind the scenes" logic and allow you (the developer) to focus on building the appearance and functionality on the front-end.

Hitched also exposes an admin panel which will allow you to easily add, update, and delete guests and their associated information (plus ones, dietary restrictions, music suggestions, etc.).

## Installation

```js
npm i -S hitched
```

## Usage

Hitched exposes a middleware that you can then use to access our routes.

```js
const express = require("express");
const app = express();
app.use(require("hitched")());
```

## Running the demo

1. Clone this repo
2. Run `npm install`
3. Run `npm run demo`
4. Visit [localhost:4000](http://localhost:4000)

## TODO

This repo is a WIP, full TODO list here:

- Finish up admin panel
- Finish up public apis
- Document all apis
- Logic around invite now or invite later
- Publish package
- Documentation on hosting inside AWS
