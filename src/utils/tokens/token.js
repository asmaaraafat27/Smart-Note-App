import jwt from "jsonwebtoken"

export const sign = ({payload, signature, options = {}}) => {
    return jwt.sign(payload, signature, options);
};

export const verify = async ({token, signature, options = {}}) => {
    return jwt.verify(token, signature, options);
};