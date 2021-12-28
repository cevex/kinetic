import { range } from 'lodash-es';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { globalVariables } from '../styles';

interface BreadcrumbProp {
    nbStep: number;
    selectedIndex: number;
}

class KntBreadcrumb extends Component<BreadcrumbProp> {
    render() {
        return (
            <View style={breadcrumbStyles.breadcrumbContainer}>
                {range(this.props.nbStep).map(step => (
                    <View
                        key={step}
                        style={[
                            breadcrumbStyles.breadcrumbItem,
                            this.props.selectedIndex === step
                                ? breadcrumbStyles.breadcrumbItemSelected
                                : breadcrumbStyles.breadcrumbItemUnselected
                        ]}
                    />
                ))}
            </View>
        );
    }
}

const breadcrumbStyles = StyleSheet.create({
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
        backgroundColor: globalVariables.color.white
    },
    breadcrumbItemSelected: {
        borderColor: globalVariables.color.primary,
        backgroundColor: globalVariables.color.primary
    }
});

export default KntBreadcrumb;
