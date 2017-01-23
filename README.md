[![Build Status](https://travis-ci.org/Attrash-Islam/ng-infinite-autocomplete.svg?branch=master)](https://travis-ci.org/Attrash-Islam/ng-infinite-autocomplete)    [![Coverage Status](https://coveralls.io/repos/github/Attrash-Islam/ng-infinite-autocomplete/badge.svg?branch=master)](https://coveralls.io/github/Attrash-Islam/ng-infinite-autocomplete?branch=master)

# ng-inifinte-autocomplete

AngularJS 1.x Wrapper for <a href="https://github.com/Attrash-Islam/infinite-autocomplete">infinite-autocomplete</a> library

<b>Note:</b> Whenever I mention the CORE, then I'm targeting the <a href="https://github.com/Attrash-Islam/infinite-autocomplete">infinite-autocomplete</a> library

# Install

```
npm i --save ng-infinite-autocomplete
```

# Developer section

In the package.json scripts we've 4 basic tasks:

`build` - Build the code once

`build:watch` - Build the code and watch changes

`test` - Run tests once

`test:watch` - Run tests and watch changes

# Usage Example

```js
import * as angular from 'angular';
import 'ng-infinite-autocomplete';

//inject infinite-autocomplete as dependency for myApp module
angular.module('myApp', ['infinite-autocomplete'])
...
```

Controller:
```js
  angular.module('myApp')
   .controller('MainCtrl', ['$http', '$q', function($http, $q){
   vm.onSelectHandler = function($element, $data) {
      console.log(arguments);
   }
   
    vm.data = [
                { text: 'Islam Attrash', value: 1},
                { text: 'Shai Reznik', value: 2},
                { text: 'Uri Shaked', value: 3},
                { text: 'Salsabel Eawissat', value: 4}
            ];
    vm.getData = function($text, $page, $fetchSize) {
        var deferred = $q.defer();
        $http.get("http://localhost:5000/data?text="+ $text + "&page=" + $page + "&fetchSize=" + $fetchSize)
          .then(function(res) {
              deferred.resolve(res.data);
          });
        return deferred.promise;
    }
   });
```

Template:
```html
<div ng-controller="MainCtrl as vm">
  <!-- For Static data -->
  <ng-infinite-autocomplete
    data="vm.data"
    on-select="vm.onSelectHandler($element, $data)"
  ></ng-infinite-autocomplete>

  <!-- For external API -->
  <ng-infinite-autocomplete
    fetch-size="8"
    get-data-from-api="vm.getData($text, $page, $fetchSize)"
  ></ng-infinite-autocomplete>
</div>
```

# Live Demo (Default Style)

<img src="https://cdn.rawgit.com/Attrash-Islam/assets/749035d3/infi-basic.gif" />

# Override Implementations

See this section on <a href="https://github.com/Attrash-Islam/infinite-autocomplete">CORE</a>, you pass a class via customizedInput, customizedOptions attributes

# Directive Inputs/Outputs

```
  /**
   * data static source
   */
  data?:Array<IOption>;
  /**
   * on-select event output handler when choosing an option
   */
  onSelect?:Function($element, $data);
  /**
   * max height for the options
   */
  maxHeight?:string;
  /**
   * data dynamic api source
   */
  getDataFromApi?($text:string, $page:number, $fetchSize:number):es6Promise<Array<any>>;
  /**
   * Chunk fetch size
   */
  fetchSize?:number,
  /**
   * Customized input class to override the default input
   */
  customizedInput?:IInputCompoenentConstructor;
  /**
   * Customized options class to override the default input
   */
  customizedOptions?:IOptionsComponentConstructor;
```

For more See <a href="https://github.com/Attrash-Islam/infinite-autocomplete">CORE</a>
