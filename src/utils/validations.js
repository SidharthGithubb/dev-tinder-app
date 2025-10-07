const validateSignUpData = (req) => {
    const {
      firstName,
      lastName,
      emailId,
      password,
      age,
      gender,
      bio,
      skill,
      role,
    } = req.body;

    if (!firstName || !lastName || !emailId || !password || !gender) {
      throw new Error("Please provide the mandatory fields");
    }
}

const validateLoginData = (req) => {
    const { emailId, password } = req.body;
    if (!emailId || !password) {
      throw new Error("Please provide email and password");
    }
}

module.exports = { validateSignUpData, validateLoginData };