import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    TouchableWithoutFeedback,
    Image,
    Dimensions,
} from "react-native";
import { styles } from "../themes";
import { useNavigation } from "@react-navigation/native";
import { image185 } from "../api/moviedb";

const { width, height } = Dimensions.get("window");

export default function MovieList({ title, data, hideSeeAll }) {
    const navigation = useNavigation();

    return (
        <View style={{ marginBottom: 40 }}>
            <View
                style={{
                    paddingHorizontal: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 20,
                }}
            >
                <Text
                    style={{
                        color: "white",
                        fontSize: 20,
                        fontWeight: "bold",
                    }}
                >
                    {title}
                </Text>

                {!hideSeeAll && (
                    <TouchableOpacity>
                        <Text style={styles.text}>See All</Text>
                    </TouchableOpacity>
                )}
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 15,
                }}
            >
                {data.map((item, index) => (
                    <TouchableWithoutFeedback
                        key={item.id}
                        onPress={() => navigation.push("Movie", item)}
                    >
                        <View style={{ marginRight: 20 }}>
                            <Image
                                source={{ uri: image185(item.poster_path) }}
                                style={{
                                    width: width * 0.33,
                                    height: height * 0.22,
                                    borderRadius: 10,
                                }}
                            />
                            <Text
                                style={{
                                    color: "#D4D4D4",
                                    textAlign: "center",
                                    marginTop: 6,
                                }}
                            >
                                {item.title && item.title.length > 14
                                    ? item.title.slice(0, 14) + "..."
                                    : item.title}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                ))}
            </ScrollView>
        </View>
    );
}
