export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coach = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas
    };

    const token = context.rootGetters.token;
    const response = await fetch(`${process.env.VUE_APP_API_ENDPOINT}/coaches/${userId}.json?auth=${token}`, {
      method: 'PUT',
      body: JSON.stringify(coach)
    });

    if(!response.ok){
      // errror ....
    }

    context.commit('registerCoach', {
      ...coach,
      id: userId
    });
  },
  async loadCoaches(context, payload) {
    if(!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const response = await fetch(`${process.env.VUE_APP_API_ENDPOINT}/coaches.json`);
    const responseData = await response.json();

    if(!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    const coaches = [];

    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas
      };
      coaches.push(coach);
    }
    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp');
  }
}