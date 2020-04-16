import model from 'modules/request/requestModel';
import React, { Component } from 'react';
import Spinner from 'view/shared/Spinner';
import ViewWrapper from 'view/shared/styles/ViewWrapper';
import TextViewItem from 'view/shared/view/TextViewItem';
import UserViewItem from 'view/iam/view/UserViewItem';
import ImagesViewItem from 'view/shared/view/ImagesViewItem';
import FilesViewItem from 'view/shared/view/FilesViewItem';
import TicketViewItem from 'view/ticket/view/TicketViewItem';

const { fields } = model;

class RequestView extends Component {
  renderView() {
    const { record } = this.props;

    return (
      <ViewWrapper>
        <TextViewItem
          label={fields.id.label}
          value={fields.id.forView(record.id)}
        />

        <UserViewItem
          label={fields.owner.label}
          value={fields.owner.forView(record.owner)}
        />

        <TicketViewItem
          label={fields.ticket.label}
          value={fields.ticket.forView(record.ticket)}
        />

        <TextViewItem
          label={fields.start.label}
          value={fields.start.forView(record.start)}
        />

        <TextViewItem
          label={fields.deadline.label}
          value={fields.deadline.forView(record.deadline)}
        />

        <TextViewItem
          label={fields.clientNotes.label}
          value={fields.clientNotes.forView(record.clientNotes)}
        />

        <TextViewItem
          label={fields.workerNotes.label}
          value={fields.workerNotes.forView(record.workerNotes)}
        />

        <ImagesViewItem
          label={fields.photos.label}
          value={fields.photos.forView(record.photos)}
        />

        <TextViewItem
          label={fields.status.label}
          value={fields.status.forView(record.status)}
        />

        <TextViewItem
          label={fields.finishedNotes.label}
          value={fields.finishedNotes.forView(record.finishedNotes)}
        />

        <TextViewItem
          label={fields.fee.label}
          value={fields.fee.forView(record.fee)}
        />

        <FilesViewItem
          label={fields.receipt.label}
          value={fields.receipt.forView(record.receipt)}
        />

        <TextViewItem
          label={fields.createdAt.label}
          value={fields.createdAt.forView(record.createdAt)}
        />

        <TextViewItem
          label={fields.updatedAt.label}
          value={fields.updatedAt.forView(record.updatedAt)}
        />
      </ViewWrapper>
    );
  }

  render() {
    const { record, loading } = this.props;

    if (loading || !record) {
      return <Spinner />;
    }

    return this.renderView();
  }
}

export default RequestView;
