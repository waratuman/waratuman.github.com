---
title: Backbone.js
author: James R. Bracy
layout: post
---

Web applications are taking new paths. [JavaScript](http://en.wikipedia.org/wiki/JavaScript) is playing a more important
role when developing client applications, and I'm not talking server side. The
simple [HTML](http://en.wikipedia.org/wiki/Html) pages rendered on the server side just don't make the cut any
more. JavaScript, HTML, [CSS](http://en.wikipedia.org/wiki/Css) and other web technologies are even being used to
create desktop and mobile applications. JavaScript has had a strange path
though. If you are like me, you hate JavaScript. Yes it has good parts, but
it has been really painful to develop an application in JavaScript. Frameworks
have always been present when making desktop applications or mobile
applications. The framework for developing [iOS](http://en.wikipedia.org/wiki/IOS) applications is amazing.
Applications built on web technologies have only recently started to see the
emergence of frameworks to help build a self contained application using web
technologies.

[Backbone.js](http://documentcloud.github.com/backbone/#View-render) is one of the best frameworks I have found, yet there is
surprising little out there about it. People every once in a while would
mention it, but no one could give me a solid idea of what it was. If you have
ever developed a iOS application or a desktop application using an [MVC](http://en.wikipedia.org/wiki/Model–view–controller)
framework you will feel right at home using Backbone.js. Coming from Rails
I've always used [Ruby](http://www.ruby-lang.org/en/), [Rails](http://rubyonrails.org/), HTML, and JavaScript as though they were a part
of one application. When using Backbone.js it is much easier to think about
the different parts of the application. Rails for the data storage, background
processing and API. The Backbone.js app will make use of the Rails app, but
they are both essentially different code bases.

When developing in Backbone.js you have a structured way of coding your
application. Previously I would essentially try to recreate Backbone.js every
time I created a new application, and fail. Code would be everywhere, I had no
idea about how to deal with all the events scattered throughout the code. I
just added a callback, tested it in the browser and hoped it would keep
working! Data was attached to the DOM, logic was everywhere! What a disaster.
Backbone.js makes dealing with events, views, and models more understandable.

There are a couple of things different from developing iOS applications. The
view isn't really responsible for rendering itself. It just outputs HTML will
then goes to the browser to get rendered and styled with CSS. And you don't
get an Interface Builder. Backbone.js also can allow for different entry
points into the application. Normal web apps have several entries, it just
depends on the URL used when making a request. We can do similar things with
Backbone.js, but that is a little more advanced. Took a bit for me to get used
to these.

Enough, enough, lets start building an app!

Here is a quick mockup of a product management application.

<img class="right" src="/resources/images/posts/backbonejs/product-mock.png" alt="">

There are two distinct sections that we will be dealing with on this page, the
CategoriesView and the ProductsView. Both of these can be considered subviews
of the the whole page, which I will call the ApplicationView.

<img class="right" src="/resources/images/posts/backbonejs/product-mock-views.png" alt="">

Start by creating a folder named `products`.

    $ mkdir products

Next create a file named `index.html` and type the following code to create a
bare HTML document.

    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>products</title>
    </head>
    <body>
      <script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
      <script src="http://cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2.js"></script>
      <script src="http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.1/underscore-min.js"></script>
      <script src="http://cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.1/backbone-min.js"></script>

      <script src='application.js' type="text/javascript"></script>
    </body>
    </html>

All the necessary JavaScript libraries are already included. The reference to
`application.js` is where the application code will be. Create this file and
start it out by typing the following:

    var ApplicationView = Backbone.View.extend({
      el: 'body',

      initialize: function () {
        _.bindAll(this, 'render');
        this.render();
      },

      render: function () {
        this.$el.append('<h1>Hello, World!</h1>');
      }
    });

    
    $(document).ready(function() {
      var applicationView = new ApplicationView();
    });

Save and load `index.html` in a browser. You should see the following. If not,
go back and make sure everything is exactly the same.

<img class="right" src="/resources/images/posts/backbonejs/helloworld.png" alt="">

Lets break this down line by line.

    var ApplicationView = Backbone.View.extend({

This is where we start defining the class that will handle out main view, the
`ApplicationView`.

    el: 'body',

This will attach the view to the `body` element on the page. Whenever the view
will manipulate, render, or do something that changes what the user will see
on his screen, it will typically be done within this DOM element. The `el`
stands for element, or DOM element.

    initialize: function () {
      _.bindAll(this, 'render');
      this.render();
    },

The `initialize` function gets called whenever you create a new instance of
the view. When we create the instance of our view by doing
`new ApplicationView()` the `initialize` function gets called to do any
necessary setup. The `_.bindAll(this, 'render')` fixes the loss of context
for `this` within the render method. If you don't know what that means, don't
worry and move on. JavaScript is tricky at times, this is one and you don't
need to worry about it yet. Once all the setup is complete we call
`this.render()` to have our view actually display 'Hello, World!'.

    render: function () {
      this.$el.append('<h1>Hello, World!</h1>');
    }

The `render` function simple takes the element we previously selected to be
the base of our view (`body`) and adds the HTML `<h1>Hello, World!</h1>` to
it. `this.$el` is a variable that reference a cached jQuery selector.
Alternately we could have called jQuery to find the DOM element again by doing
`$(this.el)`, but `this.$el` is more efficient.

    $(document).ready(function() {
      var applicationView = new ApplicationView();
    });

And finally we tell the application to start itself once the page has loaded.

It works and its simple. But we have a problem. Right now we are embedding raw
HTML by using strings. This can work for small and static applications ok,
but what if you want to add some logic? This will get stick fast. We would end
up with code that looked something like:

    var html = '<h1>' + this.name + '</h1>' +
               '<h2>' + this.title + '</h2>';

Instead we can use templates to keep the HTML out of our Backbond.js views.
Add the following to `index.html` right before the `</body>`.

    <script id='application-view' type='text/html'>
      <header>
        <h1><%= pageTitle %></h1>
      </header>
      <div id='categories'></div>
      <div id='products'></div>
    </script>

The browser doesn't understand the type `text/html` when referring to the
script tag so it simply ignores it. This is great because we don't want the
browser to do anything with it, we just want to store our templates somewhere
so we can access them from the app.

Now lets update the ApplicationView to take advantage of the new templating.

    var ApplicationView = Backbone.View.extend({
        el: 'body',

        initialize: function () {
          _.bindAll(this, 'render');
          this.pageTitle = 'Products',
          this.template = _.template($('#application-view').html()),
          this.render();
        },

        render: function () {
          this.$el.append(this.template(this));
        }
    });

    $(document).ready(function() {
      var applicationView = new ApplicationView();
    })

Notice how we set the `pageTitle` and initialized and then passed `this` to
the template. Now the template will have access to all the properties and
functions of `this` (ApplicationView in this case).

Now its time to start the `CategoriesView`. Update your `application.js` so it
looks like the following:

    var ApplicationView = Backbone.View.extend({
        el: 'body',

        initialize: function () {
          _.bindAll(this, 'render');
          this.pageTitle = 'Products';
          this.template = _.template($('#application-view').html());
          this.render();
        },

        render: function () {
          this.$el.append(this.template(this));
          if (typeof (this.categoriesView) === 'undefined') {
            this.categoriesView = new CategoriesView();
          }
          this.categoriesView.render();
        }
    });

    var CategoriesView = Backbone.View.extend({
      el: '#categories',
      categories: ['Clothes', 'Household', 'Kitchen', 'Bed & Bath'],

      initialize: function () { _.bindAll(this, 'render'); },

      render: function () {
        var self = this;
        _.each(this.categories, function (category) {
          self.$el.append('<li>' + category + '</li>');
        });
      }

    });

    $(document).ready(function () {
      var applicationView = new ApplicationView();
    });

Go ahead, save the file and reload the page in your browser. You should now
see the following:

<img class="right" src="/resources/images/posts/backbonejs/categories-view.png" alt="">

Now we've done some basic rendering and application initialization. Lets now
look at making our first model that we can use for the `ProductsView`.

Add the following to `application.js`.

    var Product = Backbone.Model.extend({
      defaults: {
        categories: [],
        traits: {}
      }
    });

This is our `Product` model. We have given it a default attributes called
`categories` that is just an empty array and a default attribute called
`traits` which is essentially just an empty hash. To get an attribute from a
Backbone.js model we do the following:

    var product = new Product();
    product.get('categories'); // = []
    product.set('categories', ['Mugs']);
    product.get('categories'); // = ['Mugs']

Backbone.js also has something called collections. A collection helps manage
an array of models. We will be using this in the `ProductsController`. Below
we specify the model the `ProductCollection` with be using.

    var ProductCollection = Backbone.Collection.extend({
      model: Product
    });

Now let's create the `ProductsView` template and the `ProductsView` itself.
Open `index.html` and type the template code:

    <script id='products-view' type='text/html'>
      <table>
        <thead>
          <tr>
            <td>SKU</td>
            <td>Name</td>
            <td>Traits</td>
            <td>Price</td>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </script>

Now in `application.js` add the code for our view.
    
    var ProductsView = Backbone.View.extend({
      el: '#products',
      template: _.template($('#products-view').html()),

      initialize: function () {
        _.bindAll(this, 'render', 'appendProduct');
        this.collection.bind('add', this.appendProduct);
      },

      appendProduct: function (product) {
        var productView = new ProductView({model: product});
        this.$el.find('tbody').append(productView.render().el);
      },

      render: function () {
        this.$el.html('');
        this.$el.append(this.template(this));
        _(this.collection.models).each(this.appendProduct, this);
      }
    });

A few things to note. The line `this.collection.bind('add', this.appendProduct);`
triggers the function `appendProduct` to be called whenever an object has been
added to the collection (products in this case). No need to manually call it
when you insert a new product, the `appendProduct` function will simply get
called and update the view as needed. The `appendProduct` function also makes
reference to the `ProductView` (not `ProductsView`) which will be responsible
for drawing a single product. Lets define this now:

    var ProductView = Backbone.View.extend({
      tagName: 'tr',
      template: _.template($('#product-view').html()),

      initialize: function () {
        _.bindAll(this, 'render');
        this.render();
      },
  
      render: function () {
        this.$el.html(this.template(this.model));
        return this;
      }
    });

Here we don't specify a `el` but instead give it a `tagName` which will get
generated whenever we create the view. The `render` function at the end
returns itself so that in the `appendProduct` function in the `ProductsView`
we can chain our method calls and insert the DOM element like so
`productView.render().el`; Otherwise we would just end up having longer code.

And lets not forget the template for the `ProductView`:

    <script id='product-view' type='text/html'>
      <td><%= get('sku') %></td>
      <td><%= get('name') %></td>
      <td><%= _.keys(get('traits')).join(', ') %></td>
      <td><%= get('price') %></td>
    </script>

And thats all! Here is `index.html` and `application.js` in their entirety.
Below you can see how I updated the `ApplicationView` to support the rendering
of the `ProductsView` and added a collection of products that it can access.

    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>products</title>
      </head>
      <body>
        <script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
        <script src="http://cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2.js"></script>
        <script src="http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.1/underscore-min.js"></script>
        <script src="http://cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.1/backbone-min.js"></script>

        <script id='application-view' type='text/html'>
          <header>
            <h1><%= pageTitle %></h1>
          </header>
          <ul id='categories'></ul>
          <div id='products'></div>
        </script>

        <script id='products-view' type='text/html'>
          <table>
            <thead>
              <tr>
                <td>SKU</td>
                <td>Name</td>
                <td>Traits</td>
                <td>Price</td>
              </tr>
            </thead>
            <tbody>

            </tbody>
          </table>
        </script>

        <script id='product-view' type='text/html'>
          <td><%= get('sku') %></td>
          <td><%= get('name') %></td>
          <td><%= _.keys(get('traits')).join(', ') %></td>
          <td><%= get('price') %></td>
        </script>

        <script src='application.js' type="text/javascript"></script>
      </body>
    </html>

&nbsp;

    var Product = Backbone.Model.extend({
      defaults: {
        categories: [],
        traits: {}
      }
    });

    var ProductCollection = Backbone.Collection.extend({
      model: Product
    });

    var ApplicationView = Backbone.View.extend({
        el: 'body',
        template: _.template($('#application-view').html()),

        initialize: function () {
          _.bindAll(this, 'render', 'categoriesView', 'productsView');
          this.pageTitle = 'Products';
          this.products = new ProductCollection();
          this.render();
        },

        categoriesView: function () {
          if (typeof (this._categoriesView) === 'undefined') {
            this._categoriesView = new CategoriesView();
          }
          return this._categoriesView;
        },

        productsView: function () {
          if (typeof (this._productsView) === 'undefined') {
            this._productsView = new ProductsView({collection: this.products});
          }
          return this._productsView;
        },

        render: function () {
          this.$el.append(this.template(this));
          this.categoriesView().render();
          this.productsView().render();
        }
    });

    var CategoriesView = Backbone.View.extend({
      el: '#categories',
      categories: ['Clothes', 'Household', 'Kitchen', 'Bed & Bath'],

      initialize: function () { _.bindAll(this, 'render'); },

      render: function () {
        var self = this;
        _.each(this.categories, function (category) {
          self.$el.append('<li>' + category + '</li>');
        });
      }

    });

    var ProductsView = Backbone.View.extend({
      el: '#products',
      template: _.template($('#products-view').html()),

      initialize: function () {
        _.bindAll(this, 'render', 'appendProduct');
        this.collection.bind('add', this.appendProduct);
      },

      appendProduct: function (product) {
        var productView = new ProductView({model: product});
        this.$el.find('tbody').append(productView.render().el);
      },

      render: function () {
        this.$el.html('');
        this.$el.append(this.template(this));
        _(this.collection.models).each(this.appendProduct, this);
      }
    });

    var ProductView = Backbone.View.extend({
      tagName: 'tr',
      template: _.template($('#product-view').html()),

      initialize: function () {
        _.bindAll(this, 'render');
        this.render();
      },

      render: function () {
        this.$el.html(this.template(this.model));
        return this;
      }
    });

    $(document).ready(function () {
      var applicationView = new ApplicationView();
      applicationView.products.add(new Product({sku: '123', name: 'Mug', price: '$5.00'}));
    });
    