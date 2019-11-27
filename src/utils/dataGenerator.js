const data = [];

for (let i =0; i < 100000; i++) {
  data.push({
    index: i,
    name: `Name ${i} ${Math.random()}`,
    description: `long text ${i} ${Math.random()}`.repeat(10)
  })
}

const fs = require('fs');

fs.writeFile("../../public/data.json", JSON.stringify(data), function(err) {

  if(err) {
    return console.log(err);
  }

  console.log("The file was saved!");
});