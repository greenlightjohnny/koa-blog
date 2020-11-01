const Koa = require("koa");
const mongoose = require("mongoose");
const app = new Koa();
const Router = require("@koa/router");
const router = new Router();
const static = require("koa-static");
const views = require("koa-views");

// Routes
router.get("/", (ctx, next) => {
  return ctx.render("./index.html", {
    name: "Sam",
  });
});

router.get("/:name", (ctx, next) => {
  return ctx.render("./index.html", {
    name: ctx.params.name,
  });
});

// const views
//// Middleware //////
// Everything that happens in between your req and res.
app.use(views("./views", { map: { html: "nunjucks" } }));
app.use(router.routes());
app.use(static("./public"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server listening on port ${PORT} `));
