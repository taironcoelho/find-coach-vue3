export default {
  async contactCoach(context, payload) {
    const coachId = payload.coachId;
    
    const newRequest = {
      userEmail: payload.email,
      message: payload.message
    };

    const response = await fetch(`${process.env.VUE_APP_API_ENDPOINT}/requests/${coachId}.json`, {
      method: 'POST',
      body: JSON.stringify(newRequest)
    });
    const responseData = await response.json();

    if(!response.ok){
      const error = new Error(responseData.message || 'Failed to send request!');
      throw error;
    }

    context.commit('addRequest', {
      id: responseData.name,
      coachId: payload.coachId,
      ...newRequest
    });
  },
  async loadRequests(context) {
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await fetch(`${process.env.VUE_APP_API_ENDPOINT}/requests/${coachId}.json?auth=${token}`);
    const responseData = await response.json();

     if(!response.ok){
      const error = new Error(responseData.message || 'Failed to send request!');
      throw error;
    }

    const requests = [];

    for (const key in responseData) {
      const req = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message,
      };
      requests.push(req);
    }

    context.commit('setRequests', requests);
  }
}