//create function
export const create = async ({model, data = {}}) => {
    const document = await model.create(data);
    return document;
};

//find function
export const find = async ({model, filter= {}, select= "", populate=[], skip= 0, limit= 1000,sort = "-createdAt"}) => {
    const document = await model.find(filter).select(select).populate(populate).skip(skip).limit(limit).sort(sort); ;
    return document;
};

//find one function
export const findOne = async ({model, filter= {}, select= "", populate=[]}) => {
    const document = await model.findOne(filter).select(select).populate(populate);
    return document;
};

//find by id function
export const findById = async ({model, id= "", select= "", populate=[]}) => {
    const document = await model.findById(id).select(select).populate(populate);
    return document;
};

//find by id and apdate function
export const findByIdAndUpdate = async ({model, id= "", data= "", options= "",select= "", populate=[]}) => {
    const document = await model.findByIdAndUpdate(id, data, options ).select(select).populate(populate);
    return document;
};

//find one and apdate function
export const findOneAndUpdate = async ({model, filter ={}, data ={}, options= {}, select= "", populate=[]}) => {
    const document = await model.findOneAndUpdate(filter, data, options).select(select).populate(populate);
    return document;
};

//update one function
export const updateOne = async ({model, filter ={}, data ={}, options= {}}) => {
    const document = await model.updateOne(filter, data, options);
    return document;
};

//update many function
export const updateMany = async ({model, filter ={}, data ={}, options= {}}) => {
    const document = await model.updateMany(filter, data, options);
    return document;
};

//find by id and delete function
export const findByIdAndDelete = async ({model, id= "",select= "", populate=[]}) => {
    const document = await model.findByIdAndDelete(id).select(select).populate(populate);
    return document;
};

//find one and delete function
export const findOneAndDelete = async ({model, filter ={}, select= "", populate=[]}) => {
    const document = await model.findOneAndDelete(filter).select(select).populate(populate);
    return document;
};

//delete one function
export const deleteOne = async ({model, filter ={}}) => {
    const document = await model.deleteOne(filter);
    return document;
};

//delete many function
export const deleteMany = async ({model, filter ={}}) => {
    const document = await model.deleteMany(filter);
    return document;
};
