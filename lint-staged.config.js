module.exports = {
  '**/*.ts?(x)': filenames =>
    filenames.map(filename => `prettier --write '${filename}'`),
};
