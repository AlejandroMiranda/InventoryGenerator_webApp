const helpers = {};

helpers.isSelected = (idCat, idCategory) => {
  if (idCat == idCategory) {
    return "selected";
  } else {
    return "";
  }
};

helpers.idRole = (id) => {
  if (id == 1) return true;
};

module.exports = helpers;
