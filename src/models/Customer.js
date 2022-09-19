import bcrypt from "bcryptjs";

export const Customer = async (
    firstName,
    lastName,
    company, 
    phone,
    pass,
) => {
    return {
        "nameStyle": true,
        "firstName": firstName,
        "lastName": lastName,
        "companyName": company,
        "phone": phone,
        "passwordHash": pass,
        "passwordSalt": (await bcrypt.genSalt(2)).slice(0,7)
    }
}