
<h1 align="center"> Convert and generate ObjectURL of WebVTT (Web Video Text Track) from srt (SubRip Text) format subtitle </h1>
<p align="center">
  HTMLMediaElement/Video doesn't support ```.srt``` format subtitle as its ```<track>``` source - in order to show captions of your video track either you have to convert the SRT file to WebVTT or write it on your own. Because ```<track src="VALID URL SCHEME">``` requires a valid URL of ```.vtt``` formated subtitle track.
  This library will let you do this on fly.
</p>
<p align="center">
  <a href="https://www.npmjs.org/package/srt-webvtt"><img src="https://img.shields.io/npm/v/srt-webvtt.svg?style=flat-square" /></a>
  <a href="https://travis-ci.org/imshaikot/srt-webvtt"><img src="https://api.travis-ci.org/imshaikot/srt-webvtt.svg" /></a>

  <a href="https://github.com/imshaikot/srt-webvtt/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/imshaikot/srt-webvtt.svg">
  </a>

  <a href="http://standardjs.com">
    <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg" />
  </a>
</p>

## Example

<a href="https://imshaikot.github.io/srt-webvtt/">https://imshaikot.github.io/srt-webvtt/</a>

## Installation

```bash
$ npm install srt-webvtt --save
```
OR umd builds are also available
```
<script src="https://unpkg.com/srt-webvtt/umd/index.min.js"></script>
```

## Getting Started

This is a tiny library to get screenshots from video tracks either from your local filesytem OR same-origin based URL.

```js
// Using ES6
import VideoToThumb from 'video-thumb-generator'; // This is a default export, so you don't have to worry about the import name

// Not using ES6
var VideoToThumb = require('video-thumb-generator');
```

## Example and API

The constructor accepts 3 types of value as its parameter. 
  1. HTML5 File Object (Ex. ```dataTransfer.files[0]```)
  2. Any existing/active HTML Video element's DOM object/instance (Ex. ```document.getElementById('video')```)
  3. Same origin video URL as string. (Ex. ```'http://mydomain.com/video.avi'```)
```js
const videoToThumb = new VideoToThumb(file.files[0]); // OR you could pass instantiate new VideoToThumb('http://mydomain.com/video.mp4') OR maybe new VideoToThumb(document.getElementById('video'))
```
The instance of VideoToThumb contains a bunch of method (which are chained) but to get strated you have to call the `load()` method before any other chained method being called

```js
const videoToThumb = new VideoToThumb(file.files[0]);
videoToThumb
.load(); // This will start the process
```
After the `.load()` being called then you're free to call other methods. Like `.positions([])` method - this method will accept a parameter as an Array of the positions (in second) of video duration where you want to capture the screenshots. The Defualt value is `[1]`
```js
const videoToThumb = new VideoToThumb(file.files[0]);
videoToThumb
.load()
.positions([223, 555, 632, 104]);
```
In order to set the returned screenshots size - you can call `.size([320, 240])` - default is `[320, 240]`
```js
const videoToThumb = new VideoToThumb(file.files[0]);
videoToThumb
.load()
.positions([223, 555, 632, 104])
.size([480, 360]); // 480x360 pixel
```
You can also customize the screenshot coordinates by calling `xy([0, 0])` this method. This method will decide from which coordinate to start capturing the snapshots.
```js
const videoToThumb = new VideoToThumb(file.files[0]);
videoToThumb
.load()
.positions([223, 555, 632, 104])
.xy([0, 0])
.size([480, 360]);
```
Another method `type()` - this method to tell whether you want the image to be returned as `base64` dataURL OR HTML5 `objectURL` - default `'objectURL'`
```js
const videoToThumb = new VideoToThumb(file.files[0]);
videoToThumb
.load()
.xy([0, 0])
.size([480, 360])
.positions([223, 555, 632, 104])
.type('base64')
```
In order to track errors during the process (media, canvas or input) - this method will help you to track and this method accept a parameter of `errorCallback`
<b>Caution</b>: Few Media Errors are still silent and won't reach the error callback (I'll work to get it done)
```js
const videoToThumb = new VideoToThumb(file.files[0]);
videoToThumb
.load()
.xy([0, 0])
.size([480, 360])
.positions([223, 555, 632, 104])
.type('base64')
.error(function(err) {
  console.log(JSON.stringify(err));
})
```
And finally the `done(callback)` method. Remember the `load()` method to start and now `done` to end the process and your job done. This method accept a parameters `successCallback`.
The success callback returns the successive screenshots that have been taken as an array.
```js
const videoToThumb = new VideoToThumb(file.files[0]);
videoToThumb
.load()
.xy([0, 0])
.size([480, 360])
.positions([223, 555, 632, 104])
.type('base64')
.error(function(err) {
  console.log(JSON.stringify(err));
})
.done(function(imgs) {
  imgs.forEach(function(img) {
    var elem = new Image();
    elem.src = img;
    document.body.appendChild(elem);
  })
})
```

Note: All methods are chained, that means every method returns the same instance/context and that means you can call any method in any order but `load()` method must be called at the top and `done()` at the bottom, unless you want some silent errors ;)

<b>Warnings:</b> few errors are still silent and won't reach the error callback. Feel free to make pull request.

## LICENSE

MIT
