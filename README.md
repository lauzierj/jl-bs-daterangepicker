jl-bs-daterangepicker
=====================

Inspired by Luis Farzati's Angular Directive for the bootstrap-daterangepicker [ng-bs-daterangepicker](https://github.com/luisfarzati/ng-bs-daterangepicker).

Angular directive for Dan Grossman's [bootstrap-daterangepicker](https://github.com/dangrossman/bootstrap-daterangepicker).

Installation
------------

Using bower:

```
bower install jl-bs-daterangepicker
```

Using npm:

```
npm install jl-bs-daterangepicker
```


How to use it
-------------

You should already have a bunch of scripts and CSS required for bootstrap-daterangepicker:

```
<link rel="stylesheet" type="text/css" href="bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="daterangepicker-bs3.css">
<script type="text/javascript" src="jquery.min.js"></script>
<script type="text/javascript" src="bootstrap.min.js"></script>
<script type="text/javascript" src="moment.min.js"></script>
<script type="text/javascript" src="daterangepicker.js"></script>
<script type="text/javascript" src="angular.min.js"></script>
```

to the list above, you should add:

```
<script type="text/javascript" src="jl-bs-daterangepicker.js"></script>
```

Then, inject `jlBootstrap` in your application module:

```
angular.module('myApp', ['jlBootstrap']);
```

and then just add an attribute of type `jl-bs-daterangepicker`:

```
<input jl-bs-daterangepicker ng-model="myDateRange">
```

The result object `$scope.myDateRange` has a `startDate` and `endDate` properties, which are instances of `moment()`.

### Implemented features so far

* `startDate`, `endDate`: are taken from the `ng-model` object;
* `minDate`, `maxDate`: mapped from `min-date` and `max-date` attributes;
* `dateLimit`: mapped from `limit` attribute;
* `separator`: mapped from `separator` attribute.
* `opens`: mapped from `opens` attribute.
* `timePicker`: mapped from `timePicker` attribute.
* `timePickerIncrement`: mapped from `timePickerIncrement` attribute.
* `ranges`: mapped from `ranges` attribute. Is a scoped object. (check daterangepicker for formatting)
* `input`: the input field which the display string `startDate separator endDate`. If not specified, the field being used is assumed to be an input field.

Example:

```
<form class="navbar-form">
  <div class="form-group">
    <div jl-bs-daterangepicker
         class="input-group"
         ng-model="myDateRange"
         limit="7 days"
         separator="-"
         time-picker="true"
         time-picker-increment="60"
         opens="left"
         input="input"
         ranges="customRanges">
      <input class="form-control" />
      <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
    </div>
  </div>
</form>
```

In your controller: 

```
$scope.myDateRange = {
  startDate: moment(),
  endDate: moment().add(1, 'day')
};
    
$scope.customRanges = {
  'This Hour': [moment().startOf('hour'), moment().add(1, 'hours').startOf('hour') ],
  'Last 4 Hours': [moment().subtract(3, 'hours').startOf('hour'), moment().add(1, 'hour').startOf('hour')]
};
```

The `limit` attribute lets you specify a number and unit similarly as you would invoke `moment.duration()`.

The `customRanges` variable used above is mapped to a property in $scope.

### Build

You can run the tests by running

```
npm install
bower install
grunt
```

assuming you already have `grunt` installed, otherwise you also need to do:

```
npm install -g grunt-cli