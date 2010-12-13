---
title: The Whole Picture
author: James R. Bracy
layout: post
---

Recently I started working with a new group of people. The system that we work
on has to handle a significant amount of load. The front end servers are based
on PHP. [Memcached](http://memcached.org/) is used for caching. There are a
set of servers that provide several 'core services' to the rest of the
platform. Behind those sit a database and some [Redis](http://redis.io/) servers.

The surprising thing is that many of the people I work with only have small
view of what is going on. As a result people make decisions and don't fully
understand the implications of it. Some don't even know how many front end
servers there are, and they are programming on the front end.

Decisions, especially on a larger engineering team, need to take into account 
the whole system. A simple query to the database here or there may lead to the
database getting hammered when under intense load.

It takes time to understand any system. The time spent will help build a great
performing team.