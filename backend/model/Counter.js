import mongoose from "mongoose"

const counter = new mongoose.Schema({
    count : {
      try:Number ,
      default : -1
    }
  })


const Counter = mongoose.model("Counter",counter)

export default Counter