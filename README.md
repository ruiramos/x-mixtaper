x-mixtaper
==========

x-mixtaper is a Web Components (Polymer based) audio player with playlist functionality built for sharing/publishing mixtapes and playlists.

It reads what to play from the `mixtapes.json`, which supports several playlists.

* now with video support
* up'd to polymer 1.0
* playlist is a property, can be dynamically changed

## Demo
-..

## Install
Install the component using [Bower](http://bower.io/):

```sh
$ bower install x-mixtaper --save
```

## Usage
1. Import Web Components' polyfill:

    ```html
    <script src="bower_components/platform/platform.js"></script>
    ```

2. Import Custom Element:

    ```html
    <link rel="import" href="bower_components/x-mixtaper/dist/x-mixtaper.html">
    ```

3. Add your own mixtapes.json and mp3s (or copy the samples provided)

    ```json
    {
      "tape1": {
        "title": "My first mixtape",
        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "songs": [{
          "title": "Ukulele Song",
          "artist": "Rui Ramos",
          "file":"/mp3/1/RuiRamos-UkuleleSong.mp3",
          "length": "04:22"
        },{
          "title": "I Dreamed a Dream",
          "artist": "Wing",
          "file":"/mp3/1/02 I Dreamed a Dream.m4a",
          "length": "03:21"
        }]
      }
    }
    ```


4. Start using it!

    ```html
    <x-mixtaper tape="tape1"></x-mixtaper>
    ```

Remember that for the audio skipping to work you must be using a web server with HTTP 1.1 byte-range requests support.

Feel free to use it and submit pull requests!

## Development

In order to run it locally you'll need to fetch some dependencies and a basic server setup.

* Install [Bower](http://bower.io/) & [Grunt](http://gruntjs.com/):

    ```sh
    $ [sudo] npm install -g bower grunt-cli
    ```

* Install local dependencies:

    ```sh
    $ bower install && npm install
    ```

* To test your project, start the development server and open `http://localhost:8000`.

    ```sh
    $ grunt server
    ```

* To build the distribution files before releasing a new version.

    ```sh
    $ grunt build
    ```

* To provide a live demo, send everything to `gh-pages` branch.

    ```sh
    $ grunt deploy
    ```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

[MIT License](http://opensource.org/licenses/MIT)
