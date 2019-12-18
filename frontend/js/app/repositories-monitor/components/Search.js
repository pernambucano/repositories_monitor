import React, { useState, useEffect } from 'react';
import ChipInput from 'material-ui-chip-input'
import { connect } from 'react-redux';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import { initializeRepository, removeRepository } from '../store/actions/repository';
import { showRepositoryData, hideRepositoryData } from '../store/actions/visibilityFilter';

const Search = (props) => {
    const [chips, setChips] = useState([]);

    const handleAddChip = (chip) => {
        console.log(chip);
        setChips(chips.concat(chip));
        const existsAlreadyOnState = props.originalCommitList.find(
            (r) => r.repository == chip
        );
        if (!existsAlreadyOnState) {
            props.websocketClient.send(JSON.stringify({ command: 'add', repo: chip }));
            props.initializeRepository(chip);
        } else {
            props.showRepositoryData(chip);
        }
    }

    const handleDeleteChip = (chip, index) => {
        props.hideRepositoryData(chip);
        setChips(chips.filter(c => c != chip));
    }

    return (
        <ChipInput
            value={chips}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip, index) => handleDeleteChip(chip, index)
            }
            fullWidth={true}
            placeholder="Digite aqui os repositórios no formato organização/repositório"
        />
    )
}

const mapStateToProps = (state) => {
    return {
        originalCommitList: state.repository,
    }
}

const mapDispatchToProps = {
    initializeRepository,
    removeRepository,
    showRepositoryData,
    hideRepositoryData
};
export default connect(mapStateToProps, mapDispatchToProps)(Search)

