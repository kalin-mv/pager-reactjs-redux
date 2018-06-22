import React, { Component } from 'react';

class TableRow extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        const { item } = this.props;
        return (
            <div className="bg-white mx-auto max-w-sm shadow-lg rounded-lg overflow-hidden mb-4">
                <div className="flex items-center px-12 py-12">
                    <img className="block h-16 sm:h-32 rounded-full mx-auto mb-4 sm:mb-0 sm:mr-4 sm:ml-0" src={item.get('avatar')} alt=""/>
                    <div className="text-center sm:text-left sm:flex-grow">
                        <div className="mb-4">
                            <p className="text-lg leading-tight text-grey-dark">ID: {item.get('id')}</p>
                            <p className="text-2xl leading-tight">{item.get('firstName')} {item.get('lastName')}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TableRow;