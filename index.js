const express = require("express");
const app = express();
const ejs = require('ejs');
var methodOverride = require('method-override');
const req = require("express/lib/request");

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));
app.set('view engine', 'ejs');

let words = [{
    word: "ayam",
    img: "https://awsimages.detik.net.id/community/media/visual/2020/08/17/kakek-didenda-karena-ayam-berkokok.jpeg?w=1200",
    description: "Seekor haiwan berkepak"
}, {
    word: "bulan",
    img: "https://upload.wikimedia.org/wikipedia/commons/e/e1/FullMoon2010.jpg",
    description: "Batu bulat diatas kepala waktu malam"
}, {
    word: "cacing",
    description: "Seekor haiwan yang digunakan untuk memancing"
}, {
    word: "cengkerang",
    img: "https://live.staticflickr.com/4510/37802348552_3c9fbddbd6_b.jpg",
    description: "Tubuh keras pada sesetangah haiwan"
}, {
    word: "dapur",
    description: "Tempat untuk memasak makanan untuk saya"
}
]

app.get('/', (req, res) => {
    if (req.query.word) {
        res.redirect(`/${req.query.word}`);
    } else {
        res.render('index', { words });
    }
})

app.get('/:word', (req, res) => {
    const { word } = req.params;
    const foundWord = words.filter(element => element.word.includes(word));
    if (foundWord) {
        res.render('word', { foundWord });
    } else {
        res.render('notfound');
    }
})

app.get('/word/new', (req,res) => {
    res.render('new');
})

app.post('/', (req,res) => {
    const { word,description,img } = req.body;
    const foundWord = words.find(element => element.word === word);
    if (!foundWord){
        words.push({ word,description,img })
    }
    res.redirect(`/${word}`)
})

app.get('/:word/edit', (req,res) => {
    const { word } = req.params;
    const foundWord = words.find(element => element.word === word);
    res.render('edit', {foundWord});
})

app.patch('/:word', (req,res) => {
    const { word } = req.params;
    const { word: newWord,img: newImg,description: newDescription } = req.body;
    const foundWord = words.find(element => element.word === word);
    foundWord.word = newWord;
    foundWord.img = newImg;
    foundWord.description = newDescription;
    res.redirect(`/${newWord}`);
})

app.delete('/:word', (req,res) => {
    const { word } = req.params;
    words = words.filter(element => element.word !== word);
    res.redirect('/');
})

app.listen(process.env.PORT || 5000, () => {
    console.log("listening on port 5000")
});
