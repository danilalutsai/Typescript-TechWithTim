interface Individual {
  name: string;
  birthday: Date;
}

interface Organization {
  companyName: string;
  workPhone: string;
}

// One type OR another type
type ContactType = Organization | Individual;

// One type AND another type
type CompContact = Individual & Organization;

function addContact(contact: ContactType): ContactType {
  return contact;
}

function addContact2(contact: ContactType): void {
  if ("birthday" in contact) {
    console.log(contact.name, contact.birthday);
  } else {
    console.log(contact.companyName, contact.workPhone);
  }
}

addContact2({ companyName: "Google", workPhone: "+34 728 721 233" }); // Google +34 728 721 233

console.log(addContact({ name: 'Josh', birthday: new Date() }));
