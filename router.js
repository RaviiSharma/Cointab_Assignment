var express = require("express");
var router = express.Router();

var database = require('./database.js/database');


router.post('/login', function(request, response, next){
    //var countValue=0

    var user_email_address = request.body.email;

    var user_password = request.body.password;

    if(user_email_address && user_password)
    {
        query = `
        SELECT * FROM user_login 
        WHERE user_email = "${user_email_address}"
        `;

        database.query(query, function(error, data){
           console.log(data.length)
            if(data.length > 0)
            {
                for(var count = 0; count < data.length; count++)
                {
                    if(data[count].user_password == user_password)
                    {
                        request.session.user = request.body.email;

                        response.redirect('/route/dashboard');
                       
                    }
                    else

                    {
                        // countValue++;
                        // database.query(`INSERT INTO user_login (no_of_attempts) Values (${countValue}) WHERE user_email_address = ${user_email_address}` )
                        response.send('<h1 class="text-center">Incorrect Password</h1>');
                    }
                }
            }
            else 
            {
        //         query = `
        //      SELECT * FROM user_login 
        //     WHERE user_email = "${user_email_address}"
        //     data
        // `;
                response.send('<h1 class="text-center">Incorrect Email Address</h1>');
            }
            response.end();
        });
    }
    else
    {
        response.send('<h1 class ="text-center">Please Enter Email Address and Password Details</h1>');
        response.end();
    }

});

//_______________________________________________________________________________________________________________________

// route for dashboard
router.get('/dashboard', (req, res) => {
    if(req.session.user){
        res.render('dashboard', {user : req.session.user})
    }else{
        res.send("Unauthorize User")
    }
})

// route for logout
router.get('/logout', (req ,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.render('base', { title: "Login System", logout : "Logout Successfully...!"})
        }
    })
})

module.exports = router;