const str = "shivanshu Sharma";

const name = str.split(" ")[0];
console.log(name);

const charArray = name.split("");
console.log(charArray);

const firstChar = charArray[0].toUpperCase();
console.log(firstChar);

charArray[0] = firstChar;
console.log(charArray);

const finalName = charArray.join("");
console.log(finalName);
