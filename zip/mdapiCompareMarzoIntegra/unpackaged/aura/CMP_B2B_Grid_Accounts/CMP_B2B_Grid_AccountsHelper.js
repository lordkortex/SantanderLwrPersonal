({
  setPaginations: function (component, helper) {
    var paginationsList = component.get("v.values");
    var itemsXpage = component.get("v.selectedValue");
    if ($A.util.isEmpty(itemsXpage)) {
      itemsXpage = paginationsList[0];
      component.set("v.selectedValue", itemsXpage);
    }
    var items = component.get("v.accountsFiltered");
    var numberItems = items.length;
    var numberPages = Math.ceil(numberItems / itemsXpage);
    var lastItemPage = 0;
    var pagesList = [];
    var listItems = [];
    for (let i = 0; i < numberPages; i++) {
      pagesList.push(i + 1);
    }
    for (let i = 0; i < itemsXpage; i++) {
      if (numberItems > i) {
        listItems.push(items[i]);
        lastItemPage++;
      }
    }
    component.set("v.accountsNumber", numberItems);
    component.set("v.finalItem", lastItemPage);
    component.set("v.firstItem", 1);
    component.set("v.pagesNumbers", pagesList);
    component.set("v.paginationList", listItems);
    component.set("v.currentPage", 1);
  },

  nextPage: function (component, helper) {
    var itemsXpage = component.get("v.selectedValue");
    var items = component.get("v.accountsFiltered");
    var finalItem = component.get("v.finalItem");
    var firstItem = finalItem + 1;
    var currentPage = component.get("v.currentPage");
    var listItems = [];
    var count = 0;
    for (
      let i = finalItem;
      i < parseInt(finalItem) + parseInt(itemsXpage);
      i++
    ) {
      if (items.length > i) {
        listItems.push(items[i]);
        count++;
      }
    }
    component.set("v.currentPage", currentPage + 1);
    component.set("v.firstItem", firstItem);
    component.set("v.finalItem", finalItem + count);
    component.set("v.paginationList", listItems);
  },

  previousPage: function (component, helper) {
    var itemsXpage = component.get("v.selectedValue");
    var items = component.get("v.accountsFiltered");
    var firstItem = component.get("v.firstItem");
    var finalItem = firstItem - 1;
    var currentPage = component.get("v.currentPage");
    var listItems = [];
    for (
      let i = parseInt(finalItem) - parseInt(itemsXpage);
      i < firstItem - 1;
      i++
    ) {
      listItems.push(items[i]);
    }
    component.set("v.currentPage", currentPage - 1);
    component.set(
      "v.firstItem",
      parseInt(finalItem) - parseInt(itemsXpage) + 1
    );
    component.set("v.finalItem", finalItem);
    component.set("v.paginationList", listItems);
  },

  selectPage: function (component, helper) {
    var selectedPage = component.get("v.currentPage");
    var items = component.get("v.accountsFiltered");
    var itemsXpage = component.get("v.selectedValue");
    var firstItem = (selectedPage - 1) * itemsXpage;
    var finalItem = firstItem;
    var listItems = [];
    var count = 0;
    for (
      let i = firstItem;
      i < parseInt(finalItem) + parseInt(itemsXpage);
      i++
    ) {
      if (items.length > i) {
        listItems.push(items[i]);
        count++;
      }
    }
    component.set("v.firstItem", firstItem + 1);
    component.set("v.finalItem", finalItem + count);
    component.set("v.paginationList", listItems);
  }
});
