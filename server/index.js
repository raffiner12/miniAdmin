const express = require('express');
const app = express()
const PORT = process.env.port || 5000;
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');


/// DB 연동 ///
var mysql = require('mysql');
var db = mysql.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password : '12341234',
    database : 'miniPowAdmin',
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

db.connect();

// db.query(`SELECT * FROM post Where userId = 14`, function(error, users){
//     if (error) {
//         console.log(error);
//     }
//     console.log(users);
// })

// 2-2 사용자 화면 확장 API---------------------
// 사용자 목록 조회
app.get('/users', (req, res) => {
    let sql = "SELECT * FROM user;";
    db.query(sql, (err, result) => {
        res.send(result);
    });
});

// 특정 사용자의 게시글 조회
app.get('/users/:userId/posts', (req, res) => {
    // db.query(`SELECT * FROM post`, function(error, posts) {
    //     if(error) {
    //         throw error;
    //     }
    let userId = req.params.userId;
    //console.log("userId",userId); // userId는 값이 받아와짐,
    db.query(`SELECT * FROM post WHERE userId =?`, userId, function (error2, result) {
        if (error2) {
            throw error2;
        }
        console.log("result", result);
        res.send(result);
    })
})


// 2-3 게시글 화면 확장 API---------------------
// 게시글 목록 조회
app.get('/posts', (req, res) => {
    let sql = "SELECT * FROM post;";
    db.query(sql, (err, result) => {
        res.send(result);
    });
});

// 특정 게시글의 내용(content) 조회
app.get('/posts/:postId', (req, res) => {
    let postId = req.params.postId;
    console.log("postId",postId);

    var sql = `SELECT postTitle, postContent FROM post WHERE postId = ?`;

    db.query(sql, postId, function (error, result) {
        if (error) {
            throw error;
        }
        console.log("result", result);
        res.send(result);
    })
})

// 특정 게시글의 댓글 조회
app.get('/posts/:postId/comments', (req, res) => {
    let postId = req.params.postId;
    //console.log("postId",postId);

    var sql = `SELECT comment.* FROM post LEFT JOIN comment ON post.postId = comment.postId WHERE post.postId = ?`;

    db.query(sql, postId, function (error, result) {
        if (error) {
            throw error;
        }
        //console.log("result", result);
        res.send(result);
    })
})


// ------------------------------------------------------
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`)
})

// 리액트 프로젝트 설정
app.use(express.static(path.join(__dirname, 'client/build')));

// 클라이언트 요청 처리 (리액트 라우터 쓰는 경우)
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '/client/cuild/index.html'));
})

