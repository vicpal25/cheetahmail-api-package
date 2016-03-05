var https  = require('https');
var fs    = require('fs');
var os    = require('os');

module.exports = function(credentials) {

  if(typeof credentials === "undefined") return "invalid credentials";

  var user_name = 'tribune_tribpub_api'; //TODO: Set as a parameter
  var clear_txt = 'W2eT9D6p!3Hz6';

  var cheetahmail = {
    cookiefile: "cheetah_login1_cookie.txt",
    // object literals can contain properties and methods.
    // e.g we can define a further object for module configuration:
    endpoints: {
      auth_endpoint: "https://ebm.cheetahmail.com/api/login1/",
      data_endpoint: "https://ebm.cheetahmail.com/api/setuser1/",
      bulk_endpoint: "https://app.cheetahmail.com/api/bulkmail1/"
    },
    setpath: function () {
      this.cookiepath = os.tmpdir() + "/" + this.cookiefile;
    },
    checkpath: function() {
      try {
         fs.accessSync(this.cookiepath);
         return true;
       } catch(ex) {
         return false;
       }
    },
    cookiefileage: function() {

      // fs.stat(path.join(this.path, file), function(err, stat) {
      //       var endTime, now;
      //       if (err) {
      //         return console.error(err);
      //       }
      //       now = new Date().getTime();
      //       endTime = new Date(stat.ctime).getTime() + 3600000;
      //       if (now > endTime) {
      //         return rimraf(path.join(uploadsDir, file), function(err) {
      //           if (err) {
      //             return console.error(err);
      //           }
      //           console.log('successfully deleted');
      //         });
      //       }
      //     });

    },
    iscookievalid: function() {
      if(!this.checkpath()) {
          return false;
      }

      return true;

    },
    refreshcookie: function() {
      var body = '';
      var postRequest = {
          host: 'ebm.cheetahmail.com',
          path: "/api/login1/?name=" + user_name + "&cleartext=" + clear_txt + "&SOURCE=test",
          method: "GET",
          port: 443,
          headers: {
              'Cookie': this.cookiepath
          }
      };
      console.log(this.cookiepath);

      var req = https.request( postRequest, function( res )
      {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        // res.setEncoding('utf8');
        // res.on('data', (chunk) => {
        //   console.log(`BODY: ${chunk}`);
        // });
        // res.on('end', () => {
        //   console.log('No more data in response.')
        // })
        // res.on( "end", function() { require( "fs" ).writeFile( "output.html", buffer ); } );

      });

      req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
      });

      req.write( body );
      req.end();

      // $endpoint = $this->auth_endpoint."?name=$this->user_name&cleartext=$cleartext&SOURCE=hi";
      // $c = curl_init($endpoint);
      // curl_setopt($c, CURLOPT_RETURNTRANSFER, true);
      // curl_setopt($c, CURLOPT_COOKIEJAR, $this->cookie_file);
      // $response = curl_exec($c);
      // error_log('Cheetah login1 response: '.trim($response));
      // curl_close($c);


    },
    load: function() {
      this.setpath();
    }
    // // output a value based on the current configuration
    // reportMyConfig: function () {
    //   console.log( "Caching is: " + ( this.myConfig.useCaching ? "enabled" : "disabled") );
    // },
    //
    // // override the current configuration
    // updateMyConfig: function( newConfig ) {
    //
    //   if ( typeof newConfig === "object" ) {
    //     this.myConfig = newConfig;
    //     console.log( this.myConfig.language );
    //   }
    // }
  };

  cheetahmail.load();
  console.log(cheetahmail.refreshcookie());

}
