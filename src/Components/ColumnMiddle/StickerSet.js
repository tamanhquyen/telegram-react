/*
 *  Copyright (c) 2018-present, Evgeny Nadymov
 *
 * This source code is licensed under the GPL v.3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import Sticker from '../Message/Media/Sticker';
import { loadStickerContent } from '../../Utils/File';
import { STICKER_SMALL_DISPLAY_SIZE } from '../../Constants';
import FileStore from '../../Stores/FileStore';
import './StickerSet.css';

const styles = theme => ({
    title: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary
    },
    stickerSetItem: {
        width: STICKER_SMALL_DISPLAY_SIZE,
        height: STICKER_SMALL_DISPLAY_SIZE,
        padding: 3,
        boxSizing: 'border-box',
        '&:hover': {
            background: theme.palette.type === 'dark' ? '#303030' : '#f4f4f4',
            borderRadius: 6
        }
    }
});

class StickerSet extends React.Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const { info } = this.props;

        if (info !== nextProps.info) {
            return true;
        }

        return false;
    }

    componentDidMount() {
        //this.loadContent();
    }

    loadContent = () => {
        const { info } = this.props;
        if (!info) return;

        const { stickers } = info;
        if (!stickers) return;

        const store = FileStore.getStore();
        stickers.forEach(x => {
            loadStickerContent(store, x, null);
        });
    };

    render() {
        const { classes, info, onSelect, onMouseDown, onMouseOver } = this.props;
        if (!info) return null;

        const { title, stickers } = info;

        const items = stickers.map(x => (
            <div
                className={classNames('sticker-set-item', classes.stickerSetItem)}
                key={x.sticker.id}
                data-sticker-id={x.sticker.id}
                onClick={() => onSelect(x)}
                onMouseDown={onMouseDown}
                onMouseOver={onMouseOver}>
                <Sticker
                    key={x.sticker.id}
                    className='sticker-set-item-sticker'
                    sticker={x}
                    displaySize={STICKER_SMALL_DISPLAY_SIZE - 6}
                    blur={false}
                />
            </div>
        ));

        return (
            <div className='sticker-set'>
                <div className={classNames('sticker-set-title', classes.title)}>
                    <span>{title}</span>
                </div>
                <div className='sticker-set-content'>{items}</div>
            </div>
        );
    }
}

StickerSet.propTypes = {
    info: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
    onMouseDown: PropTypes.func.isRequired
};

export default withStyles(styles)(StickerSet);
