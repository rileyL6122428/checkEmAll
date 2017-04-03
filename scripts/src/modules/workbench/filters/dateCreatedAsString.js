export default function DateCreatedAsString() {
  return function(integerDate) {
    return new Date(integerDate).toString();
  }
}
