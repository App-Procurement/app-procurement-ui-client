import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            perPageLimit: 5,
            totalPages: 0,
            currentPage: 0,
            totalRecords: 0
        };
    }

    setOptions = (options) => {
        this.setState({
            ...options
        });
    };

    peginationOfTable() {
        const { currentPage, totalPages, totalRecords } = this.state;
        let rows = [];
        if (totalRecords > 0) {
            for (let i = 0; i < totalPages; i++) {
                rows.push(
                    <li key={i}>
                        <a
                            className={currentPage === i ? 'active' : ''}
                            href="#foo"
                            onClick={(e) => this.navigatePage('btn-click', e, i)}
                        >
                            {i + 1}
                        </a>
                    </li >
                );
            }
            return (
                <ul className="d-block" key={rows}>
                    {rows}
                </ul>
            );
        }
    }

    navigatePage(target, e, i) {
        let { totalPages, currentPage } = this.state;
        e.preventDefault();
        switch (target) {
            case 'pre':
                if (currentPage !== 0) {
                    currentPage = currentPage - 1;
                }
                break;
            case 'next':
                if (currentPage !== totalPages - 1) {
                    currentPage = currentPage + 1;
                }
                break;
            case 'btn-click':
                currentPage = i;
                break;
            default:
        }
        this.setState({
            currentPage
        });
        this.props.changeCurrentPage(currentPage);
    }

    render() {
        const { perPageLimit, currentPage, totalRecords } = this.state;
        let startIndex = perPageLimit * currentPage + 1;
        let endIndex = perPageLimit * (currentPage + 1);
        if (totalRecords > 0) {
            if (endIndex > totalRecords) {
                endIndex = totalRecords;
            }
        }
        return (
            <div className="pagination-container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-xl-6 col-lg-6 col-md-5 col-sm-5 col-12">
                        <div className="pagination-text">
                            Showing&nbsp;
                            <strong>
                                {startIndex}&#8722;{endIndex}&nbsp;
                            </strong>
                            From&nbsp;
                            <strong>
                                {totalRecords}
                            </strong>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-7 col-sm-7 col-12 text-right">
                        <div className="pagination-section">
                            <div
                                className={currentPage === 0 ? "d-inline-block btn-left desable" : "d-inline-block btn-left enable"}
                                onClick={(e) => this.navigatePage('pre', e, '')}
                            >
                                <Button>
                                    <ArrowBackIosIcon />
                                </Button>
                            </div>
                            <div className="d-inline-block pagination-icon">
                                {this.peginationOfTable()}
                            </div>
                            <div
                                className={currentPage === this.state.totalPages - 1 ? "d-inline-block btn-right" : "d-inline-block btn-right"} onClick={(e) => this.navigatePage('next', e, '')}
                            >
                                <Button>
                                    <ArrowForwardIosIcon />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Pagination;