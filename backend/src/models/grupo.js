const mongoose = require("mongoose");
const { Schema } = mongoose;

const grupoSchema = new Schema({
  nombre: { type: String },
  creador: [
    {
      email: String,
      password: String,
      firstname: String,
      last_name: String,
      urlimage: String,
      _id: String,
      incluido: { type: Boolean, default: false },
    },
  ],
  familiares: [
    {
      email: String,
      password: String,
      firstname: String,
      last_name: String,
      urlimage: String,
      _id: String,
      incluido: { type: Boolean, default: false },
    },
  ],
  fechaCreacionGrupo: { type: String, default: new Date().toISOString()},
  codigo: String,
  fechaInicio: {type: String},
  fechaCaducidad: { type: String },
  asignado: [
    {
      email: String,
      password: String,
      firstname: String,
      last_name: String,
      urlimage: String,
      _id: String,
      incluido: { type: Boolean, default: false },
    },
  ],
});

module.exports = mongoose.model("grupo", grupoSchema);
