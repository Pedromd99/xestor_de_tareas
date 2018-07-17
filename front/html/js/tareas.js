
var vm = new Vue({
  el: '#app',
  data: {
    // datos: [],
    Tareas: [],
    delTareas: [],
    currentTarea: {},
    newTarea: {
      'description': null,
      'pending': true,
    },
    loading: false,
    message: null,
    token: localStorage.token,
    name: localStorage.name,
    // local: localStorage.todo
  },
  mounted: function() {
    this.verify();
    this.getTareas();
    this.getNombre();
  },
  methods: {
    getNombre: function () {
      this.loading = true;
      this.$http.get('http://127.0.0.1:8000/login/', {
        headers: {
          Authorization: "Token " + (localStorage.token),
        },
      })
      .then((response) => {
        this.datos = response.data.results;
        console.log(this.datos);
        this.loading = false
      })
      .catch((err) => {
        this.loading = false;
        console.log(err);
      })
    },

    verify: function() {
      this.loading = true;
      this.$http.post('http://127.0.0.1:8000/api-token-verify/', {
          token: localStorage.token
        })
        .then((response) => {
          localStorage.token = response.data.token;

          // this.tareas = response.data;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          window.location.replace("/");
          console.log(err);
        })
    },
    getTareas: function() {
      // console.log();
      this.loading = true;
      this.$http.get('http://127.0.0.1:8000/tareas/', {
          headers: {
            Authorization: "Token " + (localStorage.token),
          },
        })
        .then((response) => {
          // console.log(response);

          this.Tareas = response.data.results;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        })

    },

    getTarea: function(id) {
      console.log(id);
      this.loading = true;
      this.$http.get('http://127.0.0.1:8000/tareas/' + id + '/', {
          headers: {
            "Authorization": "Token " + (localStorage.token),
          },
        })
        .then((response) => {

          this.currentTarea = response.data;
          console.log(this.currentTarea);
          $("#edit").modal('show');
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        })
    },
    addTarea: function() {
      this.loading = true;
      this.$http.post('http://127.0.0.1:8000/tareas/', this.newTarea, {
          headers: {
            "Authorization": "Token " + (localStorage.token),
          },
        })
        .then((response) => {
          this.loading = false;
          this.Tareas.push(response.data);
          this.newTarea.description = "";
          $('#add').modal('hide');

        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        })
    },
    updateTarea: function(id) {
      // console.log(this.id);
      this.loading = true;
      this.$http.put('http://127.0.0.1:8000/tareas/' + id + '/' , this.currentTarea, {
          headers: {
            "Authorization": "Token " + (localStorage.token),
          },
        })
        .then((response) => {
          this.loading = false;
          this.getTareas();
          $('#edit').modal('hide');
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        })
    },
    deleteTarea: function(id) {
      this.loading = true;
      this.$http.delete('http://127.0.0.1:8000/tareas/' + id + '/', {
          headers: {
            "Authorization": "Token " + (localStorage.token),
          },
        })
        .then((response) => {
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        })
    },

    deleteTareas: function() {
      this.loading = true;
      for (var i = 0; i < this.Tareas.length; i++) {
        // console.log(this.Tareas[i].pending);
        if (!this.Tareas[i].pending) {
          this.loading = true;
          this.$http.delete('http://127.0.0.1:8000/tareas/' + this.Tareas[i].id + '/', {
            headers: {
              "Authorization": "Token " + (localStorage.token),
            },
          })
          .then((response) => {
            this.loading = false;
            for (var i = 0; i < this.Tareas.length; i++) {
              if  (!this.Tareas[i].pending) {
                  this.Tareas.pop(i);
              }
            }
          })
          .catch((err) => {
            this.loading = false;
            console.log(err);
          })
        }
      }
    },
    marcar: function(data) {
      data.pending = !data.pending;

      if (data.pending) {
        this.loading = true;
        this.$http.put('http://127.0.0.1:8000/tareas/' + data.id + '/', data, {
          headers: {
            "Authorization": "Token " + (localStorage.token),
          },
        })
        .then((response) => {
          this.loading = false;
          this.currentTarea = response.data;
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        })
      } else {
        this.loading = true;
        this.$http.put('http://127.0.0.1:8000/tareas/' + data.id + '/', data, {
          headers: {
            "Authorization": "Token " + (localStorage.token),
          },
        })
        .then((response) => {
          this.loading = false;
          this.currentTarea = response.data;
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        })
      }
    },
  }
});
