const birthYears = [2005, 1998, 2010, 1990, 1985, 2008];
const currentYear = new Date().getFullYear();

const ages = birthYears.map(year => currentYear - year);

const adults = ages.filter(age => age > 18);

console.log("Ani de naștere:", birthYears);
console.log("Vârste:", ages);
console.log("Persoane peste 18 ani:", adults);
