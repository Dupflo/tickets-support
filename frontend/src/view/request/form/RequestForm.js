import { Formik } from 'formik';
import { i18n } from 'i18n';
import model from 'modules/request/requestModel';
import React, { Component } from 'react';
import ViewFormItem from 'view/shared/form/items/ViewFormItem';
import Spinner from 'view/shared/Spinner';
import FormWrapper from 'view/shared/styles/FormWrapper';
import FormSchema from 'view/shared/form/formSchema';
import ButtonIcon from 'view/shared/ButtonIcon';
import TextAreaFormItem from 'view/shared/form/items/TextAreaFormItem';
import InputFormItem from 'view/shared/form/items/InputFormItem';
import UserAutocompleteFormItem from 'view/iam/autocomplete/UserAutocompleteFormItem';
import SelectFormItem from 'view/shared/form/items/SelectFormItem';
import DatePickerFormItem from 'view/shared/form/items/DatePickerFormItem';
import ImagesFormItem from 'view/shared/form/items/ImagesFormItem';
import FilesFormItem from 'view/shared/form/items/FilesFormItem';
import TicketAutocompleteFormItem from 'view/ticket/autocomplete/TicketAutocompleteFormItem';

const { fields } = model;

class RequestForm extends Component {
  schema = new FormSchema(fields.id, [
    fields.owner,
    fields.ticket,
    fields.start,
    fields.deadline,
    fields.clientNotes,
    fields.workerNotes,
    fields.photos,
    fields.status,
    fields.finishedNotes,
    fields.fee,
    fields.receipt,
  ]);

  handleSubmit = (values) => {
    const { id, ...data } = this.schema.cast(values);
    this.props.onSubmit(id, data);
  };

  initialValues = () => {
    const record = this.props.record;
    return this.schema.initialValues(record || {});
  };

  renderForm() {
    const { saveLoading, isEditing } = this.props;

    return (
      <FormWrapper>
        <Formik
          initialValues={this.initialValues()}
          validationSchema={this.schema.schema}
          onSubmit={this.handleSubmit}
          render={(form) => {
            return (
              <form onSubmit={form.handleSubmit}>
                {isEditing && (
                  <ViewFormItem
                    name={fields.id.name}
                    label={fields.id.label}
                  />
                )}

                <UserAutocompleteFormItem
                  name={fields.owner.name}
                  label={fields.owner.label}
                  required={fields.owner.required}
                  showCreate={!this.props.modal}
                  form={form}
                />
                <TicketAutocompleteFormItem
                  name={fields.ticket.name}
                  label={fields.ticket.label}
                  required={fields.ticket.required}
                  showCreate={!this.props.modal}
                  form={form}
                />
                <DatePickerFormItem
                  name={fields.start.name}
                  label={fields.start.label}
                  required={fields.start.required}
                  showTimeInput
                />
                <DatePickerFormItem
                  name={fields.deadline.name}
                  label={fields.deadline.label}
                  required={fields.deadline.required}
                  showTimeInput
                />
                <TextAreaFormItem
                  name={fields.clientNotes.name}
                  label={fields.clientNotes.label}
                  required={fields.clientNotes.required}
                />
                <TextAreaFormItem
                  name={fields.workerNotes.name}
                  label={fields.workerNotes.label}
                  required={fields.workerNotes.required}
                />
                <ImagesFormItem
                  name={fields.photos.name}
                  label={fields.photos.label}
                  required={fields.photos.required}
                  path={fields.photos.path}
                  schema={{
                    size: fields.photos.size,
                  }}
                  max={fields.photos.max}
                />
                <SelectFormItem
                  name={fields.status.name}
                  label={fields.status.label}
                  options={fields.status.options.map(
                    (item) => ({
                      value: item.id,
                      label: item.label,
                    }),
                  )}
                  required={fields.status.required}
                />
                <TextAreaFormItem
                  name={fields.finishedNotes.name}
                  label={fields.finishedNotes.label}
                  required={fields.finishedNotes.required}
                />
                <InputFormItem
                  name={fields.fee.name}
                  label={fields.fee.label}
                  required={fields.fee.required}
                />
                <FilesFormItem
                  name={fields.receipt.name}
                  label={fields.receipt.label}
                  required={fields.receipt.required}
                  path={fields.receipt.path}
                  schema={{
                    size: fields.receipt.size,
                    formats: fields.receipt.formats,
                  }}
                  max={fields.receipt.max}
                />

                <div className="form-buttons">
                  <button
                    className="btn btn-primary"
                    disabled={saveLoading}
                    type="button"
                    onClick={form.handleSubmit}
                  >
                    <ButtonIcon
                      loading={saveLoading}
                      iconClass="far fa-save"
                    />{' '}
                    {i18n('common.save')}
                  </button>

                  <button
                    className="btn btn-light"
                    type="button"
                    disabled={saveLoading}
                    onClick={form.handleReset}
                  >
                    <i className="fas fa-undo"></i>{' '}
                    {i18n('common.reset')}
                  </button>

                  {this.props.onCancel ? (
                    <button
                      className="btn btn-light"
                      type="button"
                      disabled={saveLoading}
                      onClick={() => this.props.onCancel()}
                    >
                      <i className="fas fa-times"></i>{' '}
                      {i18n('common.cancel')}
                    </button>
                  ) : null}
                </div>
              </form>
            );
          }}
        />
      </FormWrapper>
    );
  }

  render() {
    const { isEditing, findLoading, record } = this.props;

    if (findLoading) {
      return <Spinner />;
    }

    if (isEditing && !record) {
      return <Spinner />;
    }

    return this.renderForm();
  }
}

export default RequestForm;
