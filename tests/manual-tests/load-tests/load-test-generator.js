/*

How to run: 

1. Output in cli: `node .\load-test-generator.js`.
2. Output to file: `node .\load-test-generator.js > random200Urls.jst`.

*/

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
      console.log(`URL /rpc${i}\n  Protocol json-rpc-2.0`)
      for(var mn = 0; mn < Math.random() * 5; mn ++)
      {
        printMethod(`m${i}${mn}`);
      }
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

function printMethod(name="noname") {
  console.log(`  Method ${name} // The method ${name}`);
  if(coin()) {
    console.log(`    Params`);
    if(coin()) {
      printObject(`    `);
    } else {
      printArray(`    `);
    }    
  }
  if(coin()) {
    console.log(`    Result`);
    if(coin()) {
      printObject(`    `);
    } else {
      printArray(`    `);
    }    
  }
}


function printObject(tab=""){
  console.log(tab + "{");
  for (var i = 0; i < Math.random()*10; i++) {
    let rules = ``;
    if( coin() ) {
      rules = ` // {optional: true, min: 0} - Field ${i} description.`
    }
    console.log( tab + "  \"field" + i + "\": " + i + "," + rules);
  }
  console.log( tab + "  \"field" + i + "\": " + i);
  console.log(tab + "}")
}

function printArray(tab=""){
  console.log(tab + "[");
  for (var i = 0; i < Math.random()*5; i++) {
    let rules = ``;
    if( coin() ) {
      rules = ` // {minLength: 0} - The item ${i} huge description and comment.`
    }
    console.log( tab + "  \"item" + i + "\"" + "," + rules);
  }
  console.log( tab + "  \"item" + i + "\"");
  console.log(tab + "]")
}