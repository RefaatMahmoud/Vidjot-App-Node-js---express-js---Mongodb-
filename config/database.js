if (process.env.Node_ENV === "production") {
  module.exports = {
    MongoURI: "mongodb://RefaatAish:Refo10466@ds127811.mlab.com:27811/devjot-prod"
  }
} else {
  module.exports = {
    MongoURI: "mongodb://localhost/vidjot-dev"
  }
}