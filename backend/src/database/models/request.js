const database = require('../database');
const Schema = database.Schema;
const { FileSchema } = require('./file');

/**
 * Request database schema.
 * See https://mongoosejs.com/docs/models.html to learn how to customize it.
 */
const RequestSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    ticket: {
      type: Schema.Types.ObjectId,
      ref: 'ticket',
      required: true,
    },
    start: {
      type: Date,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    clientNotes: {
      type: String,
      maxlength: 20000,
    },
    workerNotes: {
      type: String,
      maxlength: 20000,
    },
    photos: [FileSchema],
    status: {
      type: String,
      required: true,
      enum: [
        "send",
        "in_progress",
        "finisehd"
      ],
    },
    finishedNotes: {
      type: String,
      maxlength: 20000,
    },
    fee: {
      type: Number,
    },
    receipt: [FileSchema],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    importHash: { type: String },
  },
  { timestamps: true },
);

RequestSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

RequestSchema.set('toJSON', {
  getters: true,
});

RequestSchema.set('toObject', {
  getters: true,
});

const Request = database.model('request', RequestSchema);

module.exports = Request;
