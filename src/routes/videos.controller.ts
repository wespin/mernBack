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


export const getPostDetails:RequestHandler = async (req, res) => {
    try {
        const { IgApiClient } = require('instagram-private-api');
        const { get } = require('request-promise');
    
        const ig = new IgApiClient();
  
        ig.state.generateDevice(app.get('ig_usr'));
        const LogeadoIG = await ig.account.login(app.get('ig_usr'), app.get('ig_pwd'));
  
      // Retrieve post details using the media ID
      const mediaDetails = await ig.media.info('3277396400328613191');
  
      console.log('Post Details:', mediaDetails);

      return res.json(mediaDetails);

    } catch (error) {
      console.error('Error:', error);
    }
  }


  export const  createInstagramReport:RequestHandler = async (req, res) => {
    try {
        const { IgApiClient } = require('instagram-private-api');
        const { get } = require('request-promise');
    
        const ig = new IgApiClient();
  
        ig.state.generateDevice(app.get('ig_usr'));
        const LogeadoIG = await ig.account.login(app.get('ig_usr'), app.get('ig_pwd'));
  
      // Fetch user details for the target account
      const user = await ig.user.searchExact('bicireflexiones');
      console.log('------------Profile Data---------------');
    //  const profileData = await ig.account.getProfile();
     //console.log(profileData);
  
      // Display the report
     // console.log(`Report for bicireflexiones`);
      console.log('-----------MEDIA DATA ITEMS----------------');
      /*console.log(`Full Name: ${user.full_name}`);
      console.log(`Username: ${user.username}`);
      console.log(`Biography: ${user.biography}`);
      console.log(`Followers: ${user.follower_count}`);
      console.log(`Following: ${user.following_count}`);
      console.log(`Total Posts: ${user.all_media_count}`);
  */
      const mediaData = await ig.feed.timeline(); // Get recent posts
      console.log(mediaData.items); // This will log details of each post

      return res.json(mediaData);

    } catch (error) {
      console.error('Error:', error);
    }
  }