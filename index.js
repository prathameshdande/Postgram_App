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

const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));

let posts = [
    {
        id: uuidv4(),
        name: "prathamesh",
        photo: "https://i.pravatar.cc/500?img=5",
        comments: "Nice"
    },
    {
        id: uuidv4(),
        name: "Pratham",
        photo: "https://i.pravatar.cc/500?img=4",
        comments: "Cool"
    },
    {
        id: uuidv4(),
        name: "Dande",
        photo: "https://i.pravatar.cc/500?img=6",
        comments: "OSM"
    }
];

// Show all posts
app.get("/instagram", (req, res) => {
    res.render("home", { posts });
});

// Add new post
app.post("/instagram", (req, res) => {
    let { name, photo, comments } = req.body;
    let id = uuidv4();
    posts.push({ id, name, photo, comments });
    res.redirect("/instagram");
});

// Edit form page
app.get("/instagram/:id/edit", (req, res) => {
    const { id } = req.params;
    const post = posts.find((p) => p.id === id);
    res.render("edit", { post });
});

// Update post (PATCH)
app.patch("/instagram/:id", (req, res) => {
    let { id } = req.params;
    let { name, comments, photo } = req.body;
    const post = posts.find((p) => p.id === id);
    post.name = name;
    post.comments = comments;
    post.photo = photo;
    res.redirect("/instagram");
});

// Delete post (DELETE)
app.delete("/instagram/:id", (req, res) => {
    const { id } = req.params;
    posts = posts.filter((p) => p.id !== id);
    res.redirect("/instagram");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}..!`);
});
