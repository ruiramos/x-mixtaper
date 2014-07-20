x-mixtaper
==========

x-mixtaper is a Web Components (Polymer) audio player with playlist functionality built for sharing/publishing mixtapes and playlists.

It reads what to play from the `songList.json`, which supports several mixtapes.

## Demo
[Here](http://mix.ruiramos.com/)

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
    <link rel="import" href="bower_components/x-mixtaper/x-mixtaper.html">
    ```

3. Add your own songList.json and mp3s (or copy the samples provided)

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
