---
title: Analysis of Flight Predictions
author: James R. Bracy
category: articles
layout: post
tags:
  - FlightCaster
  - Statistics
extract: "<p>FlightCaster has an algorithm that predicts flight delays. Currently the only method of determining the accuracy of the predictions is the historical set of data that the algorithm is trained on. This is fine, but it would be interesting to see how the algorithm performs on flights of which the outcome is unknown (how it perform in the real world)&hellip;</p>"
---

FlightCaster has an algorithm that is used to predict
flights. Currently the only method of determining the accuracy of the
predictions is the historical set of data that the algorithm is
trained on. This is fine, but it would be interesting to see how the
algorithm performs on flights of which the outcome is unknown (how it
perform in the real world).

## Extracting Data from the Production System

In order to test the predictions a data-set must be build from the
production system that is use. Going back in history and collecting
the prediction on flights that have already been completed is a huge
undertaking and wouldn't result in the actual data that is necessary
to provide the wanted information. The goal is to track how the
algorithm performs in real-time, not on the past. This will also allow
another method of analysis to confirm the accuracy of the algorithm,
and the improvement of the production system over time.

Every hour predictions are gathered about every flight in the system
within 27 hours of departure and 3 hours after landing. The flight and
prediction data is then stored. One downside is that the flight
information is not gathered at specific intervals to the takeoff time
of the flight. Although this does present how the data is access by a
real user, so it may in fact be a better way of collecting the
data. So instead of predicting how good the predictions are at a
specific time `t` before the departure ranges need to be looked at.

The direct output of one view of the whole system is a file that
contains the information about every flight and its predictions for
a specific hour. So there are many flights represented in each of
these outputs. The output files are then stored on S3 for later
analysis.

## Understanding the Metrics to be Extracted

The end result of all the analysis to be performed is a 3 dimensional
matrix that is `3` &times; `3` &times; `24` in size. The analysis will
report the accuracy of the predictions in hour intervals up to 24
hours prior to completion of the flight. So instead this can be
thought of as 24 `3` &times; `3` matrices with each of the 24
representing a specific hour.

The columns present the actual data and the rows the predictions. The
1st column and row stand for on-time. If a flight is actually on-time
and FlightCaster predicted that it would be on-time, the value in this
position is incremented. Similarly the second column and row stands
for minor delays and the third column and row for major delays.

Another example for clarification: If a flight was predicted to be
on-time 1 hour before departure but the flight actually experienced a
major delay, the value in the 1st row and 3rd column of the 2nd graph
would be incremented.

## Method of Implementation

<img class="right"
src="/resources/images/articles/2010-01-22-analysis-of-flight-predictions.png" alt="">

The input (what is captured from the production system) is a view
that presents all flights within that hour. This is a fine method to
capture the data, but the preferred view of doing the analysis would
present the a single flight and give a snapshot of the flight
information and prediction at hour intervals until the flight is
completed. This step is not necessary, however, it makes the
following analysis easier to perform. So the first task in
analyzing the data is to transform it from what I will call the *hour
based view* to the *flight based view*. Both views contain the same
information, just in a different form.

After the initial transformation each of the flights, represented in a
*flight based view*, will be converted to the matrix describe in
*Understanding the Metrics to be Extracted*.

The next and final step before presented the data is to combine each
of matrices until one matrix is left.

After this point a simple GUI interface will be made for the
business folk to understand.

## Additional information to Capture

Beside the basic information, it would be nice to know the mean, mode,
average, and standard deviation of the values given in the matrix.

And now for the implementation&hellip;
