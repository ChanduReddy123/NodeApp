exports.handler = async (event) => {
    // TODO implement
    console.log("hello world")
    console.log("this is real fun")
    console.log("am going to publish this function")
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
console.log("this is for testing")
console.log("testing number 2")

