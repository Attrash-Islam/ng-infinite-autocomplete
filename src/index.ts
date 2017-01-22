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
            data: '=',
            fetchSize: '=',
            maxHeight: '=',
            onSelect: '&'
        },
        link: (scope:IAutocompleteDirectiveScope, 
                element:ng.IAugmentedJQuery, 
                attrs:ng.IAttributes) => {

            let inifinityAutocomplete = new InfiniteAutocompleteCore(
                element[0]
            );

            if(scope.onSelect) {
                inifinityAutocomplete.setConfig({
                    onSelect: function(element, data) {
                        scope.onSelect({
                            $element: element,
                            $data: data
                        });
                    }
                });
            }

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
            }, true);
        }
    }
}]);

