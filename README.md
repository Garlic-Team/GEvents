<div align="center">
    <h1>GEvents</h1>
  <p>
    <a href="https://www.npmjs.com/package/@gcommands/events"><img src="https://img.shields.io/npm/v/@gcommands/events?maxAge=3600" alt="NPM version" /></a>
    <a href="https://www.npmjs.com/package/@gcommands/events"><img src="https://img.shields.io/npm/dt/@gcommands/events?maxAge=3600" alt="NPM downloads" /></a>
  <p>
    <a href="https://www.npmjs.com/package/@gcommands/events"><img src="https://nodei.co/npm/@gcommands/events.png?downloads=true&stars=true" alt="NPM Banner"></a>
  </p>
</div>

---

# OFFICIAL ADDON FOR [GCOMMANDS](https://www.npmjs.com/package/gcommands)

## Installation

Install with [npm](https://www.npmjs.com/) / [yarn](https://yarnpkg.com) / [pnpm](https://pnpm.js.org/):

```sh
npm install @gcommands/events
yarn add @gcommands/events
pnpm add @gcommands/events
```

```js
const { GEvents } = require("@gcommands/events");
const { Client } = require("discord.js");
const { join } = require("path");
const client = new Client();

client.on("ready", () => {
    new GEvents(client, {
        eventDir: join(__dirname, "events")
    })
}) 

client.login("token")
```
