const Genre = require("../models/Genre.model");

module.exports.genreController = {   
    postGenre: async (req, res) => {
        const { nameGenre, descriptionGenre } = req.body;
        try{
            const genre = await Genre.create({
                nameGenre, 
                descriptionGenre,
            });
            return res.json(genre)
        } catch(e){
            return res.status(401).json({error:e})
        }
      },

      deleteGenre: async (req, res) => {
        const { id } = req.params;
        try{
            await Genre.findByIdAndRemove(id)
            res.json("жанр удален")
        } catch(e){
            res.json({error: e})
        }
      },

      getGenre: async (req, res) => {
        const genre = await Genre.find({})
        res.json(genre)
       },
}
