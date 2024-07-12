import { View } from 'react-native';
import { Input } from 'native-base';
import { createFilter } from 'react-search-input';
import { styles } from './Search.styles';
import { copies } from '../../../Global/copies';

const KEYS_TO_FILTERS = [
    'email',
    'firstname',
    'lastname',
    'participant_one.email',
    'participant_one.firstname',
    'participant_one.lastname',
    'participant_two.email',
    'participant_two.lastname',
    'participant_two.firstname'
];

export function Search(props) {
    const {
        data,
        setData
    } = props;

    const onSearch = (text) => {
        const resultSearch = data.filter(createFilter(text, KEYS_TO_FILTERS));
        setData(resultSearch);
    };

    return (
        <View style={ styles.content }>
            <Input
                placeholder={ copies.search }
                variant={ 'unstyled' }
                style={ styles.input }
                onChangeText={ onSearch }
            />
        </View>
    );
}
