import React, { Component } from 'react';
import RequestListFilter from 'view/request/list/RequestListFilter';
import RequestListTable from 'view/request/list/RequestListTable';
import RequestListToolbar from 'view/request/list/RequestListToolbar';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';

class RequestListPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.request.menu')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.request.list.title')}
          </PageTitle>

          <RequestListToolbar />
          <RequestListFilter />
          <RequestListTable />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default RequestListPage;
