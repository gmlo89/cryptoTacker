import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, SectionList, FlatList } from 'react-native';
import Colors from 'cryptoTracker/src/res/colors';
import Http from 'cryptoTracker/src/libs/http';
import CoinMarketItem from './CoinMarkerItem';


class CoinDetailScreen extends Component {

    state = {
        coin: {},
        markets: []
    }

    getSymbolIcon = (name) => {

        if( name )
        {
            name = name.toLowerCase().replace(" ", "-");

            return  `https://c1.coinlore.com/img/16x16/${name}.png`;
        }

        
    }

    getSections = (coin) => {
        const sections = [
            {
                title: "Market cap",
                data: [coin.market_cap_usd]
            },
            {
                title: "Volume 24h",
                data: [coin.volume24]
            },
            {
                title: "Change 24h",
                data: [coin.percent_change_24h]
            }
        ];

        return sections;
    }


    getMarkets = async (coinId) => {
        const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;

        const markets = await Http.instance.get(url);

        this.setState({ markets });
    }

    componentDidMount(){
        const { coin } = this.props.route.params;

        this.props.navigation.setOptions({
            title: coin.symbol
        })

        this.getMarkets(coin.id);

        this.setState({ coin });
    }
    render() {
        const { coin, markets } = this.state;
        
        return (
            <View style={styles.container}>
                <View style={styles.subHeader}>
                    <Image style={styles.iconImg} source={{ uri: this.getSymbolIcon(coin.name) }} />
                    <Text style={styles.titleText}>{ coin.name }</Text>
                </View>
                <SectionList 
                    style={styles.section}
                    sections={this.getSections(coin)}
                    keyExtractor={(item) => item}
                    renderItem={({item}) => 
                        <View style={styles.sectionItem}>
                            <Text style={styles.itemText}>{item}</Text>
                        </View>
                    }
                    renderSectionHeader={({section}) => 
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionText}>{section.title}</Text>
                        </View>
                    }
                />
                <Text style={styles.marketTitle}>Markets</Text>
                <FlatList 
                    style={styles.list}
                    horizontal={true}
                    data={markets} 
                    renderItem={({item}) => 
                       <CoinMarketItem  item={item}/>
                    }
                />
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.charade
    },
    subHeader: {
        backgroundColor: "rgba(0,0,0,0.1)",
        padding: 16,
        flexDirection: "row"
    },
    titleText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
        marginLeft: 8
    },
    section: {
        maxHeight: 220
    },
    list: {
        maxHeight: 100,
        paddingLeft: 16
    },
    marketTitle: {
        fontSize: 16,
        color: "#fff",
        marginBottom: 16,
        marginLeft: 16,
        fontWeight: 'bold'
    },
    iconImg: {
        width: 25,
        height: 25
    },
    sectionHeader: {
        backgroundColor: "rgba(0,0,0,0.2)",
        padding: 8
    },
    sectionItem: {
        padding: 8
    },
    itemText: {
        color: "#fff",
        fontSize: 14
    },
    sectionText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold"
    }
})

export default CoinDetailScreen;