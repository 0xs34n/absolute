//routes.js
var sales = require('./models/sales');
var accounts = require('./models/accounts');
var users = require('./models/user');
var stocks = require('./models/stocks');
var leftStocks = require('./models/leftStocks');
    
module.exports = function(app, passport) {

    // show the login form
    app.get('/', function(req, res) {
        // render the page and pass in any flash data if it exists
        if(req.user == undefined)
        {
            res.render('login', { message: req.flash('loginMessage')}); 
        }
        else
        {
            res.redirect('/profile');
        };
    });

    // process the login form
    app.post('/', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/profile', isLoggedIn, function(req,res) {
        var loginInfo = req.user;
        accounts.findOne({ID: loginInfo.local.username}, function(err, data){
            res.render('profile', {user: data, message: req.flash('signup2'), noAuthorization: req.flash('notAuthorized')});
        });
        // get the user out of session and pass to template
    });

    // show the signup form
    app.get('/signup', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('signup', {message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', function(req, res, next){
        console.log(req.body.username);
        var item = {
            ID: req.body.username,
            firstName: "",
            lastName: "",
            Designation: "Field Representative",
            trainerID: "",
            teamName: "",
            teamTag: "",
            Gender: "",
            Email: "",
            Nationality: "",
            mobileNumber: "123456789",
            IC: 0,
            Manager: 0,
            Master: 0
        };
        var newAccount = new accounts(item);
        newAccount.save(function(err, data){
            if(err) {
            console.log(err);
            return res.status(500).send();
            }
        });
        return next();   
    }
        ,passport.authenticate('local-signup', {
        successRedirect : '/updateInfo', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/updateInventory', isLoggedIn, function(req, res){
        res.render('updateInventory', {user: req.user, message: req.flash('Error')});
    });

    app.post('/updateInventory', isLoggedIn, function(req, res){
        var item = {
            Date: req.body.Date,
            Location: req.body.Location,
            Type: req.body.Type,
            Shift: req.body.Shift,
            icID: req.body.icID
        };
        item.ID = req.body.icID;
        item.Demo = req.body.icDemo;
        item.Close = req.body.icClose;
        item.UpSale = req.body.icUpSale;
        item.DownSale = req.body.icDownSale;
        item.MG = req.body.icMG;
        item.DP = req.body.icDP;
        item.CG = req.body.icCG;
        item.IO = req.body.icIO;
        item.SY = req.body.icSY;
        item.RO = req.body.icRO;
        item.TB = req.body.icTB;
        item.EDT = req.body.icEDT;
        item.LB = req.body.icLB;
        item.Cash = req.body.icCash;
        item.Nets = req.body.icNets;
        var totalPerf = item.MG + item.DP + item.CG + item.IO + item.SY + item.RO + item.TB + item.EDT;
        var totalPerfSold = (item.UpSale * 6) + (item.DownSale * 4);
        var bags = Number(item.UpSale) + Number(item.DownSale);
        console.log(totalPerf);
        console.log(totalPerfSold);
        if(bags!= item.LB)
        {
            req.flash('Error', 'IC Laurelle Bags do not match Sold Bags');
            return res.redirect('/updateInventory');
        };
        if(totalPerf != totalPerfSold)
        {
            req.flash('Error', 'IC Perfumes Sold do not match Sold Bags');
            return res.redirect('/updateInventory');

        }
        var newSales = new sales(item);
        newSales.save(function(err, data){
            if(err) {
                console.log(err);
                return res.status(500).send();
            }     
        });
        if(req.body.ID1 != "")
        {
            item.ID = req.body.ID1;
            item.Demo = req.body.Demo1;
            item.Close = req.body.Close1;
            item.UpSale = req.body.UpSale1;
            item.DownSale = req.body.DownSale1;
            item.MG = req.body.MG1;
            item.DP = req.body.DP1;
            item.CG = req.body.CG1;
            item.IO = req.body.IO1;
            item.SY = req.body.SY1;
            item.RO = req.body.RO1;
            item.TB = req.body.TB1;
            item.LB = req.body.LB1;
            item.EDT = req.body.EDT1;
            item.Cash = req.body.Cash1;
            item.Nets = req.body.Nets1;
            var newSales = new sales(item);
            newSales.save(function(err, data){
                if(err) {
                console.log(err);
                return res.status(500).send();
                }
            });
        };
        if(req.body.ID2 != "")
        {
            item.ID = req.body.ID2;
            item.Demo = req.body.Demo2;
            item.Close = req.body.Close2;
            item.UpSale = req.body.UpSale2;
            item.DownSale = req.body.DownSale2;
            item.MG = req.body.MG2;
            item.DP = req.body.DP2;
            item.CG = req.body.CG2;
            item.IO = req.body.IO2;
            item.SY = req.body.SY2;
            item.RO = req.body.RO2;
            item.TB = req.body.TB2;
            item.EDT = req.body.EDT2;
            item.LB = req.body.LB2;
            item.Cash = req.body.Cash2;
            item.Nets = req.body.Nets2;
            var newSales = new sales(item);
            newSales.save(function(err, data){
                if(err) {
                console.log(err);
                return res.status(500).send();
                }
            });
        };
        if(req.body.ID3 != "")
        {
            item.ID = req.body.ID3;
            item.Demo = req.body.Demo3;
            item.Close = req.body.Close3;
            item.UpSale = req.body.UpSale3;
            item.DownSale = req.body.DownSale3;
            item.MG = req.body.MG3;
            item.DP = req.body.DP3;
            item.CG = req.body.CG3;
            item.IO = req.body.IO3;
            item.SY = req.body.SY3;
            item.RO = req.body.RO3;
            item.TB = req.body.TB3;
            item.EDT = req.body.EDT3;
            item.LB = req.body.LB3;
            item.Cash = req.body.Cash3;
            item.Nets = req.body.Nets3;
            var newSales = new sales(item);
            newSales.save(function(err, data){
                if(err) {
                console.log(err);
                return res.status(500).send();
                }
            });
        };
        if(req.body.ID4 != "")
        {
            item.ID = req.body.ID4;
            item.Demo = req.body.Demo4;
            item.Close = req.body.Close4;
            item.UpSale = req.body.UpSale4;
            item.DownSale = req.body.DownSale4;
            item.MG = req.body.MG4;
            item.DP = req.body.DP4;
            item.CG = req.body.CG4;
            item.IO = req.body.IO4;
            item.SY = req.body.SY4;
            item.RO = req.body.RO4;
            item.TB = req.body.TB4;
            item.EDT = req.body.EDT4;
            item.LB = req.body.LB4;
            item.Cash = req.body.Cash4;
            item.Nets = req.body.Nets4;
            var newSales = new sales(item);
            newSales.save(function(err, data){
                if(err) {
                console.log(err);
                return res.status(500).send();
                }
            });
        };
        if(req.body.ID5 != "")
        {
            item.ID = req.body.ID5;
            item.Demo = req.body.Demo5;
            item.Close = req.body.Close5;
            item.UpSale = req.body.UpSale5;
            item.DownSale = req.body.DownSale5;
            item.MG = req.body.MG5;
            item.DP = req.body.DP5;
            item.CG = req.body.CG5;
            item.IO = req.body.IO5;
            item.SY = req.body.SY5;
            item.RO = req.body.RO5;
            item.TB = req.body.TB5;
            item.EDT = req.body.EDT5;
            item.LB = req.body.LB5;
            item.Cash = req.body.Cash5;
            item.Nets = req.body.Nets5;
            var newSales = new sales(item);
            newSales.save(function(err, data){
                if(err) {
                console.log(err);
                return res.status(500).send();
                }
            });
        };

        res.redirect('/inventory');
    });

    app.get('/outStocks', isLoggedIn, function(req, res){
        res.render('outStocks');
    });

    app.post('/outStocks', isLoggedIn, function(req, res){
        var item = {
            ID: req.body.ID,
            Location: req.body.Location,
            Date: req.body.Date, 
            Shift: req.body.Shift, 
            MG: req.body.MG,        
            DP: req.body.DP,         
            CG: req.body.CG,         
            IO: req.body.IO,         
            SY: req.body.SY,      
            RO: req.body.RO,         
            TB: req.body.TB,         
            EDT: req.body.EDT,        
            LB: req.body.LB 
        };
        var newStocks = new stocks(item);
        newStocks.save(function(err, data){
            if(err) {
                console.log(err);
                return res.status(500).send();
            };
        });
        res.redirect('/inventory');
    });

    app.post('/deleteStocks', isLoggedIn, function(req, res){
        stocks.remove({_id: req.body.deleteStocks}, function(err){
                if(err){
                    console.log('error occured');
                };
            });
        res.redirect('/inventory');

    });

    app.get('/inventory', isLoggedInIC, function(req,res){
        if(req.param("invDate")!=undefined)
        {
            var currentDate = new Date(req.param("invDate"));
            var yestDate = new Date(req.param("invDate"));
        }
        else
        {
            var currentDate = new Date();
            var yestDate = new Date();
        };
        yestDate.setTime(yestDate.getTime() - 57600000);
        yestDate = yestDate.toISOString();
        yestDate = yestDate.substring(0,10);
        currentDate.setTime(currentDate.getTime() + 28800000);
        currentDate = currentDate.toISOString();
        var todayDate = currentDate.substring(0,10);
        leftStocks.findOne({Date: yestDate},function(err, leftStocksYst){
            stocks.find({Date: todayDate}, function(err, stocksToday){
                accounts.find({}, function(err, accounts){
                sales.find({Date: todayDate}, function(err, salesToday){
                    if(leftStocksYst==null)
                    {
                        leftStocksYst = 0;
                    };
                    if(stocksToday==null)
                    {
                        stocksToday = 0;
                    };
                    if(salesToday==null)
                    {
                        salesToday = 0;
                    };
                    console.log(accounts);
                    
    
    
                    res.render('inventory', {date: todayDate, leftStocks: leftStocksYst, broughtOut: stocksToday, sales: salesToday, accounts: accounts, finalMG: 0, finalDP: 0, finalCG: 0, finalIO: 0, finalSY: 0, finalRO: 0, finalTB: 0, finalEDT: 0, finalLB: 0, finalCash: 0, finalNets: 0, outMG: 0, outDP: 0, outCG: 0, outIO: 0, outSY: 0, outRO: 0, outTB: 0, outEDT:0, outLB:0, eventMG: 0, eventDP:0, eventCG: 0, eventIO:0, eventSY:0, eventRO:0, eventTB:0, eventEDT:0, eventLB: 0, eventCash:0, eventNets:0});
                });     
            });
        });      
    });
    });

    app.post('/addLeftStocks', isLoggedIn, function(req, res){
        var item = {
            Date: req.body.date,
            MG: req.body.MG,
            DP: req.body.DP,
            CG: req.body.CG,
            IO: req.body.IO,
            SY: req.body.SY,
            RO: req.body.RO,
            TB: req.body.TB,
            EDT: req.body.EDT,
            LB: req.body.LB
        };
        var newLeftStocks = new leftStocks(item);
        newLeftStocks.save(function(err, data){
            if(err) {
                console.log(err);
                return res.status(500).send();
            }
            
        });
        res.redirect('/inventory');
    });

    app.get('/updateInfo', isLoggedIn, function(req, res){
        var loginInfo = req.user;
        var userID = loginInfo.local.username;
        accounts.findOne({ID: userID}, function(err, data){
            res.render('updateInfo', {message: req.flash('updateError'), accounts: data});
        });
    });

    app.post('/updateInfo', function(req, res){
        var loginInfo = req.user;
        if(req.body.ID == "")
        {
            req.body.ID = loginInfo.local.username;
        };
        accounts.findOne({ID: loginInfo.local.username}, function(err, data){
        if((loginInfo.local.username != req.body.ID) && (data.Manager==false))
        {
            req.flash('updateError', 'Please use Correct ID');
            res.redirect('/updateInfo');
        }
        else
        {
            accounts.update({ID: req.body.ID}, {ID: req.body.ID}, {upsert: true}, function(err, raw){
                    if (err) return handleError(err);
                    console.log('The raw response from Mongo was ', raw);
            });
            if(req.body.firstName != "")
            {
                accounts.update({ID: req.body.ID}, {firstName: req.body.firstName}, function(err, raw){
                    if (err) return handleError(err);
                    console.log('The raw response from Mongo was ', raw);
                 });
            };
            if(req.body.lastName != "")
            {
                accounts.update({ID: req.body.ID}, {lastName: req.body.lastName}, function(err, raw){
                    if (err) return handleError(err);
                    console.log('The raw response from Mongo was ', raw);
                 });
            };
            if(req.body.Designation != "")
            {
                accounts.update({ID: req.body.ID}, {Designation: req.body.Designation}, function(err, raw){
                    if (err) return handleError(err);
                    console.log('The raw response from Mongo was ', raw);
                 });
            };
            if(req.body.trainerID != "")
            {
                accounts.update({ID: req.body.ID}, {trainerID: req.body.trainerID}, function(err, raw){
                    if (err) return handleError(err);
                    console.log('The raw response from Mongo was ', raw);
                    });     
            };
            if(req.body.teamName != "")
            {
                accounts.update({ID: req.body.ID}, {teamName: req.body.teamName}, function(err, raw){
                    if (err) return handleError(err);
                    console.log('The raw response from Mongo was ', raw);
                 });
            };
            if(req.body.teamTag != "")
            {
                accounts.update({ID: req.body.ID}, {teamTag: req.body.teamTag}, function(err, raw){
                    if (err) return handleError(err);
                    console.log('The raw response from Mongo was ', raw);
                });    
            };
            if(req.body.Nationality != "")
            {
                accounts.update({ID: req.body.ID}, {Nationality: req.body.Nationality}, function(err, raw){
                    if (err) return handleError(err);
                    console.log('The raw response from Mongo was ', raw);
                });    
            };
            if(req.body.Email != "")
            {
                accounts.update({ID: req.body.ID}, {Email: req.body.Email}, function(err, raw){
                    if (err) return handleError(err);
                    console.log('The raw response from Mongo was ', raw);
                });    
            };
            if(req.body.mobileNumber != "")
            {
                accounts.update({ID: req.body.ID}, {mobileNumber: req.body.mobileNumber}, function(err, raw){
                    if (err) return handleError(err);
                    console.log('The raw response from Mongo was ', raw);
                });    
            };
            if(req.body.IC != "")
            {
                accounts.update({ID: req.body.ID}, {IC: req.body.IC}, function(err, raw){
                    if (err) return handleError(err);
                    console.log('The raw response from Mongo was ', raw);
                });    
            };
            if(req.body.Manager != "")
            {
                accounts.update({ID: req.body.ID}, {Manager: req.body.Manager}, function(err, raw){
                    if (err) return handleError(err);
                    console.log('The raw response from Mongo was ', raw);
                });    
            };
            if(req.body.Master != "")
            {
                accounts.update({ID: req.body.ID}, {Master: req.body.Master}, function(err, raw){
                    if (err) return handleError(err);
                    console.log('The raw response from Mongo was ', raw);
                });    
            };
            if(req.body.Gender != "")
            {
                accounts.update({ID: req.body.ID}, {Gender: req.body.Gender}, function(err, raw){
                    if (err) return handleError(err);
                    console.log('The raw response from Mongo was ', raw);
                });    
            };
            res.redirect('/profile');   
        };
        });
    });

    //show add sales form
    app.get('/addSales', isLoggedIn, function(req, res) {
        res.render('addSales');
    });

    //process the sales form
    app.post('/addSales', function(req, res){
        console.log(req.body.date);
        var item = {
            ID: req.body.ID,
            Date: req.body.date,
            Type: req.body.type,
            Shift: req.body.Shift,
            Location: req.body.location,
            Demo: req.body.demo,
            Close: req.body.close,
            UpSale: req.body.upSale,
            DownSale: req.body.downSale
        };
        var newSales = new sales(item);
        newSales.save(function(err, data){
            if(err) {
                console.log(err);
                return res.status(500).send();
            }
            
        });
        return res.redirect('/addSales');
    });

    app.get('/showSales', isLoggedIn, function(req, res){
        var loginInfo = req.user;
        var conditions = {
            ID: loginInfo.local.username
        };
        if (req.param("Date")!="")
        {
            conditions.Date = req.param("Date");
        };
        if(req.param("Type")!="Both")
        {
            conditions.Type = req.param("Type");
        };
        if(req.param("Shift")!="All")
        {
            conditions.Shift = req.param("Shift");
        };
        if(req.param("Location")!="")
        {
            conditions.Location = req.param("Location");
        };
        if(req.param("Demo")!="")
        {
            conditions.Demo = req.param("Demo");
        };
        if(req.param("Close")!="")
        {
            conditions.Close = req.param("Close");
        };
        if(req.param("UpSale")!="")
        {
            conditions.UpSale = req.param("UpSale");
        };
        if(req.param("DownSale")!="")
        {
            conditions.DownSale = req.param("DownSale");
        };
        sales.find(conditions, function(err, data){
            console.log(data)
            res.render('showSales', {sales: data});
        })
    });

    app.post('/deleteSales', isLoggedIn, function(req,res){
        var salesID = [req.body.deleteThis];
        var arrayLength = salesID.length;
        for(var x = 0; x < arrayLength; x++){
            sales.remove({_id: salesID[x]}, function(err){
                if(err){
                    console.log('error occured');
                };
            });
        };
        res.redirect('/showSales');
    });

    app.post('/deleteSalesInv', isLoggedIn, function(req,res){
        var salesID = req.body.deleteSales;
        sales.remove({_id: salesID}, function(err){
            if(err){
                console.log('error occured');
            };
        });
        res.redirect('/inventory');
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedInIC(req, res, next) {
    var loginInfo = req.user;
    var userID = loginInfo.local.username;
    accounts.findOne({ID: userID}, function(err, data){
        if ((req.isAuthenticated()) && (data.IC==true))
        {
            return next();
        }
    // if they aren't redirect them to the home page
        req.flash('notAuthorized','Not a IC')
        res.redirect('/profile');

    });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
    {
        return next();
    }
    // if they aren't redirect them to the home page
    res.redirect('/');
};
