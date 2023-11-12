
const filterObjet = (objeto1: any , objeto2: any) => {
    return Object.fromEntries(
        Object.keys(objeto2).map(key => [
            key, objeto1[key] !== objeto2[key] ? objeto2[key] : objeto1[key]
        ])
    );
}


module.exports = { filterObjet };