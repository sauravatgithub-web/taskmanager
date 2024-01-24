const sign = (data, secret) => {
    return (data + secret);
}

const verify = (hashed_data, secret) => {
    return (hashed_data - secret);
} 

module.exports = { sign, verify };