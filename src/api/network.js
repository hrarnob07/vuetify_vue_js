import client from '../config/client'

export const callToServer = (method, url, data=null) => {
    return new Promise((resolve, reject) => {
        client.call(method, url, data).then(res => {
            resolve(res.data)
        }).catch(err => {
            console.log(err);
            if (err.response.status === 401) {
                //TODO when unauthorised
                console.log("Authorization failed; please take necessary action")
            }
            reject(err)
        })

    })
}
