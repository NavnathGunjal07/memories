import postMessage from '../models/postMessage.js';

export const getPosts = async (req, res) =>{
    try{
        const postMessages = await postMessage.find({});
        res.status(200).json(postMessages);
    }
    catch(error){
        res.status(404).json({message: error.message});
    }
}

export const createPosts = async (req, res) =>{
    const createpost = req.body;
   // const newPosts = new postMessage(post);
    try{
        let post = await postMessage.create({
            creator:createpost.creator,
            title:createpost.title,
            message:createpost.message,
            tags:createpost.tags,
            selectedFile:createpost["selectedFile"].base64,
        });
        res.status(201).json(post);
    }catch(error){
        res.status(404).json({message: error.message,});
    }
}