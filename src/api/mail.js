export default {
  sendMail: data => {
    // Insert here the correct request for sending mails
    // return fetch(url, {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    //   headers:{
    //     'Content-Type': 'application/json'
    //   }
    // }
    return data.email !== ''
      ? Promise.resolve({
          json: () => Promise.resolve({ date: new Date().toLocaleString() })
        })
      : Promise.reject("ERROR")
  }
}