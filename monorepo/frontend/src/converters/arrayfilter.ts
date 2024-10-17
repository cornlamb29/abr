//https://jdanyow.github.io/aurelia-converters-sample/

// remove nulls from the array
export class ArrayfilterValueConverter {
  toView(array) {
    return Array.isArray(array) && array.filter (a => a)
  }
}
