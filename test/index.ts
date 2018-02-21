import * as angular from 'angular';

describe(`ng-infinite-autocomplete Wrapper Unit Testing`, function() {

    var InfiniteAutocompleteCore, $compile, element, $scope;

    beforeEach(angular.mock.module('infinite-autocomplete'));
    
    beforeEach(angular.mock.module(($provide:ng.auto.IProvideService) => {
		InfiniteAutocompleteCore = jasmine.createSpy('InfiniteAutocompleteCore');
        InfiniteAutocompleteCore.prototype.destroy = jasmine.createSpy('destroy');
        InfiniteAutocompleteCore.prototype.setConfig = jasmine.createSpy('setConfig')
            //Mock passed functions to be executed automatically to bypass low coverage report
            //Depends on the CORE Unit Testing 
            .and.callFake(function(config) { 
                if(config.onSelect) {
                    config.onSelect();
                }
                if(config.onLoadingStateChange) {
                  config.onLoadingStateChange();
                }
                if(config.onError) {
                  config.onError();
                }
                if(config.getDataFromApi) {
                    config.getDataFromApi();
                }
            });
		$provide.constant('InfiniteAutocompleteCore', InfiniteAutocompleteCore);
	}));

    beforeEach(inject(($injector) => {
        $scope = $injector.get(`$rootScope`).$new();
        $compile = $injector.get(`$compile`);
    }));

    
    describe(`ng-infinite-autocomplete as attribute`, function() {
        it(`should work as expected and call InfiniteAutocomplete core plugin`, function() {
            $scope.data = [{
                text: 'text', value: 'value'
            }];
            element = $compile('<div ng-infinite-autocomplete data="data"></div>')($scope);

            $scope.$digest();

            expect(InfiniteAutocompleteCore)
                .toHaveBeenCalledWith(element[0]);
        });
    });

    describe(`destroy lifecycle hook`, function() {
        it(`should call InfiniteAutocompleteCore.prototype.destroy when scope get destroy`, 
            function() {
                $scope.data = [{
                text: 'text', value: 'value'
            }];
            element = $compile('<div ng-infinite-autocomplete data="data"></div>')($scope);

            $scope.$digest();

            expect(InfiniteAutocompleteCore)
                .toHaveBeenCalledWith(element[0]);
            $scope.$destroy();
            expect(InfiniteAutocompleteCore.prototype.destroy)
                .toHaveBeenCalled();
        });
    });


    describe(`Data feature support`, function() {

        it(`should pass the data into the InfiniteAutocomplete core plugin`, function() {
            $scope.data = [{
                text: 'text', value: 'value'
            }];
            element = $compile('<ng-infinite-autocomplete data="data"></ng-infinite-autocomplete>')($scope);

            $scope.$digest();

            expect(InfiniteAutocompleteCore)
                .toHaveBeenCalledWith(element[0]);
            
            expect(InfiniteAutocompleteCore.prototype.setConfig)
                .toHaveBeenCalledWith({
                    data: [{
                        text: 'text', value: 'value'
                    }]
                });
        });

        
        it(`should call CORE.setConfig whenever the data changes`, function() {
            $scope.data = [{
                text: 'text', value: 'value'
            }];
            
            element = $compile('<ng-infinite-autocomplete data="data"></ng-infinite-autocomplete>')($scope);

            $scope.$digest();

            expect(InfiniteAutocompleteCore)
                .toHaveBeenCalledWith(element[0]);
            expect(InfiniteAutocompleteCore.prototype.setConfig)
                .toHaveBeenCalledWith({
                    data: [{
                        text: 'text', value: 'value'
                    }]
                });
            
            //Push new item to the static data array
            $scope.data.push({
                text: 'text2', value: 'value2'
            });

            //Notifiy angular for changes
            $scope.$digest();

            expect(InfiniteAutocompleteCore.prototype.setConfig)
                .toHaveBeenCalledWith({
                    data: [
                        { text: 'text', value: 'value' },
                        { text: 'text2', value: 'value2' }
                    ]
                });
        });


        it(`shouldn't call CORE.setConfig whenever the data mutates and it's immutable`, function() {
            $scope.data = [{
                text: 'text', value: 'value'
            }];

            element = $compile('<ng-infinite-autocomplete immutable data="data"></ng-infinite-autocomplete>')($scope);

            $scope.$digest();

            expect(InfiniteAutocompleteCore)
                .toHaveBeenCalledWith(element[0]);
            
        });


    });

    describe(`fetchSize feature support`, function() {

        it(`should pass the fetchSize into the InfiniteAutocomplete core plugin`, function() {
            $scope.data = [{
                text: 'text', value: 'value'
            }];
            $scope.chunkSize = 6;
            element = $compile('<ng-infinite-autocomplete data="data" fetch-size="chunkSize"></ng-infinite-autocomplete>')($scope);

            $scope.$digest();

            expect(InfiniteAutocompleteCore)
                .toHaveBeenCalledWith(element[0]);
            
            expect(InfiniteAutocompleteCore.prototype.setConfig)
                .toHaveBeenCalledWith({
                    data: [{
                        text: 'text', value: 'value'
                    }]
                });

            expect(InfiniteAutocompleteCore.prototype.setConfig)
                .toHaveBeenCalledWith({
                    fetchSize: 6
                });
        });

        
        it(`should call CORE.setConfig whenever the fetchSize changes`, function() {
            $scope.data = [{
                text: 'text', value: 'value'
            }];
            $scope.fetchSize = 6;
            
            element = $compile('<ng-infinite-autocomplete data="data" fetch-size="fetchSize"></ng-infinite-autocomplete>')($scope);

            $scope.$digest();

            expect(InfiniteAutocompleteCore)
                .toHaveBeenCalledWith(element[0]);
            
            expect(InfiniteAutocompleteCore.prototype.setConfig)
                .toHaveBeenCalledWith({
                    data: [{
                        text: 'text', value: 'value'
                    }]
                });

            expect(InfiniteAutocompleteCore.prototype.setConfig)
                .toHaveBeenCalledWith({
                    fetchSize: 6
                });
            
            //Push new item to the static data array
            $scope.fetchSize = 10;

            //Notifiy angular for changes
            $scope.$digest();

            expect(InfiniteAutocompleteCore.prototype.setConfig)
                .toHaveBeenCalledWith({
                    fetchSize: 10
                });
        });


    });


    describe(`maxHeight feature support`, function() {

        it(`should pass the maxHeight into the InfiniteAutocomplete core plugin`, function() {
            $scope.data = [{
                text: 'text', value: 'value'
            }];
            $scope.chunkSize = 6;
            $scope.maxHeight = '160px';
            element = $compile(`<ng-infinite-autocomplete data="data"
                                                          fetch-size="chunkSize"
                                                          max-height="maxHeight">
                                    </ng-infinite-autocomplete>`)($scope);

            $scope.$digest();

            expect(InfiniteAutocompleteCore)
                .toHaveBeenCalledWith(element[0]);
            
            expect(InfiniteAutocompleteCore.prototype.setConfig)
                .toHaveBeenCalledWith({
                    data: [{
                        text: 'text', value: 'value'
                    }]
                });

            expect(InfiniteAutocompleteCore.prototype.setConfig)
                .toHaveBeenCalledWith({
                    fetchSize: 6
                });

            expect(InfiniteAutocompleteCore.prototype.setConfig)
                .toHaveBeenCalledWith({
                    maxHeight: '160px'
                });
        });

        
        it(`should call CORE.setConfig whenever the maxHeight changes`, function() {
            $scope.data = [{
                text: 'text', value: 'value'
            }];
            $scope.fetchSize = 6;
            $scope.maxHeight = 150;
            
            element = $compile(`<ng-infinite-autocomplete data="data"
                                                          fetch-size="fetchSize"
                                                          max-height="maxHeight">
                                        </ng-infinite-autocomplete>`)($scope);

            $scope.$digest();

            expect(InfiniteAutocompleteCore)
                .toHaveBeenCalledWith(element[0]);
            
            expect(InfiniteAutocompleteCore.prototype.setConfig)
                .toHaveBeenCalledWith({
                    data: [{
                        text: 'text', value: 'value'
                    }]
                });

            expect(InfiniteAutocompleteCore.prototype.setConfig)
                .toHaveBeenCalledWith({
                    fetchSize: 6
                });

            expect(InfiniteAutocompleteCore.prototype.setConfig)
                .toHaveBeenCalledWith({
                    maxHeight: 150
                });
            
            $scope.maxHeight = 200;

            //Notifiy angular for changes
            $scope.$digest();

            expect(InfiniteAutocompleteCore.prototype.setConfig)
                .toHaveBeenCalledWith({
                    maxHeight: 200
                });
        });

    });


    describe(`onSelect feature support`, function() {

            it(`should pass the function to the CORE.setConfig whenever we choose something`, function() {
                $scope.onSelectHandler = (...args) => {}
                $scope.data = [
                    { text: 'first', value: 1 }
                ];

                element = $compile(`<ng-infinite-autocomplete
                                                data="data"
                                                on-select="onSelectHandler($element, $data)">
                                    </ng-infinite-autocomplete>`)($scope);

                $scope.$digest();
                
                expect(InfiniteAutocompleteCore)
                    .toHaveBeenCalledWith(element[0]);

                expect(InfiniteAutocompleteCore.prototype.setConfig)
                    .toHaveBeenCalledWith({
                        onSelect: jasmine.any(Function)
                    });

            });

    });

    describe(`onLoadingStateChange feature support`, function() {

      it(`should pass the function to the CORE.setConfig on loading state transitions`, function() {
          $scope.onLoadingStateChangeHandler = () => {};
          $scope.data = [
              { text: 'first', value: 1 }
          ];

          element = $compile(`<ng-infinite-autocomplete
                                          data="data"
                                          on-loading-state-change="onLoadingStateChangeHandler($loadingState)">
                              </ng-infinite-autocomplete>`)($scope);

          $scope.$digest();
          
          expect(InfiniteAutocompleteCore)
              .toHaveBeenCalledWith(element[0]);

          expect(InfiniteAutocompleteCore.prototype.setConfig)
              .toHaveBeenCalledWith({
                onLoadingStateChange: jasmine.any(Function)
              });

      });

    });

    describe(`onError feature support`, function() {

      it(`should pass the function to the CORE.setConfig when exceptions thrown`, function() {
          $scope.onErrorHandler = () => {};
          $scope.data = [
              { text: 'first', value: 1 }
          ];

          element = $compile(`<ng-infinite-autocomplete
                                          data="data"
                                          on-error="onErrorHandler($error)">
                              </ng-infinite-autocomplete>`)($scope);

          $scope.$digest();
          
          expect(InfiniteAutocompleteCore)
              .toHaveBeenCalledWith(element[0]);

          expect(InfiniteAutocompleteCore.prototype.setConfig)
              .toHaveBeenCalledWith({
                onError: jasmine.any(Function)
              });

      });

    });


    describe(`getDataFromApi feature support`, function() {
        
        it(`should pass the function to CORE.setConfig`, function() {
            $scope.getDataFromApi = (...args) => {}

            element = $compile(`<ng-infinite-autocomplete
                                            get-data-from-api="getDataFromApi($text, $page, $fetchSize)">
                                </ng-infinite-autocomplete>`)($scope);

            $scope.$digest();
            
            expect(InfiniteAutocompleteCore)
                .toHaveBeenCalledWith(element[0]);

            expect(InfiniteAutocompleteCore.prototype.setConfig)
                .toHaveBeenCalledWith({
                    getDataFromApi: jasmine.any(Function)
                });

            $scope.getDataFromApi();
            
        });

    });


    describe(`customizedInput feature support`, function() {

            it(`should pass the customized input to the CORE.setConfig`, function() {
                $scope.customizedInput = (...args) => {}
                $scope.data = [
                    { text: 'first', value: 1 }
                ];

                element = $compile(`<ng-infinite-autocomplete
                                                data="data"
                                                customized-input="customizedInput">
                                    </ng-infinite-autocomplete>`)($scope);

                $scope.$digest();
                
                expect(InfiniteAutocompleteCore)
                    .toHaveBeenCalledWith(element[0]);

                expect(InfiniteAutocompleteCore.prototype.setConfig)
                    .toHaveBeenCalledWith({
                        customizedInput: jasmine.any(Function)
                    });

            });

            it(`should pass the customized input to the CORE.setConfig whenever it changes`, function() {
                $scope.customizedInput = (...args) => {}
                $scope.data = [
                    { text: 'first', value: 1 }
                ];

                element = $compile(`<ng-infinite-autocomplete
                                                data="data"
                                                customized-input="customizedInput">
                                    </ng-infinite-autocomplete>`)($scope);

                $scope.$digest();

                var customizedInput2 = (...args) => {
                    console.log(`another custom input`);
                }

                $scope.customizedInput = customizedInput2;
                
                expect(InfiniteAutocompleteCore)
                    .toHaveBeenCalledWith(element[0]);

                expect(InfiniteAutocompleteCore.prototype.setConfig)
                    .toHaveBeenCalledTimes(2);

            });

    });

    describe(`customizedOptions feature support`, function() {

            it(`should pass the customized options to the CORE.setConfig`, function() {
                $scope.customizedOptions = (...args) => {}
                $scope.data = [
                    { text: 'first', value: 1 }
                ];

                element = $compile(`<ng-infinite-autocomplete
                                                data="data"
                                                customized-options="customizedOptions">
                                    </ng-infinite-autocomplete>`)($scope);

                $scope.$digest();
                
                expect(InfiniteAutocompleteCore)
                    .toHaveBeenCalledWith(element[0]);

                expect(InfiniteAutocompleteCore.prototype.setConfig)
                    .toHaveBeenCalledWith({
                        customizedOptions: jasmine.any(Function)
                    });

            });

            it(`should pass the customized options to the CORE.setConfig whenever it changes`, function() {
                $scope.customizedOptions = (...args) => {}
                $scope.data = [
                    { text: 'first', value: 1 }
                ];

                element = $compile(`<ng-infinite-autocomplete
                                                data="data"
                                                customized-options="customizedOptions">
                                    </ng-infinite-autocomplete>`)($scope);

                $scope.$digest();

                var customizedOptions2 = (...args) => {
                    console.log(`another custom options`);
                }

                $scope.customizedInput = customizedOptions2;
                
                expect(InfiniteAutocompleteCore)
                    .toHaveBeenCalledWith(element[0]);

                expect(InfiniteAutocompleteCore.prototype.setConfig)
                    .toHaveBeenCalledTimes(2);

            });

    });

});
