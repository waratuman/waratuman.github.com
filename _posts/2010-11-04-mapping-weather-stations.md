---
title: Mapping Weather Stations
author: James R. Bracy
layout: post
---

[Weather Graphics](http://www.weathergraphics.com/) maintains a list of
weather station identifiers. After seeing [polymaps.org](http://polymaps.org/)
I ventured out to do something similar to what [Aaron Straup Cope](http://www.aaronland.info/)
did generating [Fickr Shapetiles](http://polymaps.org/ex/flickr.html).

Polymaps is a great tool for interacting with maps if you don't want to use
[Google's solution](http://maps.google.com/). The initial setup is surprisingly
simple and the integration with services like [CloudMade](http://www.cloudmade.com/)
is great.

Initially I used the [Polymaps API](http://polymaps.org/docs/) to load the list
of weather stations and display them on the map using javascript. This was extremely
easy using [GeoJSON](http://geojson.org/). I simply transformed the CSV file
into the GeoJSON format. The end result was a 10MB HTML file that looked great!
The only downside was that it was really slow. I needed a solution that was
faster and wouldn't take a minute to load.

Tiles were an obvious option to reduce the load time and allow the map to be
really responsive. I started out by surveying the open source solutions on the
internet. Many exists, but I really couldn't get many of them to work. If
given more time, I'm sure I could generate the tiles using these tools, and in
retrospect it may have been worth it. Now I needed to create the tile images
by myself. The Quartz framework for the Mac is wonderful, and since I have had
experience with [Objective-C](http://en.wikipedia.org/wiki/Objective-C) before,
it was an obvious solution (granted it limited my ability to generate tiles to
Mac systems).

Generating the tiles required knowing how to create a [map projection](http://en.wikipedia.org/wiki/Map_projection).
I went with the [Mercator Projection](http://en.wikipedia.org/wiki/Mercator_projection)
since most online tools use this and I could easily see if the tiles I was
generating actually were correct.

One weekend later I generated my first tiles!

<img src="/resources/images/posts/2010-11-04-weather-station-map.png" alt="Goldtouch Keyboard" width="780" />

It took some playing around and understanding of coordinate systems (the
[WGS 84](http://en.wikipedia.org/wiki/World_Geodetic_System)) in this case to
get everything right. The end result was dead on!

One catch. I couldn't generate tiles for zoom levels greater than 5. It was
taking forever just to do this. The reason is that for each zoom level the
number of tiles grows by a huge number. Zoom level 1 requires 4 tiles, 2 requires
16 tiles, 3 requires 64 and so forth. The number of tiles for any zoom level is
given my the equation `2 ^ (2 * z)` where `z` is the zoom level.

Eventually I made it to zoom level 11. I was able to do this by not drawing
tiles that had nothing in them. The maximum tiles that I would need to generate
would be the same as the number of stations. This is great, now it only takes
a few minutes to generate these tiles. With more tuning I could get down to
zoom level 18 without a problem, but for now I'm happy with 11.

At some point I hope to do more with the weather data provide and do some
visualizations with it. But for a weekend project, this is hard to beat.

Click [here](http://tiles.heroku.com) to see the final map!