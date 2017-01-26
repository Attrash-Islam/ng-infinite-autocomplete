<a><img src="https://travis-ci.org/Attrash-Islam/ng-infinite-autocomplete.svg?branch=master"/></a>      <a href='https://coveralls.io/github/Attrash-Islam/ng-infinite-autocomplete?branch=master'><img src='https://coveralls.io/repos/github/Attrash-Islam/ng-infinite-autocomplete/badge.svg?branch=master' alt='Coverage Status' /></a>

# ng-inifinte-autocomplete

AngularJS 1.x Wrapper for <a href="https://github.com/Attrash-Islam/infinite-autocomplete">infinite-autocomplete</a> library

<b>Note:</b> Whenever I mention the CORE, then I'm targeting the <a href="https://github.com/Attrash-Islam/infinite-autocomplete">infinite-autocomplete</a> library

# Install

via npm:
```
$ npm i --save ng-infinite-autocomplete
```

via bower:
```
$ bower i -S ng-infinite-autocomplete
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
//or <script src="bower_components/ng-infinite-autocomplete/dist/index.js"></script>

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
  /**
   * treat data source as immutable - To improve $watch process
   */
   immutable?
```

# Restrictions regards Attributes
- You must choose to pass data or getDataFromApi depends on whether the data is static or dynamic
- data attribute must be an array of { text: 'some text', value: 1}, and value could be any type (number, string, object..)
- max-height should be a string
- fetch-size should be a number
- customizedInput should extend InputComponent [For more See <a href="https://github.com/Attrash-Islam/infinite-autocomplete">CORE</a>]
- customizedOptions should extend OptionComponent [For more See <a href="https://github.com/Attrash-Islam/infinite-autocomplete">CORE</a>]


# Directive Example

```js
  <ng-infinite-autocomplete
            data="vm.data"
            immutable
            fetch-size="vm.fetchSize"
            on-select="vm.onSelectHandler($element, $data)"
            max-height="vm.maxHeight"
            customized-input="vm.CustomInput"
            customized-options="vm.CustomOptions">
  </ng-infinite-autocomplete>
```
This directive will use `vm.data` as a static data source, and the number of fetched data is `vm.fetchSize` in every scroll and/or search, the data will be treated as `immutable` and then you need to create new instance to update the options list for the autocomplete, it will run `vm.onSelectHandler($element, $data)` when selecting an option passing the clicked HTNLElement as the first argument and the data as the second one ({text: 'text', value: 'hi'}), and the maxmium height for the scrollable options will be `vm.maxHeight` (It will be overriden if not supplying enough scrollable area for options), and will use `vm.CustomInput` for implementing the input, and `vm.CustomOptions` for implementing the custom options also.

You can exclude any attribute not desired as you like following the restrictions mentioned above.

