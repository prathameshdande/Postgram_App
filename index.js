// const express = require("express");
// const app = express();
// const port = 3000;
// const path = require("path");
// app.use(express.urlencoded({extended: true}));
// app.use(express.json());
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
// const { v4: uuidv4} = require("uuid");
// const methodOverride = require("method-override");
// app.use(methodOverride("_method"));


// let posts = [
//     {
//         id: uuidv4(),
//         name: "prathamesh",
//         photo: "https://i.pravatar.cc/500?img=5",
//         comments: "Nice"
//     },
//         {
//         id: uuidv4(),
//         name: "Pratham",
//         photo: "https://i.pravatar.cc/500?img=4",
//         comments: "Cool"
//     },
//     {
//         id: uuidv4(),
//         name: "Dande",
//         photo: "https://i.pravatar.cc/500?img=6",
//         comments: "OSM"
//     }
// ]

// app.get("/instagram", (req, res) => {
//     res.render("home.ejs", {posts});
// });

// app.post("/instagram", (req, res) => {
//     let {name, photo, comments} = req.body;
//     let id = uuidv4();
//     posts.push({id, name, photo, comments});
//     res.redirect("/instagram");
//     console.log(id);
// });

// app.patch("/instagram/:id", (req, res) => {
//     let { id } = req.params;
//     let newComment = req.body.comments;
//     const post = posts.find((p) => p.id === id);

//     if (!post) {
//         return res.status(404).send("Post not found");
//     }

//     post.comments = newComment;
//     console.log(post);
//     res.send("The page is working");
// });

// app.get("/instagram")

// app.listen(port, () => {
//     console.log("Listening on port 3000..!");
// })

require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let posts = [
  {
    id: uuidv4(),
    name: "Prathamesh",
    photo: "https://i.pravatar.cc/500?img=5",
    comments: "Nice",
  },
  {
    id: uuidv4(),
    name: "Pratham",
    photo: "https://i.pravatar.cc/500?img=4",
    comments: "Cool",
  },
  {
    id: uuidv4(),
    name: "Dande",
    photo: "https://i.pravatar.cc/500?img=6",
    comments: "OSM",
  },
];

app.get("/", (req, res) => {
  res.redirect("/instagram");
});

app.get("/instagram", (req, res) => {
  res.render("home", { posts });
});

app.post("/instagram", (req, res) => {
  const { name, photo, comments } = req.body;

  if (!name || !photo || !comments) {
    return res.status(400).send("All fields are required");
  }

  posts.push({
    id: uuidv4(),
    name,
    photo,
    comments,
  });

  res.redirect("/instagram");
});

app.get("/instagram/:id/edit", (req, res) => {
  const { id } = req.params;
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return res.status(404).send("Post not found");
  }

  res.render("edit", { post });
});

app.patch("/instagram/:id", (req, res) => {
  const { id } = req.params;
  const { name, comments, photo } = req.body;

  const post = posts.find((p) => p.id === id);

  if (!post) {
    return res.status(404).send("Post not found");
  }

  post.name = name;
  post.comments = comments;
  post.photo = photo;

  res.redirect("/instagram");
});

app.delete("/instagram/:id", (req, res) => {
  const { id } = req.params;
  posts = posts.filter((p) => p.id !== id);
  res.redirect("/instagram");
});

app.use((req, res) => {
  res.status(404).send("404 - Page Not Found");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});
