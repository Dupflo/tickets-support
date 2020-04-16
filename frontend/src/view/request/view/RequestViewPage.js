import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import RequestView from 'view/request/view/RequestView';
import { i18n } from 'i18n';
import actions from 'modules/request/view/requestViewActions';
import { connect } from 'react-redux';
import selectors from 'modules/request/view/requestViewSelectors';
import RequestViewToolbar from 'view/request/view/RequestViewToolbar';

class RequestPage extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(actions.doFind(match.params.id));
  }

  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.request.menu'), '/request'],
            [i18n('entities.request.view.title')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.request.view.title')}
          </PageTitle>

          <RequestViewToolbar match={this.props.match} />

          <RequestView
            loading={this.props.loading}
            record={this.props.record}
          />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

function select(state) {
  return {
    loading: selectors.selectLoading(state),
    record: selectors.selectRecord(state),
  };
}

export default connect(select)(RequestPage);
