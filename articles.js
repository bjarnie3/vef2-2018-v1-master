/* útfæra greina virkni */
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const metaMarked = require('meta-marked');
const util = require('util');
const filePath = './articles';
const readFileAsync = util.promisify(fs.readFile);

let greinar = [];
let myFiles = [];
let greinaSafn = [];

fs.readdir(filePath, function (err, files) {
    if (err) {
        throw err;
    }
    for (var i = 0; i < files.length; i++) {
      if(path.extname(files[i]) === ".md"){
          myFiles.push(files[i]);
      }
    }
});

async function readArticles(files){
  let arr = []
  for(let i = 0; i < files.length; i++){
    //console.log(files[i])
    const obj = await readFileAsync("./articles/" + files[i]);
    arr.push(obj);
  }
  return arr;
}

async function middleware(req,res,next){
  greinaSafn = [];
  greinar = await readArticles(myFiles);
  //console.log("greinar[1]" + greinar[1]);
  for (let i = 0; i < greinar.length; i++) {
   const obj = await metaMarked(greinar[i].toString('utf8'));
    greinaSafn.push(obj);
  }
  sortArticles();
  next();
}

function sortArticles(){

  for(let i = 0; i < greinaSafn.length; i++){
    greinaSafn[i].meta.date = new Date(greinaSafn[i].meta.date);
  }

  greinaSafn.sort(function(a, b) {
    return a.meta.date > b.meta.date ? -1 : a.meta.date < b.meta.date ? 1 : 0;
  });

  printArr();
}

function printArr(){
  for (var i = 0; i < greinaSafn.length; i++) {
    console.log(greinaSafn[i].meta.date);
  }
}

function isArticle(data){
  for (let i = 0; i < greinaSafn.length; i++) {
    if(greinaSafn[i].meta.slug == data){
      return true;
    }
  }
  return false;
}

function getArticle(data){

  for (let i = 0; i < greinaSafn.length; i++) {
    
    if(greinaSafn[i].meta.slug == data){
      return greinaSafn[i];
    }
  }
}

router.get('/', middleware,(req, res) => {
//res.send(greinaSafn[0].meta.slug);
  res.render('index', {title: 'greinar', greinaSafn});
});


router.get('/:slug', (req, res) => {
  if(isArticle(req.params.slug)){
    const grein = getArticle(req.params.slug);
    res.render('article', {title: grein.meta.title, html: grein.html});
  }
  else{
    res.render('404', {title: 'síða fannst ekki'});
  }
});

module.exports = router;