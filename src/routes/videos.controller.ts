import { RequestHandler } from "express";
import Video from "./Video";
import IgApiClient from 'instagram-private-api';
//import reqPromise from "request-promise";
import app from '../app'

//const { IgApiClient } = require('instagram-private-api');
//const { get } = require('request-promise');

//const ig = new IgApiClient();

export const createVideo:RequestHandler = async (req, res) => {
    //res.json('creando videos..')
    const videoFound = await Video.findOne({url: req.body.url});
    if(videoFound)
        return res.status(301).json({message: 'la URL ya existe'});

    const video = new Video(req.body);
    //console.log(video);
    const savedVideo = await video.save();
    res.json(savedVideo);
};

export const getVideos:RequestHandler = async (req, res) => {
    try{
        //res.json('obteniendo videos..')
        const videos = await Video.find();
        return res.json(videos);
    } catch (err){
        res.json(err);
    }
};

export const getVideo:RequestHandler = async (req, res) => {
    try{
        //res.json('obteniendo video..')
        const videoFound = await Video.findById(req.params.id);
        if (!videoFound)
            return res.status(204).json();

        return res.json(videoFound);
    } catch (err){
        res.json(err);
    }
};

export const deleteVideo:RequestHandler = async (req, res) => {

    try{
        //res.json('eliminando videos..')
        const videoFound = await Video.findByIdAndDelete(req.params.id);
        if (!videoFound)
            return res.status(204).json();

        return res.json(videoFound);
    } catch (err){
        res.json(err);
    }
};

export const updateVideo: RequestHandler = async (req, res) => {
    try{
        //res.json('modificando videos..')
        const videoUpdated = await Video.findByIdAndUpdate(req.params.id, req.body);

        res.json(videoUpdated);
    } catch (err) {
        res.json('el error es ' +  err);
    }
};


export const createPost: RequestHandler =  async (req, res) => {

    try{
   // res.json('creando Post de Instagram..1' + app.get('ig_usr') + app.get('ig_pwd') );
    
    const { IgApiClient } = require('instagram-private-api');
    const { get } = require('request-promise');

    const ig = new IgApiClient();

    ig.state.generateDevice(app.get('ig_usr'));
    const LogeadoIG = await ig.account.login(app.get('ig_usr'), app.get('ig_pwd'));

    const imageBuffer = await get({
        url: req.body.url,
        encoding: null, 
    });

    await ig.publish.photo({
        file: imageBuffer,
        caption: req.body.caption,

    });
     
    res.json(LogeadoIG);

    } catch (err) {
        res.json('el error es ' +  err);
    }
};