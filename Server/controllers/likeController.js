const {Like} = require("../models")

class likeController{
    static async addFavorit(req, res, next){
        try {
            let UserId = req.user.id
            let {PostId} = req.params
            const existingFavorit = await Like.findOne(
                {
                    where: {
                        UserId: UserId,
                        PostId: PostId
                    }
                }
            )
            if (existingFavorit) {
                let deleted = await Like.destroy({where:{UserId : UserId , PostId : PostId}}) 
            } else {
                let newPost = await Like.create({UserId, PostId})
                res.status(201).json(newPost)
            }
            
        } catch (error) {
            next(error)
        }
    }

    static async getFavorit(req, res, next){
        try {
            const like = await Like.findAll()
            res.status(200).json(like)  
        } catch (error) {
            next(error)
        }
    }
}

module.exports = likeController 