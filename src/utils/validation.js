const validateSignupData = (req) => {
    const { firstName, lastName, emailId, password, gender } = req.body;
    if(!firstName || firstName.length < 3 || firstName.length > 30){

    }
}