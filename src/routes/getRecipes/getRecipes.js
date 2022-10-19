

module.exports.getRecipes = async (req, res) => {
  const { name } = req.query;  

  var resp = []
  
  try {
      resp='getRecipes'


    } catch (error) {
      console.log(error.message)
    }  

    
    
  return res.json(resp)
}