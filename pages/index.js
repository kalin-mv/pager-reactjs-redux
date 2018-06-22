import '../scss/style.scss';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Table from '../components/Table';
import Layout from '../components/Layout';

import { loadIndexPage, loadNextUsers } from '../actions';

class Index extends PureComponent {
    constructor(props) {
        super(props);
        this.handleLoadMore = this.handleLoadMore.bind(this);
    }

    componentDidMount() {
        this.props.loadIndexPage();
    }

    handleLoadMore() {
        const { pager } = this.props;
        const page = pager.get('page');
        const totalPages = pager.get('total_pages');
        if (page < totalPages) {
            this.props.loadNextUsers(page + 1, pager.get('per_page'));
        }
    }

    render() {
        const { users, pager } = this.props;
        const isLoading = users.size <= 0;
        return (
            <Layout>
                <div className="bg-grey-lighter border-l border-r rounded shadow mb-6">
                    <div className="border-b px-6 py-6 flex justify-center">
                        <Table isLoading={isLoading} users={users} pager={pager} onLoadMore={this.handleLoadMore}/>
                    </div>
                </div>
            </Layout> 
        );
    }
}

Index.propTypes = {
    loadIndexPage: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    const { entities, pagination } = state;   
    return {
        users: entities.get('users'), 
        pager: pagination.get('users'), 
    };
};

export default connect(mapStateToProps, { loadIndexPage, loadNextUsers })(Index);
