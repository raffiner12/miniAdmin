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
    //console.log("postId",postId);

    var sql = `SELECT postTitle, postContent FROM post WHERE postId = ?`;

    db.query(sql, postId, function (error, result) {
        if (error) {
            throw error;
        }
        //console.log("result", result);
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

// 대시보드 --------------------------------
// 1-a. 총 사용자 수
app.get(`/dashboard/totalUsers`, (req, res) => {
    var sql = `SELECT COUNT(*) FROM user;`;
    db.query(sql, (error, result) => {
        if(error){
            throw error;
        }
        //console.log("result", result);
        res.send(result);
    })
})

// 1-b. 3월 신규 유입된 사용자 수
app.get(`/dashboard/MarchNewUser`, (req, res) => {
    var sql = `SELECT COUNT(*) FROM user WHERE userJoinedAt like '2023-03-%'`;
    db.query(sql, (error, result) => {
        if(error){
            throw error;
        }
        //console.log("result", result);
        res.send(result);
    })
})
// 1-c. 최근 2주간 접속한 사용자 수 

// 1-d. 사용자 당 평균 게시글 수
app.get(`/dashboard/averagePost`,(req, res) => {
    //console.log("안녕");
    var sql = `SELECT (SELECT COUNT(*) FROM post) / (SELECT COUNT(*) FROM user) AS avg_posts_per_user;`
    db.query(sql, (error, result) => {
        if(error){
            throw error;
        }
        //console.log("averagePost", result);
        res.send(result);
    })
})


// 2-a. 총 게시글 수
app.get(`/dashboard/totalPost`, (req, res) => {
    var sql = `SELECT COUNT(*) FROM post`;
    db.query(sql, (error, result) => {
        if(error){
            throw error;
        }
        // console.log("총 게시글 수", result);
        res.send(result);
    })
})
// 2-b. 게시글의 평균 조회수
app.get(`/dashboard/avgViewCount`,(req, res) => {
    var sql = `SELECT (SELECT SUM(postViewCount) FROM post) / (SELECT COUNT(*) FROM post) AS avg_viewCount_per_post;`
    db.query(sql, (error, result) => {
        if(error){
            throw error;
        }
        res.send(result);
    })
})
// 2-c. 게시글 당 평균 댓글의 수
app.get(`/dashboard/avgCommentCount`,(req, res) => {
    var sql = `SELECT (SELECT COUNT(*) FROM comment) / (SELECT COUNT(*) FROM post) AS avg_comment_per_post;`
    db.query(sql, (error, result) => {
        if(error){
            throw error;
        }
        res.send(result);
    })
})
// 2-d. 3월 신규 게시글 수 
app.get(`/dashboard/MarchNewPosts`,(req, res) => {
    var sql = `SELECT COUNT(*) FROM post WHERE postCreatedAt like '2023-03-%';`
    db.query(sql, (error, result) => {
        if(error){
            throw error;
        }
        console.log("result", result);
        res.send(result);
    })
})
// 2-e. 3월 신규 게시글의 평균 조회수
app.get(`/dashboard/avgViewCountInMarch`,(req, res) => {
    var sql = `SELECT AVG(postViewCount) FROM post WHERE postCreatedAt like '2023-03-%';`
    db.query(sql, (error, result) => {
        if(error){
            throw error;
        }
        console.log("avgViewCountInMarch", result);
        res.send(result);
    })
})

// 2-f. 최근 일주일 신규 게시글 수
app.get(`/dashboard/newPostsPerWeek`, (req, res) => {
    var sql = `SELECT COUNT(*) FROM post WHERE postPublishedAt >= DATE_SUB(CURDATE(), INTERVAL 1 WEEK);`;
    db.query(sql, (error, result) => {
        if (error) {
            throw error;
        }
        //console.log("result", result);
        res.send(result);
    })
})
// 2-g. 최근 일주일 신규 게시글의 평균 조회수
app.get(`/dashboard/avgViewCountPerWeek`, (req, res) => {
    var sql = `SELECT AVG(postViewCount) FROM post WHERE postPublishedAt >= DATE_SUB(CURDATE(), INTERVAL 1 WEEK);`;
    db.query(sql, (error, result) => {
        if (error) {
            throw error;
        }
        console.log("result", result);
        res.send(result);
    })
})

// 3-a. 가장 포스팅 수가 많은 사용자 Top 5
app.get(`/dashboard/postingTop5User`, (req, res) => {
    var sql = `SELECT userId, count(postId) as count from post GROUP BY userId order by count desc limit 5;`
    db.query(sql, (error, result) => {
        if (error) {
            throw error;
        }
        //console.log("Top5PostingUser", result);
        res.send(result);
    })
})
// 3-b. 가장 댓글 수가 많은 게시글 Top5
app.get(`/dashboard/commentTop5Posting`, (req, res) => {
    var sql = `SELECT postId, COUNT(commentId) AS count FROM comment GROUP BY postId ORDER bY count desc limit 5;`
    db.query(sql, (error, result) => {
        if (error) {
            throw error;
        }
        //console.log("Top5CommentPost", result);
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

