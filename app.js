const express = require("express");
const app = express();

app.listen(8000, function hostname() {
  console.log("server running on port 8000");
});

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "warunginaja",
  password: "admin",
  port: 5433,
});
app.use(express.static("style"));
app.use(express.static("images"));
app.use(express.static("script"));
app.use(express.static("vendor"));
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  pool.query("select * from product", function (error, result) {
    if (error) {
      throw error;
    }
    res.render("index.ejs", { daftarProduct: result.rows });
  });
});
app.get("/log", function (req, res) {
  res.render("login.ejs");
});
app.get("/signUp", function (req, res) {
  res.render("register.ejs");
});
app.get("/category", function (req, res) {
  res.render("categories.ejs");
});
app.get("/cart", function (req, res) {
  pool.query("select*from product", function (error, result) {
    if (error) {
      throw error;
    }
    res.render("cart.ejs", { daftarProduct: result.rows });
  });
});
app.get("/dashboard", function (req, res) {
  res.render("dashboard.ejs");
});
app.get("/details", function (req, res) {
  pool.query("select*from product", function (error, result) {
    if (error) {
      throw error;
    }
    res.render("details.ejs", { daftarProduct: result.rows });
  });
});
app.get("/registerSuccess", function (req, res) {
  res.render("register-success.ejs");
});
app.get("/success", function (req, res) {
  res.render("success.ejs");
});
app.get("/dashAcc", function (req, res) {
  res.render("dashboard-account.ejs");
});
app.get("/dashProductsDet", function (req, res) {
  res.render("dashboard-Products-details.ejs");
});
app.get("/dashSett", function (req, res) {
  res.render("dashboard-settings.ejs");
});
app.get("/dashTransDet", function (req, res) {
  res.render("dashboard-transactions-details.ejs");
});
app.get("/dashTrans", function (req, res) {
  res.render("dashboard-transactions.ejs");
});
app.get("/dashProducts", function (req, res) {
  pool.query("select*from product", function (error, result) {
    if (error) {
      throw error;
    }
    res.render("dashboard-Products.ejs", { daftarProduct: result.rows });
  });
});
app.get("/dashProductsCre", function (req, res) {
  res.render("dashboard-Products-create.ejs");
});
app.post("/tambah", function (req, res) {
  console.log(req.body.storeName);
  console.log(req.body.storePrice);
  console.log(req.body.description_1);
  console.log(req.body.description_2);
  console.log(req.body.storeOwner);

  let data = {
    name: req.body.storeName,
    price: req.body.storePrice,
    desc1: req.body.description_1,
    desc2: req.body.description_2,
    owner: req.body.storeOwner,
  };

  pool.query(
    "insert into product (name, price, desc1, desc2, owner) values($1, $2, $3, $4, $5)",
    [data.name, data.price, data.desc1, data.desc2, data.owner],
    function (error, results) {
      if (error) {
        throw error;
      }
      res.redirect("/dashProducts");
    }
  );
});
