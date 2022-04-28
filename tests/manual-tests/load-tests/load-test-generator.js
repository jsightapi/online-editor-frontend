function coin()
{
  return Math.random() >= 0.5;
}

console.log(`\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n`);
console.log(`================================= start ====================================`)
console.log(`\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n`);
console.log(`JSIGHT 0.3`);
console.log(``);

/*
for (var i = 1; i < 1000; i++) {
    console.log(`URL /${i}
    GET
    POST
    DELETE
    PUT
    PATCH`);
}*/


/*for (var i = 1; i < 1000; i++) {
    console.log(`TYPE @type${i}\n{}`);
}*/


/*for (var i = 1; i < 100; i++) {
    console.log(` "key${i}": "value",`);
}*/

/*
for (var i = 1; i < 100; i++) {
    console.log(` "key${i}": "value", // {optional: true, nullable: true}`);
}
*/

/*
for (var i = 1; i < 100; i++) {
    console.log(`GET /${i}
  200
    {}
`);
}
*/

/*
for (var i = 1; i < 100; i++) {
    console.log(`GET /${i}
  200 any
`);
}
*/

/*
for (var i = 1; i < 1000; i++) {
    console.log(`GET /${i}
  200 @cat
`);
}
*/

for (var i = 1; i < 200; i++) {
    console.log(`URL /${i}`);
    if(coin()) {
      console.log(`  GET`);
      if(coin()) {printQuery()};
      if(coin()) {printResponse();}
      console.log(``);
    }
    if(coin()) {
      console.log(`  POST`);
      if(coin()) {printQuery()};
      if(coin()) {printRequest();}
      if(coin()) {printResponse();}
      console.log(``);
    }
    if(coin()) {
      console.log(`  PUT`);
      if(coin()) {printQuery()};
      if(coin()) {printRequest();}
      if(coin()) {printResponse();}
      console.log(``);
    }
    if(coin()) {
      console.log(`  DELETE`);
      if(coin()) {printQuery()};
      if(coin()) {printResponse();}
      console.log(``);
    }
    if(coin()) {
      console.log(`  PATCH`);
      if(coin()) {printQuery()};
      if(coin()) {printRequest();}
      if(coin()) {printResponse();}
      console.log(``);
    }
    if(coin()) {
      printType(`@type${i}`);
      console.log(``);
    }
}

function printQuery(){
  console.log("    Query \"debug=0\"\n    {\n      \"debug\": 1\n    }\n");
}

function printRequest(){
  console.log("    Request");
  printHeadersBody();
}

function printResponse(){
  console.log(`    200`);
  printHeadersBody();
}

function printHeadersBody(){
  if(coin()) {
    if(coin()) {
      printObject(`      `);
    } else {
      printArray(`      `);
    }
  } else {
    console.log(`      Headers`);
    printObject(`        `);
    console.log(`      Body`);
    if(coin()) {
      printObject(`        `);
    } else {
      printArray(`        `);
    }
  }
}

function printType(name="noname") {
  console.log(`TYPE ${name}`);
  if(coin()) {
    printObject(``);
  } else {
    printArray(``);
  }
}

function printObject(tab=""){
  console.log(tab + "{");
  for (var i = 0; i < Math.random()*10; i++) {
    console.log( tab + "  \"field" + i + "\": " + i + ",");
  }
  console.log( tab + "  \"field" + i + "\": " + i);
  console.log(tab + "}")
}

function printArray(tab=""){
  console.log(tab + "[");
  for (var i = 0; i < Math.random()*5; i++) {
    console.log( tab + "  \"item" + i + "\""+ ",");
  }
  console.log( tab + "  \"item" + i + "\"");
  console.log(tab + "]")
}