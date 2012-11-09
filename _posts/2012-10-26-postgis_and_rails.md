---
title: PostGIS and Rails
author: James R. Bracy
layout: post
---

[PostGIS](http://postgis.refractions.net/) is and extension for
[PostgreSQL](http://www.postgresql.org/) that adds support for geographic
objects. [Daniel Azuma](http://www.daniel-azuma.com/) has developed a suite of
tools for [Rails](http://rubyonrails.org/) to process geographic data.

Working with geo-spacial data has gotten easier, but setting up
an environment, is still a bit of work. This tutorial will walk through
setting up [PostGIS](http://postgis.refractions.net/) for [Rails](http://rubyonrails.org/).

## Dependencies

This tutorial assumes that you are running
[Mac OS X](http://www.apple.com/osx/) and have the following installed:

- [XCode](https://developer.apple.com/xcode/)
- [Homebrew](http://mxcl.github.com/homebrew/)
- [Ruby](http://www.ruby-lang.org/en/)
- [Rails](http://rubyonrails.org/)

With all of the above setup the first thing that we need to install is
[PostgreSQL](http://www.postgresql.org/) and
[PostGIS](http://postgis.refractions.net/).

    brew install postgres postgis

[Geos](http://trac.osgeo.org/geos/) and [Proj](https://trac.osgeo.org/proj/)
are both dependencies of [PostGIS](http://postgis.refractions.net/) and are
installed by [Homebrew](http://mxcl.github.com/homebrew/) with
[PostGIS](http://postgis.refractions.net/). Both of these are needed for the
[RGeo](http://dazuma.github.com/rgeo/) gem.

## Setting Up Rails

For this example we'll create a new [Rails](http://rubyonrails.org/)
application, if you are adding [PostGIS](http://postgis.refractions.net/)
support to your current [Rails](http://rubyonrails.org/) app then skip this
step.

    rails new geo_events
    cd geo_events

Open the `Gemfile` and add the following gems to it.

- [pg](http://rubygems.org/gems/pg)
- [rgeo](http://dazuma.github.com/rgeo/)
- [activerecord-postgis-adapter](http://dazuma.github.com/activerecord-postgis-adapter/)

The file should contain the following lines:

    gem 'pg'
    gem 'rgeo'
    gem 'activerecord-postgis-adapter'

If the `pg` gem has already been installed into your system and was build
against a different version of [PostgreSQL](http://www.postgresql.org/) you
need to reinstall it. Simply run `gem install pg`. The same goes for
[RGeo](http://dazuma.github.com/rgeo/) and
[PostGIS](http://postgis.refractions.net/). Run `gem install rgeo` to
reinstall the gem with native extensions.

The `activerecord-postgis-adapter` is the database adapter that will be using
instead of the normal `postgresql` adapter. Add the following line after
`require 'rails/all'` to `config/application.rb`.

    require 'active_record/connection_adapters/postgis_adapter/railtie'
    
The `config/application.rb` file should now look like:
    
    require File.expand_path('../boot', __FILE__)

    require 'rails/all'
    require 'active_record/connection_adapters/postgis_adapter/railtie'
    
    if defined?(Bundler)
      Bundler.require(*Rails.groups(:assets => %w(development test)))
    end
    
    module GeoEvents
      class Application < Rails::Application
        config.encoding = "utf-8"
        config.filter_parameters += [:password]
        config.active_support.escape_html_entities_in_json = true
        config.active_record.whitelist_attributes = true
        config.assets.enabled = true
        config.assets.version = '1.0'
      end
    end

Next update the `database.yml` file to make use of the new adapter and
geo-spacial extensions.

    development:
      adapter: postgis
      database: geoevents-dev
      encoding: utf8
      postgis_extension: postgis
      schema_search_path: '"$user", public, postgis'

Notice that the adapter was changed to `postgis` and the `postgis_extension`
and `schema_search_path` lines were added. The `postgis_extension` tells the
app to install the [PostGIS](http://postgis.refractions.net/) extensions to
the database when you run `rake db:create`. It will run commands similar to
the following:

    -- NOTE: These commands do not need to be run manually unless you are
    --       installing into a existing database.
    CREATE SCHEMA postgis;
    CREATE EXTENSION postgis WITH SCHEMA postgis;

The [PostGIS](http://postgis.refractions.net/) extensions are namespaced in
the database so that they aren't exported to the `db/schema.rb` file. Because
the extensions are stored in a different namespace the `schema_search_path`
line is added so that anytime a query is run it will look for tables or views
in the `postgis` path in addition to the default `"$user"` and `public` path.

Now bundle the app and create the database.

    bundle
    rake db:create

Verify that the extensions are installed with `psql`.

    psql geoevents-dev
    geoevents-dev# \d
    No relations found.
    geoevents-dev# show search_path;
      search_path   
    ----------------
     "$user",public
    (1 row)
    

    geoevents-dev# set search_path = "$user", public, postgis;
    SET
    geoevents-dev# \d
                      List of relations
     Schema  |        Name        |   Type   |   Owner   
    ---------+--------------------+----------+-----------
     postgis | geography_columns  | view     | waratuman
     postgis | geometry_columns   | view     | waratuman
     postgis | raster_columns     | view     | waratuman
     postgis | raster_overviews   | view     | waratuman
     postgis | spatial_ref_sys    | table    | waratuman
    (5 rows)


The [PostGIS](http://postgis.refractions.net/) views and table are installed.

## Creating a Model

Now create a model that will have a geo-spacial feature.

    rails g model earthquake

Open the database migration for the model and add the columns given below.

    class CreateEarthquakes < ActiveRecord::Migration
      def change
        create_table :earthquakes do |t|
          t.point :center, :srid => 4326, :null => false
          t.decimal :magnitude, :null => false
          
          t.timestamps
        end
      end
    end

The column `center` is a geometric column with an
[SRID](http://en.wikipedia.org/wiki/SRID) of [4326](http://spatialreference.org/ref/epsg/4326/).
You don't need to worry much about weather the column is geometric or
geography, for more info on this [read this](http://workshops.opengeo.org/postgis-intro/geography.html).
If you don't know stick with geometric and an [SRID 4326](http://spatialreference.org/ref/epsg/4326/).
[SRID](http://en.wikipedia.org/wiki/SRID) specified the spacial reference
system that is used. This is the one used by Google maps. There are other
types of geometric columns such as line, polygon,and multi-polygon. This will
tell you about all of the options.

Now migrate the database.

    rake db:migrate

And add the [RGeo](http://dazuma.github.com/rgeo/) factory for creating the
point to the Earthquake model (`app/models/earthquake.rb`).

    class Earthquake < ActiveRecord::Base
      self.rgeo_factory_generator = RGeo::Geos.factory_generator(:srid => 4326)
  
    end

And try to create a model from the console.

    rails c
    > e = Earthquake.new
    > e.center = 'POINT(112.5 5655.6)'
    > e.magnitude = 5
    > e.save
    > e.center.x
    > e.center.y

The center is inputed as as a string in
[WKT format](http://en.wikipedia.org/wiki/Well-known_text).

Notice that the center isn't validated to be within ±180 for longitude and ±90
for latitude. Also calling `center.latitude` or `center.longitude` results in
an error. Only `center.x` or `center.y` work. Lets fix that by monkey patching
[RGeo](http://dazuma.github.com/rgeo/). Create a file name`lib/rgeo.rb` and
type the following.

    class RGeo::Geos::CAPIPointImpl
  
      alias_method :lat, :y
      alias_method :latitude, :y
      
      alias_method :lon, :x
      alias_method :lng, :x
      alias_method :longitude, :x
        
    end

This simple creates aliases for x and y so that `latitude` and `longitude` can
be called. Add the following line to the end of `application.rb` so that our
extension gets loaded.

    require "#{Rails.root}/lib/rgeo"

Now add validation to the Earthquake model.

    class Earthquake < ActiveRecord::Base
      self.rgeo_factory_generator = RGeo::Geos.factory_generator(:srid => 4326)
    
      delegate :latitude, :to => :center, :allow_nil => true
      delegate :longitude, :to => :center, :allow_nil => true
      
      validates :latitude, :presence => true, :numericality => { :greater_than_or_equal_to => -90, :less_than_or_equal_to => 90 }
      validates :longitude, :presence => true, :numericality => { :greater_than_or_equal_to => -180, :less_than_or_equal_to => 180 }
    end

Now try to create the same model as before in the console and it should have
errors on the latitude and longitude.

    rails c
    > e = Earthquake.new
    > e.center = 'POINT(112.5 5655.6)'
    > e.magnitude = 5
    > e.save
    => false
    > e.errors.to_a
    => ["Latitude must be less than or equal to 90"]

And now a valid model:

    rails c
    > e = Earthquake.new
    > e.center = 'POINT(12.5 5.6)'
    > e.magnitude = 5
    > e.save
    > e.center.x
    > e.center.y
    > e.center.latitude
    > e.center.longitude

## Conclusion

These are the basics of setting up Rails for geo-spacial processing. There are
many more data types and all kinds of uses for web applications. The
[reference manual for PostGIS](http://postgis.refractions.net/documentation/manual-2.0/)
is a great resource. If you are looking for some data to play around with
[TIGER](http://www.census.gov/geo/www/tiger/) has some great data from the
the [U.S. Census Bureau](http://www.census.gov/).
