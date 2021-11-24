import { createLogger, createStore } from "vuex";
import { StoreFile } from "@/model/store-file";

const store = createStore({
  plugins: process.env.NODE_ENV === "development" ? [createLogger()] : [],
  state: {
    files: [] as StoreFile[],
  },
  getters: {
    fileList: (state) => state.files,
  },
  mutations: {
    addFile(state, { file }) {
      state.files.push(file);
    },
  },
  actions: {
    addFile({ commit }, file: StoreFile) {
      commit("addFile", {
        file,
      });
    },
  },
});
export default store;
