var express = require('express');
var router = express.Router();
const sendcontact = require('../libs/send-request');
const dbcore = require('mariadb');
const sendmail = require('nodemailer');
const { sprintf } = require('sprintf-js');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Fibratízate | ETB' });
});

router.post('/', function (req, res, next) {
  res.status();
  res.send("");
});
router.get('/gracias', function (req, res, next) {
  res.render('gracias', { title: 'Gracias' });
});


router.post('/gracias', function(req, res, next){
  res.render('gracias', { title: 'Gracias' });

});

router.get('/callme', function (req, res, next) {
  res.status(400);
  res.send("Bad Request");
});


router.post('/callme', function (req, res, next) {
  res.status(200);

  /**
   * Enviamos el número móvil al endpoint de Kerberus
   */
  sendcontact.request(req.body.mobile, (e, r, b)=> {
    if (e)
    {
      console.log(e);
      return res.render('confirm', { message: 'Pronto nos comunicaremos contigo' });;
    }
    if (b)
    {
      console.log(b);
    }
  })
  if (typeof req.body.name !== 'undefined') {
    const mariadb = dbcore.createConnection(
      {
        host: 'localhost',
        user: 'root',
        password: 'devel',
        port: 3306,
        database: 'planesetb'
      }
    ).then((o) => {
      mariadb.then((conn) => {
        conn.query(sprintf("INSERT INTO datos VALUES ('%s','%d','%s','%s','%d')",
          req.body.name, req.body.mobile, req.body.email, req.body.city, new Date().getTime())
        ).then((res) => {
          console.log('Insert OK, sending email...');
        }).catch((e) => {
          console.log('Insert failed, ' + e);
        })
      }).catch((e) => {
        console.log(e);
      });
      const makeEmail = sendmail.createTransport({
        host: 'smtp.gmail.com',
        auth: {
          user: 'etb.fibra2018@gmail.com',
          pass: '378z0iBfibra'
        }
      });
      makeEmail.sendMail({
        from: 'testing@gmail.com',
        to: 'etb.fibra2018@gmail.com',
        subject: 'Testing ETB',
        text: sprintf('A continuacion se detallan los datos de usuario:\n\n Nombre: %s\nTeléfono de contacto: %s\nEmail: %s\nCiudad: %s\n',
          req.body.name, req.body.mobile, req.body.email, req.body.city
        )
      }, (error, info) => {
        if (error) {
          console.log(sprintf('Email sending was failed, reason => %s', error));
        } else {
          console.log("Email sent! Perfect.");
        }
      });
    }).catch((e) => {
      console.log(sprintf('Binding to MariaDB Server was failed, reason => %s', e));
    });
  }

  /**
   * El usuario siempre recibe confirmación, sin importar lo que suceda en el backend.
   */
  res.render('confirm', { message: 'Pronto nos comunicaremos contigo' });
});
module.exports = router;
