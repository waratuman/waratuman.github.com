---
title: Apple Push Notifications with Heroku
author: James R. Bracy
layout: post
font: sans
---

Most people think they can't deliver push notifications to [iOS](http://www.apple.com/iphone/ios4/) devices from
[Heroku](http://www.heroku.com) because there is no obvious way to maintain maintain a persistent
connection. I started by looking at [Urban Airship](http://urbanairship.com/)
and other push services, but decided to see how far I could get with Heroku.
You will find that Heroku takes the cake and steals the &#8220;easy-to-use push
notification&#8221; tag line from Urban Airship.

In my case I used the [APN on Rails](https://github.com/PRX/apn_on_rails) gem
in combination with [Resque](https://github.com/defunkt/resque). Here is a quick
peek at the code:

    class Jobs::APN::DeliverNotifications
      @queue = "apn"

      def self.perform
        APN::Notification.send_notifications
      end

    end

And that is just about it! [Resque Scheduler](https://github.com/bvandenbos/resque-scheduler)
is set to run this task every min. If there are no notifications, nothing is
sent, otherwise all of the notifications that have built up over the last minute
get sent out in a batch.

This solution has worked for just about a year and is dead simple.

Processing APN feedback is dead simple too:

    class Jobs::APN::Feedback < Job
      @queue = "#{RAILS_ENV}::apn"
      
      def self.perform
        APN::Feedback.process_devices
      end
      
    end

Here is what a controller would look like. This handles the registering
of an iOS device, subscribing, and unsubscribing from certain events:
  
    class Api::ApnController < ApplicationController
      skip_before_filter :verify_authenticity_token

      def create
        APN::Device.create(:token => params[:token])
        render :text => "", :status => 200
      end

      def subscribe
        device = params['token'] ? APN::Device.find_or_create_by_token(:token => params['token']) : nil
        event = Event.first(:conditions => {:id => params['event_id']})
        subscription = Subscription.new :device => device, :event => event
      
        status = 200
        if device && event && subscription.valid?
          subscription.save
        else
          status = 422
        end
        render :text => "", :status => status
      end

      def unsubscribe
        device = APN::Device.find_or_create_by_token(:token => params['token'])
        event = Event.first(:conditions => {:id => params['event_id']})
        subscription = Subscription.first(:conditions => {:device_id => device.id, :event_id => event.id})
        subscription.delete if subscription
        render :text => "", :status => 200
      end

    end

Simple.