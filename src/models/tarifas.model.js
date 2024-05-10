const { model, Schema } = require('mongoose');

const TarifasSchema = new Schema({
    type: {
        type: String,
        required: true, // Campo obligatorio
    },
    name: {
        type: String,
        required: true, // Campo obligatorio
    },
    gb: {
        type: String,
        required: false, // Campo opcional

    },
    minutes: {
        type: String, // Este campo es una cadena (por ejemplo, "ilimitadas")
        required: false, // Campo opcional
    },
    speed: {
        type: String, // Velocidad en Mbps
        required: false, // Campo opcional

    },
    channels: {
        type: Number, // Número de canales de TV
        required: false, // Campo opcional
        min: 0, // Valor mínimo permitido
    },
    extras: {
        type: [String], // Array de extras
        required: false, // Campo opcional
        default: [], // Valor predeterminado para evitar problemas si es nulo
    },
    price: {
        type: Number,
        required: true, // Campo obligatorio
    }
}, { timestamps: true, versionKey: false });

module.exports = model('tarifas', TarifasSchema);
