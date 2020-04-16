import { Formik } from 'formik';
import { i18n } from 'i18n';
import actions from 'modules/request/list/requestListActions';
import selectors from 'modules/request/list/requestListSelectors';
import model from 'modules/request/requestModel';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FormFilterSchema from 'view/shared/form/formFilterSchema';
import InputFormItem from 'view/shared/form/items/InputFormItem';
import DatePickerRangeFormItem from 'view/shared/form/items/DatePickerRangeFormItem';
import ButtonIcon from 'view/shared/ButtonIcon';
import FilterWrapper from 'view/shared/styles/FilterWrapper';
import InputRangeFormItem from 'view/shared/form/items/InputRangeFormItem';
import UserAutocompleteFormItem from 'view/iam/autocomplete/UserAutocompleteFormItem';
import SelectFormItem from 'view/shared/form/items/SelectFormItem';
import TicketAutocompleteFormItem from 'view/ticket/autocomplete/TicketAutocompleteFormItem';

const { fields } = model;

const schema = new FormFilterSchema([
  fields.id,
  fields.createdAtRange,
  fields.owner,
  fields.ticket,
  fields.startRange,
  fields.deadlineRange,
  fields.clientNotes,
  fields.status,
  fields.finishedNotes,
  fields.feeRange,
]);

class RequestListFilter extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.doFetch(this.initialFilter()));
  }

  initialFilter = () => {
    return schema.initialValues(
      this.props.filter,
      this.props.location,
    );
  };

  handleSubmit = (values) => {
    const valuesToSubmit = schema.cast(values);
    const { dispatch } = this.props;
    dispatch(actions.doFetch(valuesToSubmit));
  };

  handleReset = (form) => {
    form.setValues({});
    const { dispatch } = this.props;
    dispatch(actions.doReset());
  };

  render() {
    const { loading } = this.props;

    return (
      <FilterWrapper>
        <Formik
          initialValues={this.initialFilter()}
          validationSchema={schema.schema}
          onSubmit={this.handleSubmit}
          render={(form) => {
            return (
              <form onSubmit={form.handleSubmit}>
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6 col-12">
                      <InputFormItem
                        name={fields.id.name}
                        label={fields.id.label}
                      />
                    </div>
                    <div className="col-lg-6 col-12">
                      <DatePickerRangeFormItem
                        name={fields.createdAtRange.name}
                        label={fields.createdAtRange.label}
                        showTimeInput
                      />
                    </div>
                    <div className="col-lg-6 col-12">
                      <UserAutocompleteFormItem
                        name={fields.owner.name}
                        label={fields.owner.label}
                      />
                    </div>
                    <div className="col-lg-6 col-12">
                      <TicketAutocompleteFormItem
                        name={fields.ticket.name}
                        label={fields.ticket.label}
                      />
                    </div>
                    <div className="col-lg-6 col-12">
                      <DatePickerRangeFormItem
                        name={fields.startRange.name}
                        label={fields.startRange.label}
                        showTimeInput
                      />
                    </div>
                    <div className="col-lg-6 col-12">
                      <DatePickerRangeFormItem
                        name={fields.deadlineRange.name}
                        label={fields.deadlineRange.label}
                        showTimeInput
                      />
                    </div>
                    <div className="col-lg-6 col-12">
                      <InputFormItem
                        name={fields.clientNotes.name}
                        label={fields.clientNotes.label}
                      />
                    </div>
                    <div className="col-lg-6 col-12">
                      <SelectFormItem
                        name={fields.status.name}
                        label={fields.status.label}
                        options={fields.status.options.map(
                          (item) => ({
                            value: item.id,
                            label: item.label,
                          }),
                        )}
                      />
                    </div>
                    <div className="col-lg-6 col-12">
                      <InputFormItem
                        name={fields.finishedNotes.name}
                        label={fields.finishedNotes.label}
                      />
                    </div>
                    <div className="col-lg-6 col-12">
                      <InputRangeFormItem
                        name={fields.feeRange.name}
                        label={fields.feeRange.label}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 filter-buttons">
                    <button
                      className="btn btn-primary"
                      type="submit"
                    >
                      <ButtonIcon
                        loading={loading}
                        iconClass="fas fa-search"
                      />{' '}
                      {i18n('common.search')}
                    </button>
                    <button
                      className="btn btn-light"
                      type="button"
                      onClick={() =>
                        this.handleReset(form)
                      }
                    >
                      <ButtonIcon
                        loading={loading}
                        iconClass="fas fa-undo"
                      />{' '}
                      {i18n('common.reset')}
                    </button>
                  </div>
                </div>
              </form>
            );
          }}
        />
      </FilterWrapper>
    );
  }
}

function select(state) {
  return {
    filter: selectors.selectFilter(state),
  };
}

export default withRouter(connect(select)(RequestListFilter));
