module.exports = {
    apps : [{
      script: 'server.js',
    }],
     
    // Deployment Configuration
    deploy : {
      production : {
         "user" : "www-data",
         "host" : ["example.com"],
         "ref"  : "origin/master",
         "repo" : "git@github.com:Username/repository.git",
         "path" : "/var/www/{{appName}}",
         "post-deploy" : "npm install"
      }
    }
  };