import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';

import TableRow from './TableRow';
import './Table.scss';

class Table extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { users, pager, isLoading } = this.props;
        const hasMore = pager.get('page') < pager.get('total_pages');
        return (
            <div className="w-1/2">
                {
                    isLoading?
                        <Loading key="loading_1"/>:
                        <InfiniteScroll
                            initialLoad={false}
                            pageStart={0}
                            loadMore={this.props.onLoadMore}
                            hasMore={hasMore}
                            loader={<Loading key="loading_2"/>}>
                            {
                                users.valueSeq().map(item => 
                                    <TableRow 
                                        key={item.get('id')} 
                                        item={item} /> 
                                )   
                            }
                            {
                                !hasMore && <Loaded/>
                            }
                        </InfiniteScroll>
                }
            </div>
        );
    }
}

const Loading = () => (
    <div className="bg-white mx-auto max-w-sm shadow-lg rounded-lg overflow-hidden mb-4">
        <div className="sm:flex justify-center items-center px-6 py-1">
            <div className="fa-3x">
                <i className="fas fa-spinner fa-xs fa-spin"></i>
            </div>
            <p className="text-lg ml-2">Loading</p>

        </div>
    </div>);

const Loaded = () => (
    <div className="bg-white mx-auto max-w-sm shadow-lg rounded-lg overflow-hidden mb-4">
        <div className="sm:flex justify-center items-center px-6 py-3">
            <p className="text-lg ml-2">All items was loaded</p>
        </div>
    </div>);

Table.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    users: PropTypes.object.isRequired,
    pager: PropTypes.object.isRequired,
    onLoadMore: PropTypes.func.isRequired
};

export default Table;