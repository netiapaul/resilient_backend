const Loan = require("../model/loanModel");
const mongoose = require("mongoose");
const User = require("../model/userModels");

const createLoan = async (req, res) => {
  try {
    const newLoan = await Loan.create({
      ...req.body,
      user: new mongoose.Types.ObjectId(req.body.user),
    });

    await User.findByIdAndUpdate(
      req.body.user,
      { $push: { loans: newLoan._id } },
      { new: true }
    );
    res.status(201).json({
      status: "success",
      data: newLoan,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      message: "Request failed",
    });
  }
};

module.exports = { createLoan };
