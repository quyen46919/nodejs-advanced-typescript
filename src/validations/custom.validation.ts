const objectId = (value: any, helpers: any) => {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
      return helpers.message('"{{#label}}" Không phải là ObjectID');
    }
    return value;
  };
  
const password = (value: any, helpers: any) => {
  if (value.length < 8) {
    return helpers.message('Mật khẩu phải có ít nhất 8 kí tự');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('Mật khẩu phải bao gồm ít nhất 1 chữ cái và 1 chữ số');
  }
  return value;
};

module.exports = {
  objectId,
  password,
};
  