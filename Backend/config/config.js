module.exports = {
    mongoURI:  process.env.PROD ? `productionDbUrl`:`mongodb+srv://Team272:Team272@team272.inqua.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
}
