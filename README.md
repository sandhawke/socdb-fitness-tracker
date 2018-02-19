This is a simple demo of socdb, as a trivial fitness activity tracker
application.  It's a good starting point for trying out things with
socdb.

## Try It Online

Try out the service at https://socdb.org/fitness

On Twitter, look at your own "Tweets & replies" so you can see what
the app is posting for you.  It prefixes the tweets with @msgsink so
that people won't normally see them.

Get a friend to try it, too.  If you follow each other, you should be
able to see each other's activity in the app.

## Install Your Own Copy

1. Set up a server with its own domain name.  Get TLS working, with nginx proxying for port 1978 at /fitness.

2. Register it as a Twitter application and make a .secret.json file with your data, as per [this walkthrough](https://github.com/sandhawke/login-with-twitter)

3. Set up PostgreSQL with an user called `socdb`.  See [details for ubuntu](https://github.com/sandhawke/socdb/blob/master/using-postgres.md)

4. Optionally fork this repo, so you can more easily manage changes you make

5. Clone that forked repo, or mine if you didn't fork it:

```sh
$ git clone git://github.com/sandhawke/socdb-fitness-tracker
$ cd socdb-fitness-tracker
$ npm install
```

6. Start the server:

```sh
$ npm start
```

Alternatively, if you want it running long-term, use something like
pm2.  I use:

```sh
$ HOSTNAME=socdb.org PORT=1978 pm2 start socdb-server --name 'fitness'
$ pm2 save
```

7. Visit it in your browser.  Of course it will work perfectly the
first time.

## Make Some Changes

Try editing app.js and the other files.

The default server is configured to have your changes take effect when
you reload the web page in your browser.  No need to restart the server.

Things to try:

* let users enter a number of minutes for the activity
* let users add a description of what it is
* let indicate whether it was light, medium, or intense, etc.
* show activity with some graphics
