let error = {
  status: "failed",
  data: {
    message: {
      errors: {
        email: {
          name: "ValidatorError",
          message: "Please provide an email",
          properties: {
            message: "Please provide an email",
            type: "required",
            path: "email",
          },
          kind: "required",
          path: "email",
        },
        password: {
          name: "ValidatorError",
          message: "password required",
          properties: {
            message: "password required",
            type: "required",
            path: "password",
          },
          kind: "required",
          path: "password",
        },
      },
      _message: "User validation failed",
      name: "ValidationError",
      message:
        "User validation failed: email: Please provide an email, password: password required",
    },
  },
};
