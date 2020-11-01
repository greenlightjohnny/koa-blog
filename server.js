const Koa = require("koa")
const mongoose = require("mongoose")
const app = new Koa()
const Router = require("@koa/router")
const router = new Router()
const static = require("koa-static")
require("dotenv").config()

///// nunjucks
const views = require("koa-views")
const nunj = require("nunjucks")
nunj.configure("./views", { autoescape: true })

///Mongoose

// const views
//// Middleware //////////////////////

// Routes
router.get("/", (ctx, next) => {
  return ctx.render("./index.html", {
    name: "Sam",
  })
})

router.get("/:name", (ctx, next) => {
  return ctx.render("./index.html", {
    name: ctx.params.name,
  })
})

// Everything that happens in between your req and res.
app.use(views("./views", { map: { html: "nunjucks" } }))
app.use(router.routes())
app.use(static("./public"))

const PORT = process.env.PORT || 3005
app.listen(PORT, () => console.log(`Server listening on port ${PORT} `))

const mongoURI = process.env.MONGO
mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) throw err
    console.log("Mongoose is ALIVE!")
  }
)
