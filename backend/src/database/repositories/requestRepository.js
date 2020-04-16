const MongooseRepository = require('./mongooseRepository');
const MongooseQueryUtils = require('../utils/mongooseQueryUtils');
const AuditLogRepository = require('./auditLogRepository');
const Request = require('../models/request');
const Ticket = require('../models/ticket');

/**
 * Handles database operations for the Request.
 * See https://mongoosejs.com/docs/index.html to learn how to customize it.
 */
class RequestRepository {
  /**
   * Creates the Request.
   *
   * @param {Object} data
   * @param {Object} [options]
   */
  async create(data, options) {
    if (MongooseRepository.getSession(options)) {
      await Request.createCollection();
    }

    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    const [record] = await Request.create(
      [
        {
          ...data,
          createdBy: currentUser.id,
          updatedBy: currentUser.id,
        },
      ],
      MongooseRepository.getSessionOptionsIfExists(options),
    );

    await this._createAuditLog(
      AuditLogRepository.CREATE,
      record.id,
      data,
      options,
    );

    await MongooseRepository.refreshTwoWayRelationOneToMany(
      record,
      'ticket',
      Ticket,
      'requests',
      options,
    );

    return this.findById(record.id, options);
  }

  /**
   * Updates the Request.
   *
   * @param {Object} data
   * @param {Object} [options]
   */
  async update(id, data, options) {
    await MongooseRepository.wrapWithSessionIfExists(
      Request.updateOne(
        { _id: id },
        {
          ...data,
          updatedBy: MongooseRepository.getCurrentUser(
            options,
          ).id,
        },
      ),
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.UPDATE,
      id,
      data,
      options,
    );

    const record = await this.findById(id, options);

    await MongooseRepository.refreshTwoWayRelationOneToMany(
      record,
      'ticket',
      Ticket,
      'requests',
      options,
    );

    return record;
  }

  /**
   * Deletes the Request.
   *
   * @param {string} id
   * @param {Object} [options]
   */
  async destroy(id, options) {
    await MongooseRepository.wrapWithSessionIfExists(
      Request.deleteOne({ _id: id }),
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      id,
      null,
      options,
    );

    await MongooseRepository.destroyRelationToMany(
      id,
      Ticket,
      'requests',
      options,
    );
  }

  /**
   * Counts the number of Requests based on the filter.
   *
   * @param {Object} filter
   * @param {Object} [options]
   */
  async count(filter, options) {
    return MongooseRepository.wrapWithSessionIfExists(
      Request.countDocuments(filter),
      options,
    );
  }

  /**
   * Finds the Request and its relations.
   *
   * @param {string} id
   * @param {Object} [options]
   */
  async findById(id, options) {
    return MongooseRepository.wrapWithSessionIfExists(
      Request.findById(id)
      .populate('owner')
      .populate('ticket'),
      options,
    );
  }

  /**
   * Finds the Requests based on the query.
   * See https://mongoosejs.com/docs/queries.html to learn how
   * to customize the queries.
   *
   * @param {Object} query
   * @param {Object} query.filter
   * @param {number} query.limit
   * @param  {number} query.offset
   * @param  {string} query.orderBy
   *
   * @returns {Promise<Object>} response - Object containing the rows and the count.
   */
  async findAndCountAll(
    { filter, limit, offset, orderBy } = {
      filter: null,
      limit: 0,
      offset: 0,
      orderBy: null,
    },
    options,
  ) {
    let criteria = {};

    if (filter) {
      if (filter.id) {
        criteria = {
          ...criteria,
          ['_id']: MongooseQueryUtils.uuid(filter.id),
        };
      }

      if (filter.owner) {
        criteria = {
          ...criteria,
          owner: MongooseQueryUtils.uuid(
            filter.owner,
          ),
        };
      }

      if (filter.ticket) {
        criteria = {
          ...criteria,
          ticket: MongooseQueryUtils.uuid(
            filter.ticket,
          ),
        };
      }

      if (filter.startRange) {
        const [start, end] = filter.startRange;

        if (start !== undefined && start !== null && start !== '') {
          criteria = {
            ...criteria,
            start: {
              ...criteria.start,
              $gte: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          criteria = {
            ...criteria,
            start: {
              ...criteria.start,
              $lte: end,
            },
          };
        }
      }

      if (filter.deadlineRange) {
        const [start, end] = filter.deadlineRange;

        if (start !== undefined && start !== null && start !== '') {
          criteria = {
            ...criteria,
            deadline: {
              ...criteria.deadline,
              $gte: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          criteria = {
            ...criteria,
            deadline: {
              ...criteria.deadline,
              $lte: end,
            },
          };
        }
      }

      if (filter.clientNotes) {
        criteria = {
          ...criteria,
          clientNotes: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.clientNotes,
            ),
            $options: 'i',
          },
        };
      }

      if (filter.status) {
        criteria = {
          ...criteria,
          status: filter.status
        };
      }

      if (filter.finishedNotes) {
        criteria = {
          ...criteria,
          finishedNotes: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.finishedNotes,
            ),
            $options: 'i',
          },
        };
      }

      if (filter.feeRange) {
        const [start, end] = filter.feeRange;

        if (start !== undefined && start !== null && start !== '') {
          criteria = {
            ...criteria,
            fee: {
              ...criteria.fee,
              $gte: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          criteria = {
            ...criteria,
            fee: {
              ...criteria.fee,
              $lte: start,
            },
          };
        }
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          criteria = {
            ...criteria,
            ['createdAt']: {
              ...criteria.createdAt,
              $gte: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          criteria = {
            ...criteria,
            ['createdAt']: {
              ...criteria.createdAt,
              $lte: end,
            },
          };
        }
      }
    }

    const sort = MongooseQueryUtils.sort(
      orderBy || 'createdAt_DESC',
    );

    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;

    const rows = await Request.find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate('owner')
      .populate('ticket');

    const count = await Request.countDocuments(criteria);

    return { rows, count };
  }

  /**
   * Lists the Requests to populate the autocomplete.
   * See https://mongoosejs.com/docs/queries.html to learn how to
   * customize the query.
   *
   * @param {Object} search
   * @param {number} limit
   */
  async findAllAutocomplete(search, limit) {
    let criteria = {};

    if (search) {
      criteria = {
        $or: [
          { _id: MongooseQueryUtils.uuid(search) },

        ],
      };
    }

    const sort = MongooseQueryUtils.sort('id_ASC');
    const limitEscaped = Number(limit || 0) || undefined;

    const records = await Request.find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    return records.map((record) => ({
      id: record.id,
      label: record['id'],
    }));
  }

  /**
   * Creates an audit log of the operation.
   *
   * @param {string} action - The action [create, update or delete].
   * @param {object} id - The record id
   * @param {object} data - The new data passed on the request
   * @param {object} options
   */
  async _createAuditLog(action, id, data, options) {
    await AuditLogRepository.log(
      {
        entityName: Request.modelName,
        entityId: id,
        action,
        values: data,
      },
      options,
    );
  }
}

module.exports = RequestRepository;
