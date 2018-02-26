import * as angular from 'angular';
//Don't use InfiniteAutocomplete, use InfiniteAutocompleteCore instead
import { InfiniteAutocomplete } from 'infinite-autocomplete';
import { IAutocompleteDirectiveScope } from './Interfaces/IAutocompleteDirectiveScope';

angular.module(`infinite-autocomplete`, [])
.constant(`InfiniteAutocompleteCore`, InfiniteAutocomplete)
.directive(`ngInfiniteAutocomplete`, ['InfiniteAutocompleteCore', (InfiniteAutocompleteCore) => {
    return {
        restrict: 'EA',
        scope: {
            ngModel: "=",
            data: '=',
            fetchSize: '=',
            maxHeight: '=',
            onSelect: '&',
            onLoadingStateChange: '&',
            onError: '&',
            getDataFromApi: '&',
            customizedInput: '=',
            customizedOptions: '=',
        },
        link: (scope:IAutocompleteDirectiveScope, 
                element:ng.IAugmentedJQuery, 
                attrs:ng.IAttributes) => {

            scope.mutable = attrs['immutable'] === undefined;

            let inifinityAutocomplete = new InfiniteAutocompleteCore(
                element[0]
            );

            if(attrs['onSelect'] !== undefined) {
                inifinityAutocomplete.setConfig({
                    onSelect: function(element, data) {
                        scope.onSelect({
                            $element: element,
                            $data: data
                        });
                        scope.$apply();
                    }
                });
            }

            if(attrs['onLoadingStateChange'] !== undefined) {
              inifinityAutocomplete.setConfig({
                onLoadingStateChange: function(loadingState) {
                      scope.onLoadingStateChange({
                          $loadingState: loadingState,
                      });
                      scope.$apply();
                  }
              });
            }

            if(attrs['onError'] !== undefined) {
              inifinityAutocomplete.setConfig({
                onError: function(error) {
                      scope.onError({
                          $error: error,
                      });
                      scope.$apply();
                  }
              });
            }

            if(attrs['getDataFromApi'] !== undefined) {
                inifinityAutocomplete.setConfig({
                    getDataFromApi: function(text, page, fetchSize) {
                        return scope.getDataFromApi({
                            $text: text, 
                            $page: page, 
                            $fetchSize: fetchSize
                        });
                    }
                });
            }

            let valueWatchListener = scope.$watch(`ngModel`, (newValue) => {
              if(newValue) {
                  inifinityAutocomplete.setConfig({
                      value: newValue,
                  });
              }
            });

            let fetchSizeWatchListener = scope.$watch(`fetchSize`, (newFetchSize) => {
                if(newFetchSize) {
                    inifinityAutocomplete.setConfig({
                        fetchSize: newFetchSize
                    });
                }
            });


            let maxHeightWatchListener = scope.$watch(`maxHeight`, (newMaxHeight) => {
                if(newMaxHeight) {
                    inifinityAutocomplete.setConfig({
                        maxHeight: newMaxHeight
                    });
                }
            });


            let dataWatchListener = scope.$watch(`data`, (newData) => {
                if(newData) {
                    inifinityAutocomplete.setConfig({
                        data: newData
                    });
                }
            }, scope.mutable);


            let customInputWatchListener = scope.$watch(`customizedInput`, (newCustomizedInput) => {
                if(newCustomizedInput) {
                    inifinityAutocomplete.setConfig({
                        customizedInput: newCustomizedInput
                    });
                }
            });


            let customizedOptionsListener = scope.$watch(`customizedOptions`, (newCustomizedOptions) => {
                if(newCustomizedOptions) {
                    inifinityAutocomplete.setConfig({
                        customizedOptions: newCustomizedOptions
                    });
                }
            });

            scope.$on(`$destroy`, () => {
                valueWatchListener();
                fetchSizeWatchListener();
                maxHeightWatchListener();
                dataWatchListener();
                customInputWatchListener();
                customizedOptionsListener();
                inifinityAutocomplete.destroy();
            });

        }
    }

}]);

