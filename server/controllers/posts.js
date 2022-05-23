import postMessage from '../models/postMessage.js';

export const getPosts = async (req, res) =>{
    try{
        const postMessages = await postMessage.find({});
        console.log(postMessages);
        res.status(200).json(postMessages);
    }
    catch(error){
        res.status(404).json({message: error.message});
    }
}

export const createPosts = async (req, res) =>{
    const post = req.body;
    const newPosts = new postMessage(post);
    try{
        await newPosts.save();
        res.status(201).json(newPost);
    }catch(error){
        res.status(404).json({message: error.message});
    }
}