// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import * as React from "react";
import { connect } from "react-redux";
import { IReaderRootState } from "readium-desktop/common/redux/states/renderer/readerRootState";
import {
    TranslatorProps, withTranslator,
} from "readium-desktop/renderer/common/components/hoc/translator";
import { TDispatch } from "readium-desktop/typings/redux";

import { readerLocalActionSearch } from "../../redux/actions";
import LoaderSearch from "./LoaderSearch";
import SearchFormPicker from "./SearchFormPicker";

// tslint:disable-next-line: no-empty-interface
interface IBaseProps {
}
// IProps may typically extend:
// RouteComponentProps
// ReturnType<typeof mapStateToProps>
// ReturnType<typeof mapDispatchToProps>
// tslint:disable: no-empty-interface
// tslint:disable: max-line-length
interface IProps extends IBaseProps,
    ReturnType<typeof mapStateToProps>,
    ReturnType<typeof mapDispatchToProps>,
    TranslatorProps {
}

// tslint:disable-next-line: no-empty-interface
interface IState {
}

class SearchPicker extends React.Component<IProps, IState> {

    public render() {

        const { load, notFound, next, previous, __ } = this.props;
        return (
            <div style={{
                // margin: "10px",
                display: "flex",
                // flexDirection: "row",
                // width: "300px",

                // paddingBlock: "20px",
            }}>
                <SearchFormPicker></SearchFormPicker>
                <button
                    disabled={notFound}
                    onClick={previous}
                    aria-label={__("reader.picker.search.previous")}
                >
                    {"<"}
                </button>
                <button
                    disabled={notFound}
                    onClick={next}
                    aria-label={__("reader.picker.search.next")}
                >
                    {">"}
                </button>
                {
                    load && <LoaderSearch></LoaderSearch>
                }
            </div>
        );

    }

}

const mapStateToProps = (state: IReaderRootState, _props: IBaseProps) => {
    return {
        picker: state.picker,
        load: state.search.state === "busy",
        notFound: !state.search.foundArray?.length,
    };
};

const mapDispatchToProps = (dispatch: TDispatch) => ({
    next: () => {
        dispatch(readerLocalActionSearch.next.build());
    },
    previous: () => {
        dispatch(readerLocalActionSearch.previous.build());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslator(SearchPicker));