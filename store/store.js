new Vuex.Store({
    state: () => ({
      counter: 0
    }),
    mutations: {
      increment(state) {
        state.counter++
      }
    },
    modules: {
      todos: {
        namespaced: true,
        state: () => ({
          list: []
        }),
        mutations: {
          add(state, { text }) {
            state.list.push({
              text,
              done: false,
              id: Date.now()
            })
          },
          remove(state, { todo }) {
            state.list = state.list.filter(item => item.id !== todo.id)
          },
          toggle(state, { todo }) {
            todo.done = !todo.done
          }
        }
      }
    }
  })