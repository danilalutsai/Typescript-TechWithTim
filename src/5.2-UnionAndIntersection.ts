// Union - pipe operator "|"
// Intersection - end operator "&"

// This allows us to combine multiple types together to create some more complex types
type StringOrNumber = string | number | boolean;

function acceptVal(val: StringOrNumber): StringOrNumber {
  return val;
}
console.log(acceptVal('some-string'));

interface BusinessPartner {
  name: string;
}

interface ContactDetails {
  email: string;
  phone: string;
}

// Combine two interfaces into one type with end operator &
type BusinessContact = BusinessPartner & ContactDetails

const contact: BusinessContact = {
  name: 'Tim',
  email: 'tim@gmail.com',
  phone: ""
}

console.log(contact);

const businessPartner: BusinessPartner = {
  name: 'Danila',
}

const contactDetails: ContactDetails = {
  email: 'ddsad@mail.com',
  phone: '+23 21 221 778 8223',
}

console.log(businessPartner, contactDetails);
