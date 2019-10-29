/*
 * MIT No Attribution
 *
 * Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so.
*/

import Vuex from 'vuex';
import Vue from 'vue';
import createPersistedState from 'vuex-persistedstate';


Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    // user: "",
    jwt: "",
    signedIn: false,
    dispenserId: "",
    certificateName: "",
    certificateArn: "",
    certificatePem: "",
    privateKey: "",
    rootCA: "",
    accountUrl: ""
  },

  getters: {
    userName: state => {
      if (state.signedIn) {
        return state.username
      } else {
        return false
      }
    },
    isAuth: state => {
      if (state.signedIn) {
        return true
      } else {
        return false
      }
    },
    jwt: state => {
      if (state.signedIn) {
        return state.jwt
      } else {
        return ""
      }
    },
    dispenserId: state => {
      if (state.dispenserId == null) {
        return false
      } else {
        return state.dispenserId
      }
    },
    certificateName: state => {
      if (state.certificateName == null) {
        return false
      } else {
        return state.certificateName
      }
    },
    certificateArn: state => {
      if (state.certificateArn == null) {
        return false
      } else {
        return state.certificateArn
      }
    },
    certificatePem: state => {
      if (state.certificatePem == null) {
        return false
      } else {
        return state.certificatePem
      }
    },
    privateKey: state => {
      if (state.privateKey == null) {
        return false
      } else {
        return state.privateKey
      }
    },
    rootCA: state => {
      if (state.rootCA == null) {
        return false
      } else {
        return state.rootCA
      }
    },
    getAccountUrl: state => {
      if (state.accountUrl == null) {
        return false
      } else {
        return state.accountUrl
      }
    }
  },

  mutations: {
    loggedIn(state, userObj) {
      console.log("state object is", state);
      state.username = userObj.username;
      state.jwt = userObj.signInUserSession.idToken.jwtToken;
      state.signedIn = true;
      console.log('logged in set');
    },
    loggedOut(state) {
      if (state) {
        state.username = "";
        state.jwt = "";
        state.signedIn = false;
        state.dispenserId = "";
        state.certificateName = "";
        state.certificateArn = "";
        state.certificatePem = "";
        state.privateKey = "";
        state.rootCA = "";
        state.accountUrl = "";
      }
      console.log('logged OUT set');
    },
    updateAssets(state, assetObj) {
      state.dispenserId = assetObj.dispenserId;
      state.certificateArn = assetObj.assets.iot.certificateArn;
      state.certificateName = assetObj.assets.iot.certificateArn.split("/").pop().substring(0, 10);
      state.certificatePem = assetObj.assets.iot.certificatePem;
      state.privateKey = assetObj.assets.iot.privateKey;
      state.rootCA = assetObj.assets.iot.rootCA;
      // Set the sign-in link as the account number is in the arn
      state.accountUrl = `https://${state.certificateArn.split(":")[4]}.signin.aws.amazon.com/console/`
    }
  },

  actions: {
    setLoggedIn(context, userObj) {
      context.commit('loggedIn', userObj)
    },
    setLoggedOut(context) {
      context.commit('loggedOut')
    },
    setAssets(context, assetObj) {
      context.commit('updateAssets', assetObj)
    }
  }
});

export default store;