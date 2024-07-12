import { View } from 'react-native';
import { Input } from 'native-base';
import { createFilter } from 'react-search-input';
import { styles } from './Search.styles';
import { copies } from '../../../Global/copies';

export function Search({
                           data,
                           setData
                       }) {

    const KEYS_TO_FILTERS = ['email', 'firstname', 'lastname', 'name'];

    const onSearch = (text) => {
        const resultSearch = data.filter(createFilter(text, KEYS_TO_FILTERS));
        setData(resultSearch);
    };
    return (
        <View>
            <Input
                placeholder={ copies.search }
                onChangeText={ onSearch }
                style={ styles.input }
                variant={ 'unstyled' }
            />
        </View>
    );
}
