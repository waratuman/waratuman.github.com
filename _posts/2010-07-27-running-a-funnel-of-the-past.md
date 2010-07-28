---
title: Running a Funnel of the Past
author: James R. Bracy
layout: post
---

Many companies let you run funnel analysis on a website, and they do a great
job at it. I, however, don't want to wait for the numbers. The downside of
using these service (Google Analytics, KISSmetrics, Mixpanel) is that results
come in hours or days later. This is simply because that data doesn't get
collected until you set the system up to collect data. Then some time must
pass before you gather a large enough sample. How about this, collect all the
data pertaining to each of the request and run queries against to reproduce a
funnel analysis. This approach allows you to run metrics over historical data.
Once the data collection is setup, a new funnel analysis is only hours away.
And the best part is that you can have a huge sample set. Of course this comes
with a cost: data. The site I was working with handles about 80k hits a day.
Four days of data rolls in at 2.8GB of data.

The website is a vanilla Rails application. The data collection is done in a
`after_filter` in the `ApplicationController`. The filter will capture all
headers and any instance variables that have been set and any other data the
request may have with it. The data is then shipped off to a MongoDB, hosted by
[mongohq](http://mongohq.com/). Now I have the data of every single request at
my fingertips.

When I need to run a funnel analysis I simply write a series of map reduce
queries. This is incredibly powerful because now if someone comes to me asking
for some numbers I can get meaningful results in about an hour. Compare that
to setting up events for KISSMetrics and waiting days for the data.

If a company were able to do this, I would be significantly impressed.