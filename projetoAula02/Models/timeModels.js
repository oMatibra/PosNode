import {Schema, model} from 'mongoose';


    const TimeSchema = new Schema({
        nome:{
            type: String,
            required: true,
        },
        urlImagem:{
            type: String,
            required: true,
        },
    });

    export default model('Time', TimeSchema);