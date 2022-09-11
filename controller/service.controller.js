const { ObjectID, ObjectId } = require("bson");
const { getDb } = require("../utils/dbConnact");

module.exports.user = async (req, res, next) => {
  try {
    const db = getDb();
    const { limit, page } = req.query;
   
  // database 
    const data = await db
      .collection("tools")
      .find()
      // .project({ _id: 0 }) 
      // .skip(+page * limit)
      // .limit(+limit)
      .toArray();
    res.status(200).send({ success: true, data: data });
  } catch (error) {
    next(error);
  }
};

/* Details id */
module.exports.userDetails = async (req, res, next) => {
  try{
   const db = getDb()
   const {id} = req.params;
   if(!ObjectId.isValid(id)){
    return res.status(400).json({success: false, error: 'tool id not found'})
   }  
   const tool =  await db.collection('tools').findOne({_id: ObjectID(id)})
   if(!tool){
    return res.status(400).json({success: false , error: "could'nt tool id not found"})
   }
   res.status(200).send({success: true, data: tool})
   
  }
  catch(error){
    next(error)
  }
}

// update id 
module.exports.userUpdate = async (req, res, next) => {
  try{
   const db = getDb()
   const {id} = req.params;
   if(!ObjectId.isValid(id)){
    return res.status(400).json({success: false, error: 'tool id not found'})
   }  
   const tool =  await db.collection('tools').updateOne({_id: ObjectID(id)}, {$set: req.body})


   if(!tool.modifiedCount){
    return res.status(400).json({success: false , error: "could not update the tool"})
   }
   res.status(200).send({success: true, messages: "successfully updated tool"})
   
  }
  catch(error){
    next(error)
  }
}
// Deleted id 
module.exports.userDeleted = async (req, res, next) => {
  try{
   const db = getDb()
   const {id} = req.params;
   if(!ObjectId.isValid(id)){
    return res.status(400).json({success: false, error: 'tool id not found'})
   }  
   const tool =  await db.collection('tools').deleteOne({_id: ObjectID(id)})


   if(!tool.deletedCount){
    return res.status(400).json({success: false , error: "could not Delete the tool"})
   }
   res.status(200).send({success: true, messages: "successfully deleted tool"})
   
  }
  catch(error){
    next(error)
  }
}


module.exports.serviceSave = async (req, res, next) => {
  try {
    const product = req.body;
    const db = getDb();
    const result = await db.collection("tools").insertOne(product);
    console.log(result);

    if (!result.insertedId) {
      res.status(400).send({
        status: false,
        error: "samething went wrong",
      });
    }

    res.send(`successfully toold id: ${result.insertedId}`);
  } catch (error) {
    next(error);
  }
};


/* ____________ */
// indexedDB 

module.exports.test =  async (req, res, next) =>{
 const body = req.body;
 console.log(body);
 const db = getDb()
 db.collection('test').insertOne(body)
 res.status(200).send({success: true})
}

module.exports.getTest = (req, res, next) =>{
 const db = getDb()
 const result =  db.collection('test').find().toArray()
//  res.json(result) 

res.send(result) 
}

