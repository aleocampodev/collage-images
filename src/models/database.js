import { Schema, model, models } from "mongoose";
//const {appConfig} = require()

const collageSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      requiered: false,
      unique: true,
      trim: true,
      maxlength: [90, "Description must be less than 90 characters"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Collage", collageSchema);

/*ProductSchema.methods.setImgUrl = function  setImgUrl (){

}*/
