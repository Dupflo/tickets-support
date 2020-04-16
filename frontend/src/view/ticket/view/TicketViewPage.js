import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import TicketView from 'view/ticket/view/TicketView';
import { i18n } from 'i18n';
import actions from 'modules/ticket/view/ticketViewActions';
import { connect } from 'react-redux';
import selectors from 'modules/ticket/view/ticketViewSelectors';
import TicketViewToolbar from 'view/ticket/view/TicketViewToolbar';

class TicketPage extends Component {
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
            [i18n('entities.ticket.menu'), '/ticket'],
            [i18n('entities.ticket.view.title')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.ticket.view.title')}
          </PageTitle>

          <TicketViewToolbar match={this.props.match} />

          <TicketView
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

export default connect(select)(TicketPage);
