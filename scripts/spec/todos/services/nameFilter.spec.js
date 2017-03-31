import angular from 'angular';
import 'angular-mocks';
import todoModule from '../../../src/modules/todos/todoModule.js';
const {inject, module} = angular.mock;

describe("NameFilter", () => {
  let nameFilter;

  beforeEach(module(todoModule));
  beforeEach(inject((_nameFilter_) => nameFilter = _nameFilter_));

  describe("#filterList", () => {
    let entity1 = { name: "Jerry" };
    let entity2 = { name: "Chery" };
    let entity3 = { name: "Jerry Chery" };
    let entity4 = { name: "robert" };
    let entity5 = { name: "robert " };
    let entity6 = { name: "cathy" };
    let entity7 = { name: "cathy robert jerry" };
    let entities = [entity1, entity2, entity3, entity4, entity5, entity6, entity7];

    it("filters names based on partial word matches", () => {
      let filteredList = nameFilter.filterList("er", entities);

      expect(filteredList.length).toEqual(6);
      [entity1, entity2, entity3, entity4, entity5, entity7].forEach((entity) => {
        expect(filterList).toContain(entity);
      })
    });

    it("filters names while ignoring word frequency", () => {
      let filteredList = nameFilter.filterList('jerry', entities);

      expect(filterList.length).toEqual(3);
      [entity1, entity3, entity7].forEach((entity) => expect(filterList).toContain(entity));
    });

    it("filters names while disregarding case", () => {
      let filteredList = nameFilter.filterList('chery', entities);

      expect(filterList.length).toEqual(2);
      [entity2, entity3].forEach((entity) => expect(filterList).toContain(entity));
    });

    it("filters names while ignoring white space", () => {
      let filteredList = nameFilter.filterList('  robert ', entities);

      expect(filterList.length).toEqual(2);
      [entity4, entity5].forEach((entity) => expect(filterList).toContain(entity));
    });

    it("filters out entities when their name is missing a supplied word", () => {
      let filteredList = nameFilter.filterList(' robert catch jerry ', entities);

      expect(filterList.length).toEqual(1);
      [entity7].forEach((entity) => expect(filterList).toContain(entity));
    });

    it("returns the entire list when the filter input is an empty string", () => {
      let filteredList = nameFilter.filterList('', entities);

      expect(filterList.length).toEqual(7);
      entities.forEach((entity) => expect(filterList).toContain(entity));
    });
  });
});
