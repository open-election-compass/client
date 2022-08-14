import fetch from 'cross-fetch';
import { nanoid } from 'nanoid';
import calculatePointsForParty from '../parties/calculatePointsForParty';

export default {
  namespaced: true,
  state: {
    signature: null,
    endpoint: null,
    optIn: null,
    analysis: [
      {
        name: 'age',
        value: null,
        status: 'waiting', // 'waiting', 'sending', 'sent'
      },
      {
        name: 'gender',
        value: null,
        status: 'waiting',
      },
      {
        name: 'education',
        value: null,
        status: 'waiting',
      },
      {
        name: 'party',
        value: null,
        status: 'waiting',
      },
    ],
  },
  getters: {
    optIn(state) {
      return state.optIn === true;
    },
    enabled(state) {
      return (
        typeof state.endpoint === 'string' && state.endpoint.length > 0 && state.optIn !== false
      );
    },
    analysis(state) {
      return state.analysis;
    },
  },
  mutations: {
    setSignature(state, value) {
      state.signature = value;
    },
    setEndpoint(state, value) {
      state.endpoint = value;
    },
    setOptIn(state, value) {
      state.optIn = value;
    },
    setField(state, { name, value }) {
      const found = state.analysis.find((field) => field.name === name);
      if (!found) {
        throw new Error(`Field ${name} does not exist.`);
      }
      found.value = value;
    },
  },
  actions: {
    generateSignature({ commit }) {
      commit('setSignature', nanoid());
    },
    optOut({ commit }) {
      commit('setOptIn', false);
    },
    optIn({ commit }) {
      commit('setOptIn', true);
    },
    send({ state, getters, rootGetters }) {
      const answers = rootGetters['theses/theses'].map((thesis) => ({
        answer: thesis.status,
        factor: thesis.factor,
      }));

      const theses = rootGetters['theses/theses'];
      const algorithm = rootGetters['algorithm/algorithm'];
      const maxPoints = rootGetters['theses/maxPoints'];

      const parties = rootGetters['parties/parties'].map((party) => {
        const points = calculatePointsForParty(party, theses, algorithm);
        const result = (1 / maxPoints) * points;
        return {
          alias: party.alias,
          selected: party.selected,
          result,
        };
      });

      const analysis = {};
      getters.analysis.forEach((item) => {
        analysis[item.name] = item.value;
      });

      const data = {
        answers,
        parties,
        analysis,
      };

      fetch(state.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          signature: state.signature,
          data,
        }),
      });
    },
  },
};
