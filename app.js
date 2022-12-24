const exp = require("express");
const bp = require("body-parser");
const _ = require("lodash")

const app = exp();

app.set("view engine", 'ejs');
app.use(bp.urlencoded({extended: true}));
app.use(exp.static("public"));

const home_content = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, accusamus! Blanditiis fugiat aspernatur hic, consequuntur, consectetur inventore est laudantium iusto harum, eos perferendis dolores at enim expedita corporis. Beatae quisquam praesentium a sit neque perferendis voluptates magni inventore debitis reprehenderit obcaecati accusamus, repellendus ea iste laboriosam assumenda nesciunt modi dolor.";

const about_content = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque minima quam maxime, adipisci accusantium tempore neque porro. Illo nesciunt nobis blanditiis tempora, tempore itaque provident odit eveniet iure commodi repellendus expedita error rem in fugit aliquid quo dolorem, dolor adipisci mollitia. Perferendis ab non, fuga, amet facere modi cum tempora ullam quam voluptatum nobis magni ducimus labore, reiciendis impedit delectus minus at! Voluptatum eum possimus dolores tempore delectus iste impedit fugit nulla dolorem deleniti accusantium quaerat quia repellendus reiciendis dolorum ipsum, optio facere, magnam placeat alias. Perspiciatis ad magnam facere, adipisci eligendi, laudantium fuga saepe, doloremque soluta fugit dolor possimus.";

const contact_initial = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa explicabo omnis temporibus laboriosam adipisci vero, provident, fuga ex aliquam pariatur veritatis dolorum ducimus ea nam sapiente! Aspernatur dolorum rerum adipisci, eius error architecto expedita nobis esse quis eveniet numquam similique cupiditate ducimus dicta quod corrupti minus? Quod sunt quae fuga earum ab. Unde porro, numquam temporibus dicta quas sint deserunt eligendi, nemo eaque, ab enim soluta sequi. Cupiditate, maxime veniam! Sequi, eligendi? Temporibus iure sapiente molestias vel dolor sint corrupti aut itaque, optio asperiores, molestiae quas nihil ut vitae nam eaque, rem quae! Vel unde, sint iure aut earum dolores!";

let posts = [];

app.get("/", function(req, res){
    res.render("home", {initial_content: home_content, blogs: posts});
});

app.get("/about", function(req, res){
    res.render("about", {ab_initial: about_content});
})

app.get("/contact", function(req, res){
    res.render("contact", {conc_initial: contact_initial });
})

app.get("/compose", function(req, res){
    res.render("compose");
})

app.post("/compose", function(req,res){
    let blog = {
        title: req.body.postTitle,
        content: req.body.postBody
    };
    posts.push(blog);
    res.redirect("/");
})

app.get("/posts/:topic", function(req, res){
    for(var i = 0; i< posts.length; i++)
    {
        if(_.lowerCase(req.params.topic) === _.lowerCase(posts[i].title))
        {
            console.log("Match found!!");
            res.render("post", {posttitle: posts[i].title, postbody: posts[i].content});
            break;
        }
        else{
            console.log("Not found!!");
        }
    }
})

app.listen(3000, function(){
    console.log("Server running on port 3000");
})