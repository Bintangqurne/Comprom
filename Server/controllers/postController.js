const { Post, Like, User } = require('../models/')

class postController{
    static async add(req, res, next){
        try {
            const {title, imageUrl, description} = req.body
            const UserId = req.user.id
            let data = await Post.create(
                {title, imageUrl, description, UserId}
            )
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async getData(req, res, next) {
        try {
            const data = await Post.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['id', 'image', 'fullName', 'status', 'description', 'address']
                    },
                    {
                        model: Like,
                        attributes: ['id', 'UserId', 'PostId']
                    }
                ]
            });
    
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }
    
    
    

    static async myData(req, res, next){
        try {
            const data = await Post.findAll({
                where: {
                    UserId: req.user.id
                },
                include: [
                    {
                        model: User,
                        attributes: ['id', 'image', 'fullName', 'status', 'description', 'address']
                    },
                    {
                        model: Like,
                        attributes: ['id', 'UserId', 'PostId']
                    }
                ]
            });
            if (!data) {
                throw {name: "NotFound"}
            }
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async updateData(req, res, next){
        try {
            const {id} = req.params
            const data = await Post.findByPk(id)
            const {title, description} = req.body;
            const updated = await Post.update({title, description}, {
                where: {
                    id
                }
            })
            if (!data) {
                throw {name: 'NotFound'}
            } else if (data.UserId !== req.user.id) {
                throw {name: 'Forbidden'}
            }  
            res.status(200).json({title, description})
        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next){
        try {
            const {id} = req.params
            const data = await Post.findByPk(id)
            if(!data) {
                throw {name: 'NotFound'}
            } else if (data.UserId !== req.user.id) {
                throw {name: "Forbidden"}
            }  
            
            await Post.destroy({where:{id}});
            res.status(200).json("Delete Successful")
        } catch (error) {
            next(error)
        }
    }
}

module.exports = postController