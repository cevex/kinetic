import { range } from 'lodash-es';
import React, { Component } from 'react';
import { View } from 'react-native';
import breadcrumbStyles from './breadcrumb.style';

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

export default KntBreadcrumb;
