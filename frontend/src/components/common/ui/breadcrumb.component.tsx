import { range } from 'lodash-es';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { globalVariables } from '../../styles';

interface BreadcrumbProp {
    nbStep: number;
    selectedIndex: number;
}

class KntBreadcrumb extends Component<BreadcrumbProp> {
    render() {
        return (
            <View style={styles.breadcrumbContainer}>
                {range(this.props.nbStep).map(step => (
                    <View
                        key={step}
                        style={[
                            styles.breadcrumbItem,
                            this.props.selectedIndex === step
                                ? styles.breadcrumbItemSelected
                                : styles.breadcrumbItemUnselected
                        ]}
                    />
                ))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    breadcrumbContainer: {
        flexDirection: 'row'
    },
    breadcrumbItem: {
        width: 15,
        height: 15,
        borderRadius: 15 / 2,
        borderWidth: 1,
        marginRight: 10
    },
    breadcrumbItemUnselected: {
        borderColor: globalVariables.color.primary,
        backgroundColor: globalVariables.color.bg
    },
    breadcrumbItemSelected: {
        borderColor: globalVariables.color.primary,
        backgroundColor: globalVariables.color.primary
    }
});

export default KntBreadcrumb;
