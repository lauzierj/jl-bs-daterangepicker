/**
 * @license jl-bs-daterangepicker v0.0.1
 * (c) 2014 Jacob Lauzier http://github.com/lauzierj/jl-bs-daterangepicker
 * License: MIT
 */
(function (angular) {
  'use strict';

  angular.module('jlBootstrap', []).directive('jlBsDaterangepicker', ['$parse', function ($parse) {
    return {
      require: '?ngModel',
      link: function ($scope, $element, $attributes, ngModel) {
        if (ngModel === null) return;''

        var options = {};
        options.timePicker = $attributes.timePicker === 'true';
        options.timePickerIncrement = $attributes.timePickerIncrement && parseInt($attributes.timePickerIncrement);
        options.separator = $attributes.separator || '-';
        options.minDate = $attributes.minDate && moment($attributes.minDate);
        options.maxDate = $attributes.maxDate && moment($attributes.maxDate);
        
        if($attributes.limit) {
    	  if($attributes.limit.indexOf(' ') < 0)
    	    options.dateLimit = $parse($attributes.limit)($scope);
    	  else
    	    options.dateLimit = moment.duration.apply(this, $attributes.limit.split(' ').map(function (elem, index) { return index === 0 && parseInt(elem, 10) || elem; }) );
        }
        
        options.ranges = $attributes.ranges && $parse($attributes.ranges)($scope);
        options.opens = $attributes.opens;

        var input = $attributes.input ? $element.find($attributes.input) : $element;

        ngModel.$formatters.unshift(function (modelValue) {
          if (!modelValue) return '';
          return modelValue;
        });

        ngModel.$parsers.unshift(function (viewValue) {
          return viewValue;
        });

        $scope.$watch($attributes.ngModel, function (modelValue) {
          if (!modelValue || (!modelValue.startDate)) {
            ngModel.$setViewValue({ startDate: moment().startOf('day'), endDate: moment().startOf('day') });
            return;
          }
          $element.data('daterangepicker').startDate = modelValue.startDate;
          $element.data('daterangepicker').endDate = modelValue.endDate;
          $element.data('daterangepicker').updateView();
          $element.data('daterangepicker').updateCalendars();
          $element.data('daterangepicker').updateInputText();

          input.val(modelValue.startDate.calendar() + ' ' + options.separator + ' ' + modelValue.endDate.calendar());
        });

        $element.daterangepicker(options, function(start, end) {
          $scope.$apply(function () {
            ngModel.$setViewValue({ startDate: start, endDate: end });
            ngModel.$render();
          });
        });
      }
    };
  }]);

})(angular);