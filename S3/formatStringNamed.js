const formatStringNamed = (template, params) => {
    let result = template;
    for (const key in params) {
        const regex = new RegExp(`\\{${key}\\}`, 'g');
        result = result.replace(regex, params[key]);
    }
    return result;
};

const template = "un {substantiv} este {adjectiv}";
const data = {
    substantiv: "căluț",
    adjectiv: "drăguț"
};

console.log(formatStringNamed(template, data));
