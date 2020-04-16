import React, { Component } from 'react';
import TicketListFilter from 'view/ticket/list/TicketListFilter';
import TicketListTable from 'view/ticket/list/TicketListTable';
import TicketListToolbar from 'view/ticket/list/TicketListToolbar';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';

class TicketListPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.ticket.menu')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.ticket.list.title')}
          </PageTitle>

          <TicketListToolbar />
          <TicketListFilter />
          <TicketListTable />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default TicketListPage;
