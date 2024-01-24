const sign = (data, secret) => {
    const hashed_data = data.user.id + "|" + secret;
    return hashed_data;
}

const verify = (hashed_data, secret) => {
    const parts = hashed_data.split("|");
    const _id = parts[0];
    const data = {
        user : {
            id : _id,
        }
    }
    return data;
} 

module.exports = { sign, verify };