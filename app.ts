/**
 * Module dependencies.
 */
const express = require("express");
const chalk = require("chalk");

const app = express();

/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
  console.log("%s App is running at http://localhost:%d in %s mode",
    chalk.green("✓"),
    app.get("port"),
    app.get("env"));
  console.log("  Press CTRL-C to stop\n");
});

module.exports = app;
