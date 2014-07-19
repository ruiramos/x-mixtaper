x-mixtaper
==========

x-mixtaper is a Polymer audio player with playlist functionality, built for sharing/publishing mixtapes.

It reads what to play from the `songList.json`, which supports several mixtapes.

## Demo
Soon

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

3. Start using it!

    ```html
    <x-mixtaper tape="tapeId"></x-mixtaper>
    ```

Remember that for the audio skipping to work you must be using a web server with HTTP 1.1 byte-range requests support.

Feel free to use it and submit pull requests!
