// This is practice whiteboard for all the dirtiest code you could ever see in your life


// Interfaces

interface Transport {
  name: string;
  wheels: number;
  motor: string;
  windows: number;
  doors: number;
  convertible?: true;
  interior: 'Suede' | 'Fabric' | 'Leather';
}

interface Person {
  firstName: string;
  middleName?: string;
  lastName: string;
}


// Transports

const busHybrASO: Transport = {
  name: "busHydrASO",
  wheels: 12,
  motor: "ASO +100500",
  windows: 8,
  doors: 3,
  interior: "Fabric",
}

const audiA6: Transport = {
  name: "Audi A6",
  wheels: 4,
  motor: "A6",
  windows: 4,
  doors: 2,
  interior: "Suede",
}

const opelAstra20: Transport = {
  name: "Opel Astra 20",
  wheels: 4,
  motor: "Astra 20 54",
  windows: 4,
  doors: 4,
  interior: "Leather",
  convertible: true,
}

const kiaMotors: Transport = {
  name: "Kia Motors i821",
  wheels: 2,
  motor: "Motor i821",
  windows: 0,
  doors: 0,
  interior: "Fabric",
}

const mercedesBenz012BZS: Transport = {
  name: "Mercedez-Benz 012 BZS",
  wheels: 4,
  motor: "AMG",
  windows: 2,
  doors: 2,
  convertible: true,
  interior: "Leather",
}


// Names

const tomBrowne: Person = {
  firstName: "Tom",
  middleName: "Gix",
  lastName: "Browne",
}

const alekseyBryashkin: Person = {
  firstName: "Aleksey",
  middleName: "Toomanio",
  lastName: "Bryashkin",
}

const danilaPopov: Person = {
  firstName: "Danila",
  lastName: "Popov",
}

const aleksandrChumaziy: Person = {
  firstName: "Aleksandr",
  lastName: "Chumaziy",
}

const allTransports = {
  "mercedesBenz012BZS": mercedesBenz012BZS.name,
  "kiaMotors": kiaMotors.name,
  "busHybrASO": busHybrASO.name,
  "audiA6": audiA6.name,
  "opelAstra20": opelAstra20.name,
}

function getTransport(transport: Transport, person: Person) {
  const { wheels, motor, windows, doors, convertible, interior } = transport;
  const { firstName, middleName, lastName } = person;
  const fullname = [firstName, middleName, lastName]

    // We apply filter(Boolean) in here as undefined, null, etc return false so we don't print it
    .filter(Boolean)
    .join(" ");

  console.log(`
Hello Mr./Mrs. ${fullname} and welcome!
My car has ${motor} motor. It has ${wheels} wheels, ${windows} windows and ${doors} doors. 
Is convertible? ${convertible}. And ${interior} interior.
`)};

function presentTransport(transport: Transport, owner: Person): void {
  const { name, wheels, motor, windows, doors, convertible, interior } = transport;
  const { firstName, middleName, lastName } = owner;
  const fullname = [firstName, middleName, lastName]
    .filter(Boolean)
    .join(" ");

setTimeout(() => {
    console.log(`
Hello everyone, and my name is ${fullname}. I am the owner of ${name}.
My transport is driven by ${motor} motor. It has ${wheels} wheels, ${doors} doors 
with ${windows} windows. And the interior is ${interior}. Is convertible? ${convertible}.
`)}, 2000);
}

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

async function presentAllTransports() {
  presentTransport(mercedesBenz012BZS, tomBrowne);
  await delay(2000);

  getTransport(mercedesBenz012BZS, tomBrowne);
  await delay(2000);

  presentTransport(audiA6, danilaPopov);
  await delay(2000);

  getTransport(audiA6, danilaPopov);
  await delay(2000);

  presentTransport(kiaMotors, alekseyBryashkin);
  await delay(2000);

  getTransport(kiaMotors, alekseyBryashkin);
  await delay(2000);

  presentTransport(busHybrASO, aleksandrChumaziy);
  await delay(2000);

  getTransport(busHybrASO, aleksandrChumaziy);
  await delay(2000);

  presentTransport(opelAstra20, alekseyBryashkin);
  await delay(2000);

  getTransport(opelAstra20, alekseyBryashkin);
  await delay(2000);
}

presentAllTransports();

console.log(allTransports);
