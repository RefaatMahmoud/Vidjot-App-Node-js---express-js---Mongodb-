if (process.env.NODE_ENV === 'production') {
  module.exports = {
    mongoURI: 'mongodb://RefaatAish:Refo10466@ds127811.mlab.com:27811/devjot-prod'
  }
} else {
  module.exports = {
    mongoURI: 'mongodb://localhost/vidjot-dev'
  }
}