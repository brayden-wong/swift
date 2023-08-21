export const Request = async <T>(
    url: string,
    requestType: string,
    data?: any
) => {
    const header = {

        "Content-Type": "application/json",
    };

    const response = await fetch(url, {
        method: requestType.toUpperCase(),
        headers: header,

        body: data ? JSON.stringify(data) : null,
    });

    return await (<T>response.json());
};
export default Request;
