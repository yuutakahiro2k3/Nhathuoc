let getHomePage = async (req, res) => {
    return res.render('homepage.ejs')
}
module.exports = {
    getHomePage: getHomePage,
}