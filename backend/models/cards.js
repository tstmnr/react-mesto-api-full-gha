const mongoose = require('mongoose');
const RegExHttp = require('../utils/RegEx');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Введите наименование карточки'],
    minlength: [2, 'Наименование карточки должен быть не короче 2 символов'],
    maxlength: [30, 'Наименование карточки должен быть не длиннее 30 символов'],
  },

  link: {
    type: String,
    required: [true, 'Укажите ссылку на картинку'],
    validate: {
      validator: (value) => RegExHttp.test(value),
      message: (props) => `Ссылка '${props.value}' некорректна`,
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Владелец карточки не может быть пустым'],
  },

  likes: {
    type: mongoose.Schema.Types.Array,
    ref: 'user',
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
