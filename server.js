const KoaRouter = require("@koa/router")
const bodyParser = require("koa-bodyparser")
const Koa = require("koa")
const app = new Koa()
const router = new KoaRouter()
const path = require("path")
const render = require("koa-ejs")

// Db connection
const things = ["hello", "yes", "no", "maybe", "good"]

app.use(bodyParser())
render(app, {
  root: path.join(__dirname, "views"),
  layout: "layout",
  viewExt: "html",
  cache: false,
  debug: false,
})

// Routes
router.get("/", index)
router.get("/add", showAdd)
router.post("/add", add)

// List of things

async function add(ctx) {
  console.log(ctx.request.body)
  const body = ctx.request.body
  things.push(body.thing)
  ctx.redirect("/")
}

async function showAdd(ctx) {
  await ctx.render("add")
}
async function index(ctx) {
  await ctx.render("index2", {
    title: "Happy People",
    things: things,
  })
}

// router.get("/", async (ctx) => {
//   await ctx.render("index2", {
//     title: "Happy People",
//     things: things,
//   })
// })

// app.use(async (ctx) => (ctx.body = { msg: "Hello World" }))

// Basic middleware, router from KOA
app.use(router.routes()).use(router.allowedMethods())
router.get("/test", (ctx) => (ctx.body = "Hello Test"))

const PORT = process.env.PORT || 3004
app.listen(PORT, () => console.log(`We are live on port ${PORT}`))

// const Koa = require("koa")
// const mongoose = require("mongoose")
// const app = new Koa()
// const Router = require("@koa/router")
// const router = new Router()
// const static = require("koa-static")
// require("dotenv").config()

// ///// nunjucks
// const views = require("koa-views")
// const nunj = require("nunjucks")
// nunj.configure("./views", { autoescape: true })

// ///Mongoose

// // const views
// //// Middleware ////////////////////////

// // Routes
// router.get("/", (ctx, next) => {
//   return ctx.render("./index.html", {
//     name: "Sam",
//   })
// })

// router.get("/:name", (ctx, next) => {
//   return ctx.render("./index.html", {
//     name: ctx.params.name,
//   })
// })

// // Everything that happens in between your req and res.
// app.use(views("./views", { map: { html: "nunjucks" } }))
// app.use(router.routes())
// app.use(static("./public"))

// const PORT = process.env.PORT || 3005
// app.listen(PORT, () => console.log(`Server listening on port ${PORT} `))

// const mongoURI = process.env.MONGO
// mongoose.connect(
//   mongoURI,
//   { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
//   (err) => {
//     if (err) throw err
//     console.log("Mongoose is ALIVE!")
//   }
// )
