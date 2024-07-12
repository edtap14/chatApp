import { Text, View, ScrollView } from 'react-native';
import { map, size } from 'lodash';
import { styles } from './ListGroups.styles';
import { copies } from '../../../Global/copies';
import { Item } from './Item';

export function ListGroups({
                               groups,
                               upGroupChat
                           }) {
    return (
        <ScrollView alwaysBounceVertical={ false }>
            <View style={ styles.content }>
                { size(groups) === 0
                  ? (
                      <Text style={ styles.noGroups }>{ copies.groupDontExist }</Text>
                  )
                  : (
                      map(groups, (group) => (
                          <Item key={ group._id } group={ group } upGroupChat={ upGroupChat }/>
                      ))
                  )
                }
            </View>
        </ScrollView>
    );
}
