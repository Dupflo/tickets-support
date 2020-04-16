const database = require('../database');
const Schema = database.Schema;
const { FileSchema } = require('./file');

/**
 * Ticket database schema.
 * See https://mongoosejs.com/docs/models.html to learn how to customize it.
 */
const TicketSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    subject: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
    },
    description: {
      type: String,
      maxlength: 21845,
    },
    photos: [FileSchema],
    status: {
      type: String,
      required: true,
      enum: [
        "easy",
        "urgent"
      ],
    },
    type: {
      type: String,
      required: true,
      enum: [
        "debug",
        "feature",
        "explanation"
      ],
    },
    requests: [{
      type: Schema.Types.ObjectId,
      ref: 'request',
    }],
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

TicketSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

TicketSchema.set('toJSON', {
  getters: true,
});

TicketSchema.set('toObject', {
  getters: true,
});

const Ticket = database.model('ticket', TicketSchema);

module.exports = Ticket;
