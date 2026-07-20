type Log = Warning | Info | Success;

// Discriminated union is a tag or a property that is equal for all of our interfaces
// but actually contains a value
interface Warning {
  type: "warning";
  msg: string;
}

interface Info {
  type: "info";
  text: string;
}

interface Success {
  type: "success";
  message: string;
}

let log: Log;

function handleMessage(log: Log) {
  switch(log.type) {
    case "warning":
      console.log(log.msg);
      break;
    case "info":
      console.log(log.text);
      break;
    case "success":
      console.log(log.message);
      break;
  }
}
