const mongoose = require("mongoose");

const LoanSchema = new mongoose.Schema({
  loanAmount: {
    type: Number,
    required: [true, "Loan amount required"],
  },
  loanTerm: {
    type: Number,
    required: [true, "Loan term required"],
  },
  interestRate: {
    type: Number,
    required: [true, "Interest rate required"],
  },
  totalPayments: {
    type: Number,
  },
  payBack: {
    type: String,
    required: [true, "Payback period required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User applying for loan is required"],
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

const Loan = mongoose.model("Loan", LoanSchema);

module.exports = Loan;
