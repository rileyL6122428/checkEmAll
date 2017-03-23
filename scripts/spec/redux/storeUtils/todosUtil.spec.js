import angular from 'angular';
import 'angular-mocks';
import reduxModule from '../../../src/modules/redux/module.js';

const {inject, module} = angular.mock;

describe("TodosStore", () => {
  let $ngRedux, todosStore, rootScope, $state;

  beforeEach(module(reduxModule));

  beforeEach(module(function ($stateProvider) {
    $stateProvider.state('mock-state', { url: '/' });
  }));

  beforeEach(inject((_todosStore_, _$ngRedux_, $rootScope, _$state_) => {
    todosStore = _todosStore_;
    $ngRedux = _$ngRedux_;
    rootScope = $rootScope.$new();
    $state = _$state_;
  }));

  describe("#depositTodos", () => {
    it("dispatches a list of provided todos as an 'addTodos' action", () => {
      let todo1 = { id: 1, description: "description1" };
      let todo2 = { id: 2, description: "description2" };
      spyOn($ngRedux, 'dispatch');

      todosStore.depositTodos([todo1, todo2]);

      expect($ngRedux.dispatch).toHaveBeenCalledWith({
        type: "ADD_TODOS",
        payload: { "1": todo1, "2": todo2 }
      });
    });
  });

  describe("#placeListener", () => {
    it("places a provided listener in the redux service", () => {
        let listener = function mock() {};
        spyOn($ngRedux, 'subscribe');

        todosStore.placeListener(listener);

        expect($ngRedux.subscribe).toHaveBeenCalledWith(listener);
    });

    it("placed listeners are removed upon $stateChangeStart", () => {
      let unsubscribe1 = jasmine.createSpy('unsubscribe1');
      let unsubscribe2 = jasmine.createSpy('unsubscribe2');
      spyOn($ngRedux, 'subscribe').and.returnValues(unsubscribe1, unsubscribe2);
      todosStore.placeListener(function() {});
      todosStore.placeListener(function() {});

      $state.go('mock-state');

      expect(unsubscribe1).toHaveBeenCalled()
      expect(unsubscribe2).toHaveBeenCalled()
    });
  });

  describe("#withdrawTodos", () => {
    it("grabs all todos in the store", () => {
      let todo1 = { id: 1 };
      let todo2 = { id: 2 };
      let todo3 = { id: 3 };

      todosStore.depositTodos([todo1, todo2, todo3]);
      let userTodos = todosStore.withdrawTodos();

      expect(userTodos.length).toEqual(3);
      expect(userTodos).toContain(todo1);
      expect(userTodos).toContain(todo2);
      expect(userTodos).toContain(todo3);
    });
  });
});
