const ProductRequest = require("../model/ProductRequest")
exports.getAll = async (req, res) => {
  try {
    res.send('Welcome to the Eqaim API');
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
};

// get all data from the database
exports.getAllData = async (req, res) => {
  try {
    const alldata = await ProductRequest.find({})
    res.json(alldata)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.getDataById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await ProductRequest.findById(id);
    if (!data) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.postComments = async (req, res) => {
  try {
    const { id, comment } = req.body;

    // Find the product request document by ID
    const existingRequest = await ProductRequest.findById(id);

    if (!existingRequest) {
      return res.status(404).json({ error: "Product request not found" });
    }
    existingRequest.newComments.push(comment);
    const updatedRequest = await existingRequest.save();

    res.json(updatedRequest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
exports.postReplies = async (req, res) => {
  try {
    const { id, newReplies } = req.body;
    const existingRequest = await ProductRequest.findById(id);
    if (!existingRequest) {
      return res.status(404).json({ error: "Product request not found" });
    }
    existingRequest.newReplies.push(newReplies);
    const updatedRequest = await existingRequest.save();

    res.json(updatedRequest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.postFeedback = async (req, res) => {
  try {
    const { title, category, status, description } = req.body;
    const upvotes = 0
    await ProductRequest.create({ title, category, status, description, upvotes });

    res.status(200).json({ message: "Feedback received successfully." });
  } catch (error) {
    console.error("Error handling feedback:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.editDataById = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, category, status, description } = req.body;

    const existingData = await ProductRequest.findById(id);
    if (!existingData) {
      return res.status(404).json({ error: "Data not found" });
    }

    existingData.title = title;
    existingData.category = category;
    existingData.status = status;
    existingData.description = description;

    const updatedData = await existingData.save();
    res.json(updatedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDataById = async (req,res) =>{
  try {
    const id = req.params.id;
    console.log(id);
    const deletedData = await ProductRequest.findByIdAndDelete(id);

    if (!deletedData) {
      return res.status(404).json({ error: "Data not found" });
    }

    res.json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error("Error deleting data by ID:", error);
    res.status(500).json({ error: error.message });
  }
}