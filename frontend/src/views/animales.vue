<template>
  <div>
    <h1>Animales</h1>
    <h1 v-for="a in animales" :key="a.id">{{a.nombre}}</h1>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    let valor = document.cookie.split("token=");
    this.cookie = valor[1];
  },
  mounted(){
    this.obtenerAnimales()
  },
  data() {
    return {
      cookie: "",
      animales: []
    };
  },
  methods:{
    obtenerAnimales(){
        // haces la peticion a la ruta animal del servidor
   axios.get(`http://localhost:3000/api/animales?secret_token=${this.cookie}`)
   .then(res => {     
     this.animales = res.data.animales
     })

   .catch(err => console.log(err))
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
