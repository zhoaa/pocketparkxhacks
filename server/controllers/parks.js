import express from 'express';
import mongoose from 'mongoose';

import Park from '../models/park.js';

export const getPark = async (req, res) => {
    const { id } = req.params;
    try {
        const park = await Park.findById(id).exec();
        res.status(200).json(park);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPark = async (req, res) => {
    const {name, lat, long} = req.body;
    if(!name || !lat || !long) {
        res.status(400).json({message: "Must provide name, latitude, and longitude to create park"});
    }
    const existingPark = await Park.findOne({name: name, lat: lat, long: long}).exec();
    if(existingPark) {
        return res.status(200).json(existingPark);
    } else {
        let newPark = new Park({name, lat, long});
         try {
            newPark = await newPark.save();
            res.status(201).json(newPark);
        } catch (error) {
            res.status(409).json({message: error.message});
        }
    }
}
